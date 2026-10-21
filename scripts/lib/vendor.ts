/**
 * Gets a component from upstream (shadcn for React, Spartan for Angular) and
 * applies the mechanical fix-ups Curve always needs afterwards. Used by component:import (in the
 * repo) and update-component (in a throwaway worktree), so both see identical
 * upstream output.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import { capture, componentDir, type Framework, listFiles, packageDir, run } from './repo';

/** npm packages the CLIs add that Curve must not depend on. */
const UNWANTED_DEPENDENCIES: Record<Framework, string[]> = {
  // The shadcn registry lists `cn` (our `@/lib/utils` helper) as an npm dependency.
  react: ['cn'],
  // Curve ships no Tailwind, so no Tailwind animation plugin either.
  angular: ['tw-animate-css'],
};

export interface VendorResult {
  /** Upstream files of this component, relative to the package root. */
  files: string[];
  warnings: string[];
}

interface VendorOptions {
  /** Checkout root to run in: the repo itself, or a temp worktree. */
  root: string;
  /**
   * True when running in the real repo: install new npm dependencies (React),
   * and undo the dependency bumps and edits to already-tracked files the
   * Spartan CLI makes as a side effect (Angular).
   */
  live: boolean;
}

export function vendor(framework: Framework, name: string, options: VendorOptions): VendorResult {
  return framework === 'react' ? vendorReact(name, options) : vendorAngular(name, options);
}

// ── React (shadcn) ───────────────────────────────────────────────────────────

/**
 * Whether the shadcn registry (the style in components.json) has `name`, or
 * undefined when the registry could not be reached.
 */
export function shadcnHas(name: string, root: string): boolean | undefined {
  try {
    capture(`pnpm dlx shadcn@latest view ${name}`, join(root, packageDir.react));
    return true;
  } catch (error) {
    const { stdout = '', stderr = '' } = error as { stdout?: string; stderr?: string };
    return /was not found/.test(`${stdout}${stderr}`) ? false : undefined;
  }
}

/**
 * Asks shadcn what `add` would write (`--dry-run`, which writes nothing) and
 * writes only the files Curve needs itself. Unlike a real `add`, nothing has to
 * be undone afterwards: no dependency bumps, no rewritten shared files.
 */
