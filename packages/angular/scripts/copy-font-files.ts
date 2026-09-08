// Cross-platform replacement for `rm -rf` + `cp -RL` (fail on Windows).
// dereference: true is needed since pnpm symlinks node_modules packages.
//
// Each fontsource-variable package's `files/` directory is flat and prefixes
// every filename with its own font name (e.g. `geist-*`, `source-sans-3-*`),
// so all packages' files can be copied into the same destination directory
// without collisions.

import { cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const destination = join(packageRoot, 'dist/files');
const fontPackages = ['@fontsource-variable/geist', '@fontsource-variable/source-sans-3'];

rmSync(destination, { recursive: true, force: true });
for (const fontPackage of fontPackages) {
  const source = join(packageRoot, 'node_modules', fontPackage, 'files');
  cpSync(source, destination, { recursive: true, dereference: true });
}

console.log(`Copied font files to ${join('dist', 'files')}.`);
