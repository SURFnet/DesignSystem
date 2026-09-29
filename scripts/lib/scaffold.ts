/**
 * Shared implementation of the two component generators:
 *
 * - `pnpm new:component <name>` builds a home-grown component (named
 *   curve-<name>, like curve-data-table). No CLI and no .upstream/ snapshot;
 *   it writes a small working component with every contract axis wired to a
 *   typed prop + data-* attribute.
 * - `pnpm import:component <name>` vendors a shadcn / Spartan component with
 *   the upstream CLI, undoes the CLI's side effects, and saves a pristine copy
 *   in .upstream/ so `pnpm update:component` can three-way merge later changes.
 *
 * Both write the contract, barrel, package exports, CSS and stories, and end
 * with the list of what's left to do by hand.
 *
 * Options: [--react] [--angular] [--description "…"] [--axis variants=a,b]…
 * No --react/--angular → both. No --description → asks.
 */

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { parseArgs } from 'node:util';

import {
  componentDir,
  type Framework,
  insertBeforeMarker,
  insertSorted,
  isKebab,
  packageDir,
  pascal,
  repoRoot,
  run,
  upstreamDir,
  writeNew,
} from './repo';
import * as t from './templates';
import { spartanBlocker, spartanPrimitives, vendor } from './vendor';

export type ScaffoldMode = 'new' | 'import';

const HOME_GROWN_PREFIX = 'curve-';

export async function scaffold(mode: ScaffoldMode): Promise<void> {
  const command = `pnpm ${mode}:component`;
  const { values: args, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      react: { type: 'boolean', default: false },
      angular: { type: 'boolean', default: false },
      description: { type: 'string' },
      axis: { type: 'string', multiple: true, default: [] },
    },
  });

  const input = positionals[0];
  if (!input || !isKebab(input)) {
    fail(
      `Usage: ${command} <kebab-name> [--react] [--angular] [--description "…"] [--axis variants=a,b]`,
    );
  }

  // ── Name ───────────────────────────────────────────────────────────────────

  let name = input;
  if (mode === 'new') {
    if (!input.startsWith(HOME_GROWN_PREFIX)) {
      if (spartanPrimitives(repoRoot)[input]) {
        fail(
          `"${input}" is an upstream component. To vendor it: pnpm import:component ${input}\n` +
            `To build your own instead, name it explicitly: pnpm new:component ${HOME_GROWN_PREFIX}${input}`,
        );
      }
      // Home-grown names carry the prefix, so they never collide with upstream.
      name = `${HOME_GROWN_PREFIX}${input}`;
      console.log(`Home-grown components are prefixed: using "${name}".`);
    }
  } else if (input.startsWith(HOME_GROWN_PREFIX)) {
    fail(
      `"${input}" is a home-grown name; there is nothing to import. Use: pnpm new:component ${input}`,
    );
  }

  const frameworks: Framework[] =
    args.react || args.angular
      ? (['react', 'angular'] as const).filter((f) => args[f])
      : ['react', 'angular'];

  const axes: t.Axes = {};
  for (const spec of args.axis) {
    const [axis, list] = spec.split('=');
    const values =
      list
        ?.split(',')
        .map((v) => v.trim())
        .filter(Boolean) ?? [];
    if (!axis || values.length === 0) {
      fail(`Bad --axis "${spec}". Expected e.g. --axis variants=default,outline`);
    }
    axes[axis] = values;
  }

  // ── Pre-flight: fail before touching anything ──────────────────────────────

  const contractFile = join(repoRoot, packageDir.contracts, 'src', `${name}.ts`);
  const contractExists = existsSync(contractFile);

  for (const framework of frameworks) {
    const dir = join(repoRoot, packageDir[framework], componentDir(framework, name));
    if (existsSync(dir)) {
      fail(
        mode === 'import'
          ? `${dir} already exists. To refresh it from upstream, run: pnpm update:component ${name}`
          : `${dir} already exists.`,
      );
    }
  }
  if (mode === 'import' && frameworks.includes('angular')) {
    const blocker = spartanBlocker(name, repoRoot);
    if (blocker) {
      fail(`${blocker}\nRun with --react to add only the React version, and document the gap.`);
    }
  }

  let description = args.description;
  if (!description && !contractExists) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    description = (await rl.question(`One-sentence description of ${pascal(name)}: `)).trim();
    rl.close();
  }

  // ── 1. Contract ────────────────────────────────────────────────────────────

  const warnings: string[] = [];

  if (contractExists) {
    console.log(`Contract ${name}.ts already exists; reusing it.`);
  } else {
    writeNew(contractFile, t.contract(name, description || 'TODO: describe this component.', axes));
    insertSorted(
      join(repoRoot, packageDir.contracts, 'src/index.ts'),
      'export {',
      t.contractExport(name, axes),
    );
  }

  // ── 2. Component per framework ─────────────────────────────────────────────

  for (const framework of frameworks) {
    const pkgRoot = join(repoRoot, packageDir[framework]);
    const dir = join(pkgRoot, componentDir(framework, name));

    if (mode === 'new') {
      scaffoldHomeGrown(framework, name, axes, pkgRoot, dir);
    } else {
      warnings.push(...importUpstream(framework, name, pkgRoot, dir));
    }
  }

  run(
    'pnpm exec prettier --write --log-level warn ' +
      [
        join(packageDir.contracts, 'src'),
        ...frameworks.map((f) => join(packageDir[f], componentDir(f, name))),
      ].join(' '),
    repoRoot,
  );

  // ── Report ─────────────────────────────────────────────────────────────────

  const P = pascal(name);
  const both = frameworks.length === 2;
  console.log(
    `\n✔ ${mode === 'new' ? 'Created home-grown' : 'Imported'} ${P} (${frameworks.join(' + ')}).`,
  );
  if (warnings.length) {
    console.log('\nCheck these:');
    for (const w of warnings) console.log(`  ! ${w}`);
  }

  const todo = [
    `Contract: check the description and fill in any axis docs in packages/contracts/src/${name}.ts.`,
    ...(mode === 'new'
      ? [
          `Build the component${both ? ' in both frameworks' : ''}, keeping the data-slot / data-* attributes and CSS rules${both ? ' in parity' : ''}.`,
        ]
      : [
          ...(frameworks.includes('react')
            ? [
                `React: move the Tailwind class strings in ${name}.tsx into ${name}.module.css and use cn(styles.x, className). Wire each contract axis (satisfies Record<…> / *Name props).`,
              ]
            : []),
          ...(frameworks.includes('angular')
            ? [
                `Angular: replace the Tailwind strings in the helm directives with curve-${name}* classes in hlm-${name}.css. Wire each contract axis.`,
              ]
            : []),
        ]),
    `Stories: cover every variant/size/state${both ? ', same story names in both' : ''}.`,
    'pnpm check:conventions && pnpm lint && pnpm build',
    'pnpm changeset (minor: new component)',
  ];
  console.log(`\nStill to do by hand (${P}):`);
  todo.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

