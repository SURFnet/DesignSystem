/**
 * Runs the upstream CLIs (shadcn for React, Spartan for Angular) and applies the
 * mechanical fix-ups Curve always needs afterwards. Used by import:component (in the
 * repo) and update-component (in a throwaway worktree), so both see identical
 * upstream output.
 */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
   * True when running in the real repo: undo dependency bumps and edits to
   * already-tracked files the CLI made as a side effect.
   */
  live: boolean;
}

export function vendor(framework: Framework, name: string, options: VendorOptions): VendorResult {
  return framework === 'react' ? vendorReact(name, options) : vendorAngular(name, options);
}

// ── React (shadcn) ───────────────────────────────────────────────────────────

function vendorReact(name: string, { root, live }: VendorOptions): VendorResult {
  const pkgRoot = join(root, packageDir.react);
  const uiRoot = join(pkgRoot, 'src/components/ui');
  const target = componentDir('react', name);
  const warnings: string[] = [];

  const guard = live ? startGuard(root, 'react') : undefined;
  const before = new Set(listFiles(uiRoot));

  // Trailing slash → files land in src/components/ui/<name>/.
  run(`pnpm dlx shadcn@latest add ${name} --path ${target}/ --yes`, pkgRoot);

  const files: string[] = [];
  const droppedDeps: string[] = [];
  for (const file of listFiles(uiRoot).filter((f) => !before.has(f))) {
    const full = join(uiRoot, file);
    const isOwn = file.startsWith(`${name}/`) && file.endsWith(`/${name}.tsx`);
    if (isOwn) {
      files.push(join('src/components/ui', file));
      continue;
    }
    // A registry dependency (e.g. `button`). If Curve already vendors it in its
    // own directory, the fresh flat copy is redundant: `@/components/ui/button`
    // already resolves to our barrel.
    const dep = file
      .split('/')
      .pop()!
      .replace(/\.tsx?$/, '');
    if (existsSync(join(uiRoot, dep, 'index.ts'))) {
      rmSync(full);
      droppedDeps.push(dep);
    } else {
      files.push(join('src/components/ui', file));
      warnings.push(
        `shadcn also vendored "${dep}" (${file}), which Curve does not have yet. ` +
          `Move it into src/components/ui/${dep}/ or add it with \`pnpm import:component ${dep}\`.`,
      );
    }
  }

  for (const file of files) {
    const full = join(pkgRoot, file);
    // Same reason as UNWANTED_DEPENDENCIES: point `cn` at the local helper.
    let text = readFileSync(full, 'utf8').replace(/from (['"])cn\1/g, "from '@/lib/utils'");
    // With --path, the CLI points dependency imports at its copy next to this
    // component (`@/components/ui/<name>/button`); use Curve's own instead.
    for (const dep of droppedDeps) {
      text = text.replaceAll(`@/components/ui/${name}/${dep}'`, `@/components/ui/${dep}'`);
      text = text.replaceAll(`@/components/ui/${name}/${dep}"`, `@/components/ui/${dep}"`);
    }
    writeFileSync(full, text);
  }

  if (guard) warnings.push(...guard.finish());
  return { files, warnings };
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
 * The CLIs "helpfully" bump dependencies and re-write shared files. Snapshot
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
