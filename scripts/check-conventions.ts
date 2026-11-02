/**
 * Enforces the repo conventions that used to live only as prose in AGENTS.md and
 * the add-component skill, so people and agents get the same guardrails in CI.
 *
 * Known, accepted exceptions live in scripts/conventions.allowlist.json as
 * { "<rule>": [{ "subject": "<subject>", "reason": "<why this is accepted>" }, …] }.
 * Every entry needs a reason. Rules that check each file of a component
 * (react-no-tailwind, angular-no-tailwind, angular-css-imported) also need a
 * "file" (relative to the component directory), so the entry covers only that
 * file. Entries that no longer fail are reported so the list only ever shrinks.
 *
 * Usage: pnpm check:conventions
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { camel, listFiles, packageDir, repoRoot } from './lib/repo';

interface Violation {
  rule: string;
  subject: string;
  /** Set by rules that check each file of a component, relative to its directory. */
  file?: string;
  message: string;
}

const violations: Violation[] = [];
const fail = (rule: string, subject: string, message: string, file?: string) =>
  violations.push({ rule, subject, file, message });

const read = (rel: string) => readFileSync(join(repoRoot, rel), 'utf8');
const subdirs = (rel: string) =>
  readdirSync(join(repoRoot, rel), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

// Directories under src/lib/ui that are shared helpers, not components.
const ANGULAR_NON_COMPONENTS = ['utils', 'icon'];

const reactUi = `${packageDir.react}/src/components/ui`;
const angularUi = `${packageDir.angular}/src/lib/ui`;
const reactNames = subdirs(reactUi);
const angularNames = subdirs(angularUi).filter((n) => !ANGULAR_NON_COMPONENTS.includes(n));

// ── Contracts ────────────────────────────────────────────────────────────────

const contractsIndex = read(`${packageDir.contracts}/src/index.ts`);
for (const name of new Set([...reactNames, ...angularNames])) {
  const file = `${packageDir.contracts}/src/${name}.ts`;
  if (!existsSync(join(repoRoot, file))) {
    fail('contract-exists', name, `No contract: ${file}`);
    continue;
  }
  if (!read(file).includes(`export const ${camel(name)}Contract`)) {
    fail('contract-exists', name, `${file} does not export ${camel(name)}Contract`);
  }
  if (!contractsIndex.includes(`from './${name}.js'`)) {
    fail('contract-exported', name, `${name} contract is not exported from contracts/src/index.ts`);
  }
  if (/TODO/.test(read(file))) {
    fail('contract-complete', name, `${file} still has TODO placeholders`);
  }
}

// ── React ────────────────────────────────────────────────────────────────────

const reactIndex = read(`${packageDir.react}/src/index.ts`);
// Tailwind utility strings in className="…" / cn('…'). Heuristic; stories are exempt.
const tailwindPattern =
  /(?:className=|cn\()\s*\{?\s*["'`][^"'`]*(?:^|\s)(?:flex|grid|gap-\d|[pm][xytrbl]?-\d|text-(?:xs|sm|base|lg)|bg-[a-z]|rounded(?:-\w+)?|[wh]-\d|size-\d)(?:\s|["'`])/m;

for (const name of reactNames) {
  const dir = `${reactUi}/${name}`;
  const files = listFiles(join(repoRoot, dir));
  if (!files.includes('index.ts')) fail('react-barrel', name, `${dir}/index.ts is missing`);
  if (!files.some((f) => f.endsWith('.stories.tsx'))) {
    fail('react-story', name, `${dir} has no *.stories.tsx`);
  }
  if (!reactIndex.includes(`export * from '@/components/ui/${name}';`)) {
    fail('react-exported', name, `${name} is not exported from packages/react/src/index.ts`);
  }
  for (const file of files.filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'))) {
    if (tailwindPattern.test(read(`${dir}/${file}`))) {
      fail(
        'react-no-tailwind',
        name,
        `${dir}/${file} has Tailwind utility classes; move them to a CSS module`,
        file,
      );
    }
  }
}

const reactPkg = JSON.parse(read(`${packageDir.react}/package.json`));
if (!reactPkg.peerDependencies?.['@phosphor-icons/react']) {
  fail('react-phosphor-peer', 'package.json', '@phosphor-icons/react must stay a peerDependency');
}
if (reactPkg.dependencies?.['@surfnet/curve-contracts']) {
  fail('contracts-dev-only', 'react', '@surfnet/curve-contracts must be a devDependency only');
}

// ── Angular ──────────────────────────────────────────────────────────────────

const publicApi = read(`${packageDir.angular}/src/public-api.ts`);
const stylesCss = read(`${packageDir.angular}/src/styles.css`);

for (const name of angularNames) {
  const dir = `${angularUi}/${name}`;
  const files = listFiles(join(repoRoot, dir));
  if (!publicApi.includes(`export * from './lib/ui/${name}/src';`)) {
    fail(
      'angular-exported',
      name,
      `${name} is not exported from packages/angular/src/public-api.ts`,
    );
  }
  if (!files.some((f) => f.endsWith('.stories.ts'))) {
    fail('angular-story', name, `${dir} has no *.stories.ts`);
  }
  // Helm directives should only set curve-* classes (plus Tailwind group/peer
  // markers, kept for consumers). Anything else is leftover Tailwind.
  for (const file of files.filter((f) => f.endsWith('.ts') && !f.endsWith('.stories.ts'))) {
    const text = read(`${dir}/${file}`);
    for (const [, literal] of text.matchAll(/classes\(\s*\(\)\s*=>\s*'([^']*)'/g)) {
      const stray = literal!
        .split(/\s+/)
        .filter((c) => c && !/^(curve-|group$|peer$|group\/|peer\/)/.test(c));
      if (stray.length) {
        fail(
          'angular-no-tailwind',
          name,
          `${dir}/${file} sets non-curve classes (${stray.slice(0, 3).join(' ')}…); move them to CSS`,
          file,
        );
        break;
      }
    }
  }
  for (const css of files.filter((f) => f.endsWith('.css'))) {
    if (!stylesCss.includes(`./lib/ui/${name}/${css}`)) {
      fail('angular-css-imported', name, `${dir}/${css} is not imported in src/styles.css`, css);
    }
  }
}

const angularPkg = JSON.parse(read(`${packageDir.angular}/package.json`));
if (angularPkg.dependencies?.['@surfnet/curve-contracts']) {
  fail('contracts-dev-only', 'angular', '@surfnet/curve-contracts must be a devDependency only');
}
const angularJson = JSON.parse(read(`${packageDir.angular}/angular.json`));
for (const target of ['storybook', 'build-storybook']) {
  const options = angularJson.projects?.angular?.architect?.[target]?.options;
  if (options?.browserTarget !== 'angular:build') {
    fail(
      'angular-browser-target',
      target,
      `angular.json ${target} target needs browserTarget "angular:build"`,
    );
  }
}

// ── Parity ───────────────────────────────────────────────────────────────────

const storyTitle = (text: string) => /^\s*title:\s*'([^']+)'/m.exec(text)?.[1];
for (const name of reactNames.filter((n) => angularNames.includes(n))) {
  const reactStory = listFiles(join(repoRoot, reactUi, name)).find((f) =>
    f.endsWith('.stories.tsx'),
  );
  const angularStory = listFiles(join(repoRoot, angularUi, name)).find((f) =>
    f.endsWith('.stories.ts'),
  );
  if (!reactStory || !angularStory) continue;
  const a = storyTitle(read(`${reactUi}/${name}/${reactStory}`));
  const b = storyTitle(read(`${angularUi}/${name}/${angularStory}`));
  if (a !== b)
    fail('story-title-parity', name, `Story titles differ: React "${a}" vs Angular "${b}"`);
}

// ── Report ───────────────────────────────────────────────────────────────────

const allowlistPath = join(repoRoot, 'scripts/conventions.allowlist.json');
interface AllowlistEntry {
  subject: string;
  /** Required for per-file rules, so a new violation in another file still fails. */
  file?: string;
  reason: string;
}
const allowlist: Record<string, AllowlistEntry[]> = existsSync(allowlistPath)
  ? JSON.parse(readFileSync(allowlistPath, 'utf8'))
  : {};
const covers = (entry: AllowlistEntry, rule: string, v: Violation) =>
  v.rule === rule && v.subject === entry.subject && v.file === entry.file;
const allowed = (v: Violation) =>
  allowlist[v.rule]?.some((entry) => covers(entry, v.rule, v)) ?? false;
const label = ({ subject, file }: AllowlistEntry) => (file ? `${subject} (${file})` : subject);
// The rule fails per file for this subject, but the entry names no file.
const missesFile = (entry: AllowlistEntry, rule: string) =>
  !entry.file && violations.some((v) => v.rule === rule && v.subject === entry.subject && v.file);

for (const [rule, entries] of Object.entries(allowlist)) {
  for (const entry of entries) {
    if (!entry.reason?.trim()) {
      fail(
        'allowlist-reason',
        `${rule}: ${label(entry)}`,
        `Allowlist entry ${rule}: ${label(entry)} has no reason`,
      );
    }
    if (missesFile(entry, rule)) {
      fail(
        'allowlist-file',
        `${rule}: ${label(entry)}`,
        `Allowlist entry ${rule}: ${label(entry)} needs a "file": this rule checks each file separately`,
      );
    }
  }
}

const errors = violations.filter((v) => !allowed(v));
const stale = Object.entries(allowlist).flatMap(([rule, entries]) =>
  entries
    .filter((entry) => !violations.some((v) => covers(entry, rule, v)) && !missesFile(entry, rule))
    .map((entry) => `${rule}: ${label(entry)}`),
);

if (stale.length) {
  console.warn(
    'Allowlist entries that now pass. Remove them from scripts/conventions.allowlist.json:',
  );
  for (const s of stale) console.warn(`  - ${s}`);
}

if (errors.length) {
  console.error(`\n${errors.length} convention violation(s):`);
  for (const v of errors) console.error(`  ✗ [${v.rule}] ${v.message}`);
  console.error(
    '\nFix them, or (for an accepted exception) add the subject (plus the file, for per-file rules) with a reason to scripts/conventions.allowlist.json.',
  );
  process.exit(1);
}

console.log(
  `✔ Conventions OK (${reactNames.length} React, ${angularNames.length} Angular components; ` +
    `${violations.length - errors.length} allowlisted).`,
);
