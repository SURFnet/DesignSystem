// Cross-platform replacement for `rm -rf` + `cp -RL` (fail on Windows).
// dereference: true is needed since pnpm symlinks node_modules packages.

import { cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'node_modules/@fontsource-variable/geist/files');
const destination = join(packageRoot, 'dist/files');

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true, dereference: true });

console.log(`Copied font files to ${join('dist', 'files')}.`);