function vendorReact(name: string, { root, live }: VendorOptions): VendorResult {
  const pkgRoot = join(root, packageDir.react);
  const shadcn = (args: string) => capture(`pnpm dlx shadcn@latest add ${name} ${args}`, pkgRoot);
  const warnings: string[] = [];

  console.log(`\n$ pnpm dlx shadcn@latest add ${name} --dry-run   (in ${packageDir.react})`);
  const plan = parseDryRun(shadcn('--dry-run'));

  const files: string[] = [];
  for (const file of plan.files) {
    const ui = /^src\/components\/ui\/([^/]+)\.tsx$/.exec(file)?.[1];
    // The component itself goes in its own directory; shadcn plans it flat.
    let target = file;
    if (ui === name) {
      target = join(componentDir('react', name), `${name}.tsx`);
    } else if (ui && existsSync(join(pkgRoot, 'src/components/ui', ui, 'index.ts'))) {
      // A registry dependency (e.g. `button`) Curve already vendors: its
      // `@/components/ui/button` import already resolves to our barrel.
      continue;
    } else if (existsSync(join(pkgRoot, file))) {
      // A shared file Curve already has (a hook, a lib helper): keep ours.
      continue;
    } else if (ui) {
      warnings.push(
        `shadcn also needs "${ui}", which Curve does not have yet. It was written to ${file}; ` +
          `delete it and run \`pnpm component:import ${ui}\` first.`,
      );
    } else {
      warnings.push(`shadcn also added ${file}. Check it belongs there.`);
    }

    // --view <file> prints that one file as `add` would write it (aliases and
    // icons already resolved). Without a path it stops after five files.
    const text = parseViewedFile(shadcn(`--dry-run --view ${file}`), file)
      // Same reason as UNWANTED_DEPENDENCIES: point `cn` at the local helper.
      .replace(/from (['"])cn\1/g, "from '@/lib/utils'");
    mkdirSync(dirname(join(pkgRoot, target)), { recursive: true });
    writeFileSync(join(pkgRoot, target), text);
    files.push(target);
  }
  if (!files.includes(join(componentDir('react', name), `${name}.tsx`))) {
    throw new Error(`shadcn planned no src/components/ui/${name}.tsx for "${name}".`);
  }

  const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));
  const installed = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
  const missing = plan.dependencies.filter((spec) => {
    const dep = spec.replace(/(?<=.)@.*$/, '');
    return !UNWANTED_DEPENDENCIES.react.includes(dep) && !(dep in installed);
  });
  if (missing.length) {
    if (live) run(`pnpm add ${missing.join(' ')}`, pkgRoot);
    warnings.push(`New dependencies: ${missing.join(', ')}. Check they belong there.`);
  }

  return { files, warnings };
}

/** The file paths and npm dependencies from `shadcn add --dry-run`. */
function parseDryRun(output: string): { files: string[]; dependencies: string[] } {
  const result = { files: [] as string[], dependencies: [] as string[] };
  let section: string[] | undefined;
  for (const line of output.split('\n')) {
    // A bare `│` ends a section; the summary (`│ 2 files, 2 deps`) follows one.
    if (line.trim() === '│') section = undefined;
    if (line.startsWith('├ ')) {
      section = /^├ Files\b/.test(line)
        ? result.files
        : /^├ Dependencies\b/.test(line)
          ? result.dependencies
          : undefined;
      continue;
    }
    // `│ + src/components/ui/dialog.tsx  create` or `│ + cn`
    const item = /^│ \S (\S+)/.exec(line)?.[1];
    if (section && item) section.push(item);
  }
  if (result.files.length === 0) throw new Error(`Could not read shadcn's dry run:\n${output}`);
  return result;
}

/** The content of `file` from `shadcn add --dry-run --view <file>`. */
function parseViewedFile(output: string, file: string): string {
  const lines = output.split('\n');
  const header = lines.findIndex((l) => l.startsWith(`├ ${file} `));
  const count = Number(/(\d+) lines$/.exec(lines[header] ?? '')?.[1]);
  // The header is followed by a `│ ┌───` line, then one `│ │ ` line per source line.
  const body = lines.slice(header + 2, header + 2 + count);
  if (header === -1 || !count || body.some((l) => !l.startsWith('│ │'))) {
    throw new Error(`Could not read ${file} from shadcn's dry run.`);
  }
  return `${body.map((l) => l.replace(/^│ │ ?/, '')).join('\n')}\n`;
}

// ── Angular (Spartan) ────────────────────────────────────────────────────────

/** The Spartan CLI's list of primitives, with each one's peer dependencies. */
export function spartanPrimitives(
  root: string,
): Record<string, { peerDependencies?: Record<string, string> }> {
  const pkgRoot = join(root, packageDir.angular);
  const require = createRequire(join(pkgRoot, 'package.json'));
  const cliRoot = dirname(require.resolve('@spartan-ng/cli/package.json'));
  return JSON.parse(
    readFileSync(join(cliRoot, 'src/generators/ui/supported-ui-libraries.json'), 'utf8'),
  );
}

/**
 * Returns why `name` cannot be generated with the installed Spartan CLI/brain,
 * or undefined when it can.
 */
export function spartanBlocker(name: string, root: string): string | undefined {
  const primitive = spartanPrimitives(root)[name];
  if (!primitive) return `The installed @spartan-ng/cli has no "${name}" primitive.`;

  const wantedBrain = primitive.peerDependencies?.['@spartan-ng/brain'];
  if (!wantedBrain) return undefined;
  const pkg = JSON.parse(readFileSync(join(root, packageDir.angular, 'package.json'), 'utf8'));
  const haveBrain: string | undefined = pkg.dependencies?.['@spartan-ng/brain'];
  if (haveBrain !== wantedBrain) {
    return (
      `Spartan "${name}" needs @spartan-ng/brain ${wantedBrain}, but @surfnet/curve-angular ` +
      `is on ${haveBrain}. Upgrade brain first (it affects every Angular component).`
    );
  }
  return undefined;
}

function vendorAngular(name: string, { root, live }: VendorOptions): VendorResult {
  const pkgRoot = join(root, packageDir.angular);
  const uiRoot = join(pkgRoot, 'src/lib/ui');
  const warnings: string[] = [];

  const blocker = spartanBlocker(name, root);
  if (blocker) throw new Error(blocker);

  const guard = live ? startGuard(root, 'angular') : undefined;
  const before = new Set(listFiles(uiRoot));

  // stdin closed: if the CLI ever falls back to its interactive picker, it
  // fails instead of hanging.
  run(`pnpm exec ng g @spartan-ng/cli:ui ${name} --defaults`, pkgRoot, {
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  // Rewrite `@spartan-ng/helm/<x>` imports to relative ones (ng-packagr needs it).
  run('pnpm exec jiti scripts/rewrite-helm-imports.ts', pkgRoot);

  const files: string[] = [];
  for (const file of listFiles(uiRoot).filter((f) => !before.has(f))) {
    if (file.startsWith(`${name}/`)) {
      files.push(join('src/lib/ui', file));
    } else {
      warnings.push(
        `Spartan also generated ${file}. Treat it as a new component (CSS, story, contract, export).`,
      );
    }
  }

  if (guard) warnings.push(...guard.finish());
  return { files, warnings };
}

// ── Side-effect guard ────────────────────────────────────────────────────────

/**
 * The Spartan CLI "helpfully" bumps dependencies and re-writes shared files. Snapshot
 * package.json and the tracked source files first, then undo anything that
 * wasn't there before: version bumps of existing deps, unwanted new deps, and
 * edits to tracked files under src/.
 */
function startGuard(root: string, framework: Framework) {
  const pkgRoot = join(root, packageDir[framework]);
  const pkgPath = join(pkgRoot, 'package.json');
  const pkgBefore = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const srcPath = `${packageDir[framework]}/src`;
  const tracked = capture(`git ls-files -- ${srcPath}`, root).split('\n').filter(Boolean);
  const contentBefore = new Map(tracked.map((f) => [f, readFileSync(join(root, f), 'utf8')]));

  return {
    finish(): string[] {
      const warnings: string[] = [];
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      let pkgChanged = false;

      for (const field of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
        const now: Record<string, string> = pkg[field] ?? {};
        const was: Record<string, string> = pkgBefore[field] ?? {};
        for (const [dep, version] of Object.entries(now)) {
          if (UNWANTED_DEPENDENCIES[framework].includes(dep) && !(dep in was)) {
            delete now[dep];
            pkgChanged = true;
            warnings.push(`Removed unwanted dependency "${dep}" the CLI added.`);
          } else if (dep in was && was[dep] !== version) {
            now[dep] = was[dep]!;
            pkgChanged = true;
            warnings.push(`Reverted ${dep} ${version} → ${was[dep]} (the CLI bumped it).`);
          } else if (!(dep in was)) {
            warnings.push(`New ${field} entry: ${dep}@${version}. Check it belongs there.`);
          }
        }
      }

      if (pkgChanged) {
        writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
        run('pnpm install', root);
      }

      // Restore exactly what was there, including any uncommitted local edits.
      for (const [file, before] of contentBefore) {
        const full = join(root, file);
        if (!existsSync(full) || readFileSync(full, 'utf8') !== before) {
          writeFileSync(full, before);
          warnings.push(`Reverted CLI edit to ${file}.`);
        }
      }
      return warnings;
    },
  };
}
