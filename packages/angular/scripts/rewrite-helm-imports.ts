/**
 * Rewrites `@spartan-ng/helm/<name>` imports to relative paths.
 *
 * The Spartan CLI always vendors cross-component references through the
 * `@spartan-ng/helm/<name>` tsconfig path alias. That alias only resolves at
 * build time in a consuming *app* (whose own bundler reads tsconfig `paths`).
 * `@surfnet/angular` instead builds itself into a redistributable package via
 * ng-packagr, which does not consult tsconfig `paths` and leaves the alias as
 * an unresolved external import in the published bundle. Run this after every
 * `ng g @spartan-ng/cli:ui <component>` to convert the new alias imports to
 * relative ones so ng-packagr inlines them correctly.
 *
 * Usage: pnpm --filter @surfnet/angular fix-helm-imports
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = join(packageRoot, 'src');
const importPattern = /from (['"])@spartan-ng\/helm\/([a-z0-9-]+)\1/g;

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (entry.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

function toRelativeSpecifier(fromFile: string, name: string): string {
  const targetDir = join(srcRoot, 'lib', 'ui', name, 'src');
  let rel = relative(dirname(fromFile), targetDir).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

let changedFiles = 0;
let changedImports = 0;

for (const file of walk(srcRoot)) {
  const original = readFileSync(file, 'utf8');
  let fileChanged = false;
  const updated = original.replace(importPattern, (_match, quote: string, name: string) => {
    fileChanged = true;
    changedImports++;
    return `from ${quote}${toRelativeSpecifier(file, name)}${quote}`;
  });
  if (fileChanged) {
    writeFileSync(file, updated);
    changedFiles++;
  }
}

console.log(`Rewrote ${changedImports} import(s) across ${changedFiles} file(s).`);
