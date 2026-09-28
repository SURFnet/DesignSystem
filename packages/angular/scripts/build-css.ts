// Bundles src/styles.css (and everything it @imports, keeping `layer(...)`)
// into dist/styles.css with Lightning CSS — no Tailwind involved.
//
// Relative imports resolve against the importing file. Bare package imports
// (`@surfnet/curve-tokens/tokens.css`, `@angular/cdk/overlay-prebuilt.css`, …)
// resolve through the package's `exports` using the CSS-oriented `style` /
// `default` conditions, which Node's own resolver doesn't do. url()s are left
// as written; copy-font-files.ts puts the font files next to the output.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleAsync } from 'lightningcss';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(packageRoot, 'src/styles.css');
const output = join(packageRoot, 'dist/styles.css');

/** Finds `<name>/package.json` in the nearest node_modules (packages needn't export it). */
function findManifest(name: string): string {
  for (let dir = packageRoot; ; dir = dirname(dir)) {
    const candidate = join(dir, 'node_modules', name, 'package.json');
    if (existsSync(candidate)) return candidate;
    if (dirname(dir) === dir) throw new Error(`Cannot find package "${name}"`);
  }
}

type ExportTarget = string | { [condition: string]: ExportTarget } | null;

function pickTarget(target: ExportTarget): string | null {
  if (target === null || typeof target === 'string') return target;
  for (const condition of ['style', 'default', 'import', 'require']) {
    const picked = pickTarget(target[condition] ?? null);
    if (picked) return picked;
  }
  return null;
}

function resolvePackageCss(specifier: string): string {
  const name = /^(@[^/]+\/)?[^/]+/.exec(specifier)?.[0] ?? specifier;
  const subpath = `.${specifier.slice(name.length)}`;
  const manifestPath = findManifest(name);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const exported = manifest.exports?.[subpath === '.' ? '.' : subpath];
  const target =
    pickTarget(exported ?? null) ??
    (subpath === '.' ? (manifest.style ?? manifest.main) : subpath.slice(2));
  if (!target) throw new Error(`Cannot resolve CSS import "${specifier}"`);
  return resolve(dirname(manifestPath), target);
}

const { code, warnings } = await bundleAsync({
  filename: entry,
  minify: true,
  resolver: {
    resolve(specifier, from) {
      return specifier.startsWith('.')
        ? resolve(dirname(from), specifier)
        : resolvePackageCss(specifier);
    },
  },
});

for (const warning of warnings) console.warn(`${warning.loc.filename}: ${warning.message}`);
writeFileSync(output, code);
console.log(`Bundled ${join('dist', 'styles.css')} (${(code.length / 1024).toFixed(1)} kB).`);