// ── Home-grown ───────────────────────────────────────────────────────────────

function scaffoldHomeGrown(
  framework: Framework,
  name: string,
  axes: t.Axes,
  pkgRoot: string,
  dir: string,
): void {
  if (framework === 'react') {
    mkdirSync(dir, { recursive: true });
    writeNew(join(dir, `${name}.tsx`), t.reactCustomComponent(name, axes));
    writeNew(join(dir, `${name}.module.css`), t.reactCustomModuleCss(name, axes));
    writeNew(join(dir, `${name}.stories.tsx`), t.reactCustomStory(name, axes));
    writeNew(join(dir, 'index.ts'), t.reactBarrel(name));
    insertSorted(
      join(pkgRoot, 'src/index.ts'),
      "export * from '@/components/ui/",
      `export * from '@/components/ui/${name}';`,
    );
  } else {
    const lib = join(dir, 'src/lib');
    mkdirSync(lib, { recursive: true });
    writeNew(join(dir, 'src/index.ts'), t.angularCustomIndex(name));
    writeNew(join(lib, `${name}.ts`), t.angularCustomComponent(name, axes));
    writeNew(join(lib, `${name}.css`), t.angularCustomCss(name, axes));
    writeNew(join(lib, `${name}.stories.ts`), t.angularCustomStory(name, axes));
    insertBeforeMarker(
      join(pkgRoot, 'src/styles.css'),
      'curve-components:end',
      `@import './lib/ui/${name}/src/lib/${name}.css' layer(components);`,
    );
    insertSorted(
      join(pkgRoot, 'src/public-api.ts'),
      "export * from './lib/ui/",
      `export * from './lib/ui/${name}/src';`,
    );
  }
}

// ── Imported from upstream ───────────────────────────────────────────────────

/** Vendors with the CLI, snapshots to .upstream/, adds stubs. Returns warnings. */
function importUpstream(
  framework: Framework,
  name: string,
  pkgRoot: string,
  dir: string,
): string[] {
  const result = vendor(framework, name, { root: repoRoot, live: true });
  if (result.files.length === 0) {
    throw new Error(`The ${framework} CLI produced no files for "${name}".`);
  }

  // Format now, so the snapshot matches what update-component will produce.
  const vendored = result.files.map((f) => join(pkgRoot, f));
  run(`pnpm exec prettier --write ${vendored.join(' ')}`, repoRoot);
  for (const file of result.files) {
    const snapshot = join(upstreamDir(framework, name), file);
    mkdirSync(dirname(snapshot), { recursive: true });
    cpSync(join(pkgRoot, file), snapshot);
  }

  if (framework === 'react') {
    writeNew(join(dir, 'index.ts'), t.reactBarrel(name));
    writeNew(join(dir, `${name}.module.css`), t.reactModuleCss(name));
    writeNew(join(dir, `${name}.stories.tsx`), t.reactStory(name));
    insertSorted(
      join(pkgRoot, 'src/index.ts'),
      "export * from '@/components/ui/",
      `export * from '@/components/ui/${name}';`,
    );
  } else {
    const lib = join(dir, 'src/lib');
    writeNew(join(lib, `hlm-${name}.css`), t.angularCss(name));
    writeNew(join(lib, `hlm-${name}.stories.ts`), t.angularStory(name));
    insertBeforeMarker(
      join(pkgRoot, 'src/styles.css'),
      'curve-components:end',
      `@import './lib/ui/${name}/src/lib/hlm-${name}.css' layer(components);`,
    );
    insertSorted(
      join(pkgRoot, 'src/public-api.ts'),
      "export * from './lib/ui/",
      `export * from './lib/ui/${name}/src';`,
    );
  }

  return result.warnings.map((w) => `[${framework}] ${w}`);
}
