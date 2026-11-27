/**
 * Copies the generated default texts of `@surfnet/curve-microcopy` into this package as
 * `src/lib/microcopy.generated.ts`, so Vite compiles them into the library and the published types
 * don't point at the private microcopy package. Runs before build, lint and Storybook; the copy is
 * git-ignored.
 */
import { copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = createRequire(import.meta.url).resolve('@surfnet/curve-microcopy');

copyFileSync(source, resolve(root, 'src/lib/microcopy.generated.ts'));
