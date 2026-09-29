/**
 * Shared paths, naming and file helpers for the component scripts
 * (new-component, update-component, check-conventions).
 */

import { execSync, type ExecSyncOptions } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = resolve(fileURLToPath(import.meta.url), '..', '..', '..');

export type Framework = 'react' | 'angular';

/** Package roots, relative to a checkout root (the repo, or a temp worktree). */
export const packageDir = {
  react: 'packages/react',
  angular: 'packages/angular',
  contracts: 'packages/contracts',
} as const;

/** Where a component's vendored source lives, relative to its package root. */
export function componentDir(framework: Framework, name: string): string {
  return framework === 'react' ? `src/components/ui/${name}` : `src/lib/ui/${name}`;
}

/** Pristine upstream copies live here, mirroring the package-relative path. */
export function upstreamDir(framework: Framework, name: string, root = repoRoot): string {
  return join(root, packageDir[framework], '.upstream', name);
}

// ── Naming ───────────────────────────────────────────────────────────────────

/** `message-scroller` → `MessageScroller` */
export function pascal(name: string): string {
  return name.replace(/(^|-)([a-z0-9])/g, (_m, _dash, c: string) => c.toUpperCase());
}

/** `message-scroller` → `messageScroller` */
export function camel(name: string): string {
  const p = pascal(name);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

export function isKebab(name: string): boolean {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name);
}

// ── Files ────────────────────────────────────────────────────────────────────

/** All files below `dir`, as paths relative to `dir`. Missing dir → empty list. */
export function listFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  const walk = (current: string) => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(relative(dir, full));
    }
  };
  walk(dir);
  return out.sort();
}

/** Appends `line` to `file` unless an identical line is already present. */
export function appendLineOnce(file: string, line: string): boolean {
  const text = readFileSync(file, 'utf8');
  if (text.split('\n').includes(line)) return false;
  writeFileSync(file, `${text.replace(/\n*$/, '\n')}${line}\n`);
  return true;
}

/**
 * Inserts `line` among the lines starting with `prefix`, before the first one
 * that sorts after it (or after the last of them). Keeps export lists ordered.
 */
export function insertSorted(file: string, prefix: string, line: string): boolean {
  const lines = readFileSync(file, 'utf8').split('\n');
  if (lines.includes(line)) return false;
  const matching = lines.flatMap((l, i) => (l.startsWith(prefix) ? [i] : []));
  if (matching.length === 0) throw new Error(`No lines starting with "${prefix}" in ${file}`);
  const next = matching.find((i) => lines[i]!.localeCompare(line) > 0);
  lines.splice(next ?? matching.at(-1)! + 1, 0, line);
  writeFileSync(file, lines.join('\n'));
  return true;
}

/** Inserts `line` on its own line right before the first line containing `marker`. */
export function insertBeforeMarker(file: string, marker: string, line: string): boolean {
  const lines = readFileSync(file, 'utf8').split('\n');
  if (lines.includes(line)) return false;
  const at = lines.findIndex((l) => l.includes(marker));
  if (at === -1) throw new Error(`Marker "${marker}" not found in ${file}`);
  lines.splice(at, 0, line);
  writeFileSync(file, lines.join('\n'));
  return true;
}

/** Writes a new file; refuses to overwrite an existing one. */
export function writeNew(file: string, content: string): void {
  if (existsSync(file)) throw new Error(`Refusing to overwrite existing file: ${file}`);
  writeFileSync(file, content);
}

// ── Processes ────────────────────────────────────────────────────────────────

export function run(command: string, cwd: string, options: ExecSyncOptions = {}): void {
  console.log(`\n$ ${command}   (in ${relative(repoRoot, cwd) || '.'})`);
  execSync(command, { cwd, stdio: 'inherit', ...options });
}

export function capture(command: string, cwd: string): string {
  return execSync(command, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}
