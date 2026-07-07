/**
 * Copies the Geist variable font files into `dist/files` after the Tailwind
 * CSS build.
 *
 * Previously done with `rm -rf` + `cp -RL`, which only run on a POSIX shell
 * and fail on Windows. `fs.rmSync`/`fs.cpSync` give the same recursive-copy-
 * with-symlink-dereferencing behaviour natively, so the build works the same
 * on every OS without adding a shell-utility dependency. Dereferencing matters
 * because pnpm's node_modules stores `@fontsource-variable/geist` as a symlink
 * into the content-addressable store.
 *
 * Usage: pnpm --filter @surfnet/curve-angular build:css
 */

import { cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'node_modules/@fontsource-variable/geist/files');
const destination = join(packageRoot, 'dist/files');

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true, dereference: true });

console.log(`Copied font files to ${join('dist', 'files')}.`);
