/**
 * Merges upstream changes into an already-vendored component without losing
 * Curve's edits. Three-way merge per file:
 *
 *   base   = packages/<fw>/.upstream/<name>/…  (upstream as it was when vendored)
 *   ours   = the component in the repo         (upstream + Curve edits)
 *   theirs = upstream today                     (fetched in a temp git worktree)
 *
 * Clean merges are written in place; conflicts get standard <<<<<<< markers to
 * resolve in the editor. The .upstream copy is then advanced to today's upstream.
 * The repo's working tree is only touched for the component's own files.
 *
 * Components vendored before this script existed have no .upstream copy; for
 * those, follow the manual flow in .agents/skills/update-component/.
 *
 * Usage: pnpm update:component <name> [--react] [--angular]
 */

import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { parseArgs } from 'node:util';

import {
  componentDir,
  type Framework,
  isKebab,
  listFiles,
  packageDir,
  repoRoot,
  run,
  upstreamDir,
} from './lib/repo';
import { vendor } from './lib/vendor';

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    react: { type: 'boolean', default: false },
    angular: { type: 'boolean', default: false },
  },
});

const name = positionals[0];
if (!name || !isKebab(name)) {
  console.error('Usage: pnpm update:component <kebab-name> [--react] [--angular]');
  process.exit(1);
}
if (name.startsWith('curve-')) {
  console.error(`"${name}" is home-grown: there is no upstream to merge from.`);
  process.exit(1);
}

const requested: Framework[] =
  args.react || args.angular
    ? (['react', 'angular'] as const).filter((f) => args[f])
    : ['react', 'angular'];

const frameworks = requested.filter((framework) => {
  const vendored = existsSync(join(repoRoot, packageDir[framework], componentDir(framework, name)));
  const hasBase = existsSync(upstreamDir(framework, name));
  if (vendored && !hasBase) {
    console.warn(
      `[${framework}] ${name} has no .upstream snapshot (vendored before the scripts existed).\n` +
        `  Use the manual flow: .agents/skills/update-component/${framework}.md`,
    );
  }
  return vendored && hasBase;
});

if (frameworks.length === 0) {
  console.error(`Nothing to update for "${name}".`);
  process.exit(1);
}

// ── Fetch today's upstream in an isolated worktree ───────────────────────────

const worktree = mkdtempSync(join(tmpdir(), `curve-update-${name}-`));
let conflicts = 0;

try {
  run(`git worktree add --detach ${worktree} HEAD`, repoRoot);
  // Carry over uncommitted edits to tracked files (e.g. a CLI version bump in
  // package.json + lockfile), so upstream is fetched with the same tooling.
  for (const file of execSync('git diff --name-only HEAD', { cwd: repoRoot, encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)) {
    const from = join(repoRoot, file);
    const to = join(worktree, file);
    if (existsSync(from)) {
      mkdirSync(dirname(to), { recursive: true });
      copyFileSync(from, to);
    } else {
      rmSync(to, { force: true });
    }
  }
  // Its own node_modules, so the CLIs can't touch the repo's install.
  run(
    'pnpm install --frozen-lockfile --prefer-offline --ignore-scripts --reporter=silent',
    worktree,
  );

  for (const framework of frameworks) {
    const pkgRel = packageDir[framework];
    // Start from nothing, as if vendoring for the first time.
    rmSync(join(worktree, pkgRel, componentDir(framework, name)), { recursive: true, force: true });
    if (framework === 'angular') {
      // Spartan skips anything that already has a tsconfig path mapping.
      const tsconfig = join(worktree, pkgRel, 'tsconfig.json');
      const lines = readFileSync(tsconfig, 'utf8').split('\n');
      writeFileSync(
        tsconfig,
        lines.filter((l) => !l.includes(`"@spartan-ng/helm/${name}"`)).join('\n'),
      );
    }

    const result = vendor(framework, name, { root: worktree, live: false });
    if (result.files.length === 0)
      throw new Error(`The ${framework} CLI produced no files for "${name}".`);
    for (const w of result.warnings) console.warn(`[${framework}] ${w}`);
    run(
      `pnpm exec prettier --write --log-level warn ${result.files.map((f) => join(pkgRel, f)).join(' ')}`,
      worktree,
    );

    console.log(`\n── ${framework} ──`);
    const base = upstreamDir(framework, name);
    const files = new Set([...listFiles(base), ...result.files]);

    for (const file of [...files].sort()) {
      const oursPath = join(repoRoot, pkgRel, file);
      const basePath = join(base, file);
      const theirsPath = join(worktree, pkgRel, file);
      const status = mergeFile(oursPath, basePath, theirsPath);
      if (status === 'conflict') conflicts++;
      console.log(`  ${status.padEnd(9)} ${join(pkgRel, file)}`);

      if (existsSync(theirsPath)) {
        mkdirSync(dirname(basePath), { recursive: true });
        copyFileSync(theirsPath, basePath);
      } else {
        rmSync(basePath, { force: true });
      }
    }
  }
} finally {
  execSync(`git worktree remove --force ${worktree}`, { cwd: repoRoot, stdio: 'ignore' });
  rmSync(worktree, { recursive: true, force: true });
}

console.log(
  conflicts
    ? `\n${conflicts} file(s) have conflict markers. Resolve them, then run pnpm lint and check the stories.`
    : '\nDone. Review the diff (git diff), then run pnpm lint and check the stories.',
);
process.exit(conflicts ? 1 : 0);

type MergeStatus = 'unchanged' | 'merged' | 'conflict' | 'added' | 'removed' | 'kept';

function mergeFile(ours: string, base: string, theirs: string): MergeStatus {
  const read = (p: string) => (existsSync(p) ? readFileSync(p, 'utf8') : undefined);
  const [o, b, th] = [read(ours), read(base), read(theirs)];

  if (th === undefined) {
    // Upstream dropped the file. Keep ours; flag it.
    return o === undefined ? 'unchanged' : 'removed';
  }
  if (b === th) return 'unchanged'; // upstream didn't change since we vendored
  if (o === undefined) {
    // New upstream file (or one we deleted on purpose). Only add it if it's new.
    if (b !== undefined) return 'kept';
    mkdirSync(dirname(ours), { recursive: true });
    copyFileSync(theirs, ours);
    return 'added';
  }

  const labels = '-L curve -L upstream-base -L upstream-new';
  try {
    execSync(
      `git merge-file ${labels} "${ours}" "${b === undefined ? '/dev/null' : base}" "${theirs}"`,
      {
        stdio: 'ignore',
      },
    );
    return 'merged';
  } catch (error) {
    // Exit status = number of conflicts (positive), or negative on error.
    const code = (error as { status?: number }).status ?? -1;
    if (code > 0) return 'conflict';
    throw error;
  }
}
