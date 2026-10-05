// Bundles src/styles.css (and everything it @imports, keeping `layer(...)`)
// into dist/styles.css with Lightning CSS.
//
// Relative imports resolve against the importing file. Bare package imports
// (`@surfnet/curve-tokens/tokens.css`, `@angular/cdk/overlay-prebuilt.css`, …)
// go through Node's own resolver; run with `node --conditions=style` so it
// picks the CSS-oriented `style` export (the CDK stylesheet has no other).
// url()s are left as written; copy-font-files.ts puts the font files next to
// the output.

import { writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundleAsync } from 'lightningcss';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(packageRoot, 'src/styles.css');
const output = join(packageRoot, 'dist/styles.css');

const { code, warnings } = await bundleAsync({
  filename: entry,
  minify: true,
  resolver: {
    resolve(specifier, from) {
      return specifier.startsWith('.')
        ? resolve(dirname(from), specifier)
        : fileURLToPath(import.meta.resolve(specifier));
    },
  },
});

for (const warning of warnings) console.warn(`${warning.loc.filename}: ${warning.message}`);
writeFileSync(output, code);
console.log(`Bundled ${join('dist', 'styles.css')} (${(code.length / 1024).toFixed(1)} kB).`);
