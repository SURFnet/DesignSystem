/**
 * Scaffolds a new component in @surfnet/curve-contracts plus @surfnet/curve-react
 * and/or @surfnet/curve-angular: vendors it with the upstream CLI, undoes the
 * CLI's side effects, and writes the contract, barrel, exports, CSS stub and
 * story stub. Also saves a pristine upstream copy in `.upstream/` so
 * `pnpm update:component` can three-way merge later upstream changes.
 *
 * With --custom it scaffolds a home-grown component instead: no CLI and no
 * .upstream/ snapshot, just a small working component with every contract axis
 * wired to a typed prop + data-* attribute. Home-grown names start with
 * `curve-` (like curve-data-table), so they never collide with an upstream one.
 *
 * What it can't do for you (it prints this list at the end): port Tailwind to
 * CSS, wire contract axes into vendored code, and write the full stories.
 *
 * Usage:
 *   pnpm new:component <name> [--react] [--angular] [--description "…"]
 *                             [--axis variants=default,outline] [--axis sizes=default,sm]
 *   pnpm new:component curve-<name> --custom [same options]
 *
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
} from './lib/repo';
import * as t from './lib/templates';
import { spartanBlocker, vendor } from './lib/vendor';

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    react: { type: 'boolean', default: false },
    angular: { type: 'boolean', default: false },
    custom: { type: 'boolean', default: false },
    description: { type: 'string' },
    axis: { type: 'string', multiple: true, default: [] },
  },
});

const name = positionals[0];
if (!name || !isKebab(name)) {
  console.error(
    'Usage: pnpm new:component <kebab-name> [--react] [--angular] [--description "…"] [--axis variants=a,b]',
  );
  process.exit(1);
}

const custom = args.custom;
if (custom && !name.startsWith('curve-')) {
  console.error(
    `Home-grown components are named curve-<name> (like curve-data-table), so they never\n` +
      `collide with a shadcn or Spartan component. Try: pnpm new:component curve-${name} --custom`,
  );
  process.exit(1);
}
if (!custom && name.startsWith('curve-')) {
  console.error(
    `"${name}" looks home-grown (curve- prefix). Add --custom to scaffold it without a CLI.`,
  );
  process.exit(1);
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
    console.error(`Bad --axis "${spec}". Expected e.g. --axis variants=default,outline`);
    process.exit(1);
  }
  axes[axis] = values;
}

// ── Pre-flight: fail before touching anything ────────────────────────────────

const contractFile = join(repoRoot, packageDir.contracts, 'src', `${name}.ts`);
const contractExists = existsSync(contractFile);

for (const framework of frameworks) {
  const dir = join(repoRoot, packageDir[framework], componentDir(framework, name));
  if (existsSync(dir)) {
    console.error(
      custom
        ? `${dir} already exists.`
        : `${dir} already exists. To refresh it from upstream, run: pnpm update:component ${name}`,
    );
    process.exit(1);
  }
}
if (!custom && frameworks.includes('angular')) {
  const blocker = spartanBlocker(name, repoRoot);
  if (blocker) {
    console.error(
      `${blocker}\nRun with --react to add only the React version, and document the gap.`,
    );
    process.exit(1);
  }
}

let description = args.description;
if (!description && !contractExists) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  description = (await rl.question(`One-sentence description of ${pascal(name)}: `)).trim();
  rl.close();
}

// ── 1. Contract ──────────────────────────────────────────────────────────────

const created: string[] = [];
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
  created.push(contractFile);
}

// ── 2. Vendor + scaffold per framework ───────────────────────────────────────

for (const framework of frameworks) {
  const pkgRoot = join(repoRoot, packageDir[framework]);
  const dir = join(pkgRoot, componentDir(framework, name));

  if (custom) {
    scaffoldCustom(framework, pkgRoot, dir);
    created.push(dir);
    continue;
  }

  const result = vendor(framework, name, { root: repoRoot, live: true });
  warnings.push(...result.warnings.map((w) => `[${framework}] ${w}`));
  if (result.files.length === 0)
    throw new Error(`The ${framework} CLI produced no files for "${name}".`);

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
  created.push(dir);
}

run(
  'pnpm exec prettier --write --log-level warn ' +
    [
      join(packageDir.contracts, 'src'),
      ...frameworks.map((f) => join(packageDir[f], componentDir(f, name))),
    ].join(' '),
  repoRoot,
);

// ── Report ───────────────────────────────────────────────────────────────────

const P = pascal(name);
console.log(`\n✔ Scaffolded ${custom ? 'home-grown ' : ''}${P} (${frameworks.join(' + ')}).`);
if (warnings.length) {
  console.log('\nCheck these:');
  for (const w of warnings) console.log(`  ! ${w}`);
}
const todo = custom
  ? [
      `Contract: check the description and fill in any axis docs in packages/contracts/src/${name}.ts.`,
      `Build the component${frameworks.length === 2 ? ' in both frameworks' : ''}, keeping the data-slot / data-* attributes and CSS rules${frameworks.length === 2 ? ' in parity' : ''}.`,
      `Stories: cover every variant/size/state${frameworks.length === 2 ? ', same story names in both' : ''}.`,
      'pnpm check:conventions && pnpm lint && pnpm build',
      'pnpm changeset (minor: new component)',
    ]
  : [
      `Contract: check the description and fill in any axis docs in packages/contracts/src/${name}.ts.`,
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
      `Stories: cover every variant/size/state${frameworks.length === 2 ? ', same story names in both' : ''}.`,
      'pnpm check:conventions && pnpm lint && pnpm build',
      'pnpm changeset (minor: new component)',
    ];
console.log(`\nStill to do by hand (${P}):`);
todo.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));

function scaffoldCustom(framework: Framework, pkgRoot: string, dir: string) {
  if (framework === 'react') {
    mkdirSync(dir, { recursive: true });
    writeNew(join(dir, `${name}.tsx`), t.reactCustomComponent(name!, axes));
    writeNew(join(dir, `${name}.module.css`), t.reactCustomModuleCss(name!, axes));
    writeNew(join(dir, `${name}.stories.tsx`), t.reactCustomStory(name!, axes));
    writeNew(join(dir, 'index.ts'), t.reactBarrel(name!));
    insertSorted(
      join(pkgRoot, 'src/index.ts'),
      "export * from '@/components/ui/",
      `export * from '@/components/ui/${name}';`,
    );
  } else {
    const lib = join(dir, 'src/lib');
    mkdirSync(lib, { recursive: true });
    writeNew(join(dir, 'src/index.ts'), t.angularCustomIndex(name!));
    writeNew(join(lib, `${name}.ts`), t.angularCustomComponent(name!, axes));
    writeNew(join(lib, `${name}.css`), t.angularCustomCss(name!, axes));
    writeNew(join(lib, `${name}.stories.ts`), t.angularCustomStory(name!, axes));
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
