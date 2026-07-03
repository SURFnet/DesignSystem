/**
 * Pulls tokens from the Figma Variables API and writes them as DTCG JSON into
 * packages/tokens/src/ (tokens.json, tokens.dark.json, tokens.<class>[.dark].json
 * per extra theme). JSON only — the @surfnet/curve-tokens build turns these into CSS.
 * Needs FIGMA_TOKEN + FIGMA_FILE_ID in .env.
 *
 * Usage: pnpm sync:figma [--theme "SURF Blue"]
 */

import 'dotenv/config';
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import type {
  GetLocalVariablesResponse,
  LocalVariableCollection,
  RGBA,
  VariableAlias,
} from '@figma/rest-api-spec';

type ModeValue = boolean | number | string | RGBA | VariableAlias;
type TokenMap = Record<string, string>;
type DtcgType = 'color' | 'number' | 'fontFamily' | 'dimension' | 'other';

const { values: args } = parseArgs({
  options: { theme: { type: 'string', default: 'SURF Blue' } },
  strict: false,
});

const DEFAULT_THEME = args.theme as string;
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error('ERROR: set FIGMA_TOKEN and FIGMA_FILE_ID in .env');
  process.exit(1);
}

const outDir = resolve(fileURLToPath(import.meta.url), '..', '..', 'packages/tokens/src');

console.log(`\nFetching variables from Figma file ${FIGMA_FILE_ID}…`);

const resp = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables/local`, {
  headers: { 'X-Figma-Token': FIGMA_TOKEN },
});
if (!resp.ok) {
  console.error(`Figma API error ${resp.status}: ${await resp.text()}`);
  process.exit(1);
}

const { meta } = (await resp.json()) as GetLocalVariablesResponse;
const collections = meta.variableCollections;
const variables = meta.variables;

const isAlias = (v: ModeValue): v is VariableAlias =>
  typeof v === 'object' && v !== null && (v as VariableAlias).type === 'VARIABLE_ALIAS';
const isColor = (v: ModeValue): v is RGBA => typeof v === 'object' && v !== null && 'r' in v;

/** Largest collection (by var count) matching `namePart` and `requiredModes`;
 *  "largest" skips small external-library shadow copies. */
function findCollection(
  namePart: string,
  requiredModes: string[] = [],
): LocalVariableCollection | null {
  let best: LocalVariableCollection | null = null;
  for (const col of Object.values(collections)) {
    const modeNames = col.modes.map((m) => m.name);
    const matches =
      col.name.includes(namePart) && requiredModes.every((m) => modeNames.includes(m));
    if (matches && (!best || col.variableIds.length > best.variableIds.length)) best = col;
  }
  return best;
}

const modeCol = findCollection('3. Mode', ['Light', 'Dark']);
if (!modeCol) {
  console.error('Could not find "3. Mode" collection with Light/Dark modes');
  process.exit(1);
}
const lightModeId = modeCol.modes.find((m) => m.name === 'Light')!.modeId;
const darkModeId = modeCol.modes.find((m) => m.name === 'Dark')!.modeId;

const themeCol = findCollection('2. Theme', [DEFAULT_THEME]);
if (!themeCol) {
  const available = Object.values(collections)
    .filter((c) => c.name.includes('Theme'))
    .flatMap((c) => c.modes.map((m) => m.name))
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(', ');
  console.error(`Theme "${DEFAULT_THEME}" not found. Available themes: ${available}`);
  process.exit(1);
}

const allThemeModes = themeCol.modes;
console.log(`Default theme: "${DEFAULT_THEME}" — syncing ${allThemeModes.length} theme(s)`);

// "1. TailwindCSS" — border-radius + font-family tokens (single mode)
const twCol = findCollection('1. TailwindCSS');
const twModeId = twCol?.modes[0]?.modeId ?? null;

// Stop boundary so resolveAlias doesn't cross into the theme layer with a
// semantic mode ID; a second pass then applies the correct theme mode.
const themeModeIds = new Set(themeCol.modes.map((m) => m.modeId));

/** Resolve VARIABLE_ALIAS chains to a concrete value. `preferredModeId` is tried
 *  first, falling back to the first mode. If `stopAtModes` is given, return the
 *  alias unfollowed once the target's modes are all within it. */
function resolveAlias(
  value: ModeValue,
  preferredModeId: string,
  stopAtModes: Set<string> | null = null,
  depth = 0,
): ModeValue {
  if (depth > 10 || !isAlias(value)) return value;

  const refVar = variables[value.id];
  if (!refVar) return value; // external / library variable

  if (stopAtModes && Object.keys(refVar.valuesByMode).every((m) => stopAtModes.has(m))) {
    return value;
  }

  const next = refVar.valuesByMode[preferredModeId] ?? Object.values(refVar.valuesByMode)[0];
  if (next === undefined) return value;
  return resolveAlias(next, preferredModeId, stopAtModes, depth + 1);
}

const figmaColorToRgba = ({ r, g, b, a = 1 }: RGBA): string =>
  `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${parseFloat(a.toFixed(2))})`;

/** Resolve a colour through "3. Mode" (semantic) into a "2. Theme" palette. */
function resolveColor(varId: string, semanticModeId: string, themeModeId: string): string | null {
  const raw = variables[varId]?.valuesByMode[semanticModeId];
  if (raw === undefined) return null;
  const resolved = resolveAlias(resolveAlias(raw, semanticModeId, themeModeIds), themeModeId);
  return isColor(resolved) ? figmaColorToRgba(resolved) : null;
}

const pxToRem = (px: number): string =>
  `${parseFloat((px / 16).toFixed(4).replace(/\.?0+$/, ''))}rem`;

/** "SURF Blue" → "surf-blue"; "Groenvermogen / NKPH2" → "groenvermogen-nkph2". */
const themeNameToClass = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Figma variable name → CSS custom property name (without leading `--`). */
function figmaNameToCssProp(name: string): string {
  const segments = name.split('/');
  const relevant = segments[0] === 'base' ? segments.slice(1) : segments;
  return relevant
    .join('-')
    .replace(/\\/g, '')
    .replace(/[^a-zA-Z0-9\-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Collectors return flat { cssProp → value } maps (key = CSS prop minus `--`).

/** All colour vars in "3. Mode" resolved through the given theme mode. */
function collectColorTokens(semanticModeId: string, themeModeId: string): TokenMap {
  const tokens: TokenMap = {};
  for (const varId of modeCol!.variableIds) {
    const v = variables[varId];
    if (!v || v.resolvedType !== 'COLOR') continue;
    const val = resolveColor(varId, semanticModeId, themeModeId);
    if (val) tokens[figmaNameToCssProp(v.name)] = val;
  }
  return tokens;
}

/** Radius + font-family tokens from "1. TailwindCSS" (theme-independent). */
function collectTailwindTokens(): { radius: TokenMap; font: TokenMap } {
  const radius: TokenMap = {};
  const font: TokenMap = {};
  if (!twCol || !twModeId) return { radius, font };

  for (const varId of twCol.variableIds) {
    const v = variables[varId];
    const raw = v?.valuesByMode[twModeId];
    if (!v || raw === undefined) continue;
    const val = resolveAlias(raw, twModeId);

    if (
      v.resolvedType === 'FLOAT' &&
      v.name.startsWith('border-radius/') &&
      typeof val === 'number'
    ) {
      const step = v.name.slice('border-radius/'.length).replace(/^rounded-/, '');
      radius[`radius-${step}`] =
        val === 9999 ? '624.9375rem' : `${(val / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
    }
    if (
      v.resolvedType === 'STRING' &&
      v.name.startsWith('font-family/') &&
      typeof val === 'string'
    ) {
      font[`font-${v.name.slice('font-family/'.length)}`] = val;
    }
  }
  return { radius, font };
}

/** Non-colour tokens (typography, radius, blur, …) from "2. Theme" for the given
 *  theme mode, plus the resolved font stacks. */
function collectThemeNonColorTokens(themeModeId: string): TokenMap {
  const tokens: TokenMap = {};

  for (const varId of themeCol!.variableIds) {
    const v = variables[varId];
    if (!v || v.resolvedType === 'COLOR') continue;
    const raw = v.valuesByMode[themeModeId];
    if (raw === undefined) continue;
    const val = resolveAlias(raw, themeModeId);

    const parts = v.name.split('/');
    const top = parts[0] ?? '';
    const name = parts[1] ?? '';

    if (top === 'text' && parts.length === 3 && typeof val === 'number') {
      const prop = parts[2];
      if (prop === 'font-size' || prop === 'line-height')
        tokens[`text-${name}-${prop}`] = pxToRem(val);
    } else if (top === 'font' && parts.length === 2 && typeof val === 'string') {
      tokens[`font-${name}`] = val;
    } else if (top === 'font-weight' && parts.length === 2 && typeof val === 'number') {
      tokens[`font-weight-${name}`] = String(val);
    } else if (top === 'radius' && parts.length === 2 && typeof val === 'number') {
      tokens[`radius-${name}`] = pxToRem(val);
    } else if (top === 'blur' && parts.length === 2 && typeof val === 'number') {
      tokens[`blur-${name}`] = `${val}px`;
    } else if (top === 'breakpoint' && parts.length === 2 && typeof val === 'number') {
      tokens[`breakpoint-${name}`] = `${val}px`;
    } else if (top === 'container' && parts.length === 2 && typeof val === 'number') {
      tokens[`container-${name}`] = `${val}px`;
    } else if (
      (top === 'shadow' || top === 'drop-shadow' || top === 'inset-shadow') &&
      typeof val === 'number'
    ) {
      tokens[figmaNameToCssProp(v.name)] = `${val}px`;
    }
  }

  // Collapse font stacks (font/font-sans, font/font-mono) → --font-sans / --font-mono.
  const sans = tokens['font-font-sans'] ?? 'Source Sans 3';
  const mono = tokens['font-font-mono'] ?? 'Geist Mono';
  delete tokens['font-font-sans'];
  delete tokens['font-font-serif'];
  delete tokens['font-font-mono'];
  tokens['font-sans'] = `${sans}, sans-serif`;
  tokens['font-mono'] = `${mono}, monospace`;

  return tokens;
}

/** Infer a DTCG $type from a resolved CSS value string. */
function inferType(key: string, value: string): DtcgType {
  if (/^rgba?\(|^#|^oklch\(|^hsl/.test(value)) return 'color';
  if (key.startsWith('font-weight')) return 'number';
  if (key.startsWith('font-')) return 'fontFamily';
  if (/(rem|px|em)$/.test(value)) return 'dimension';
  return 'other';
}

// Canonical key order for stable output; unlisted keys keep Figma order after.
const KEY_ORDER = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
  'font-sans',
  'font-mono',
];

function orderedKeys(map: TokenMap): string[] {
  const known = KEY_ORDER.filter((k) => k in map);
  const rest = Object.keys(map).filter((k) => !KEY_ORDER.includes(k));
  return [...known, ...rest];
}

function writeJson(filename: string, map: TokenMap): number {
  const doc: Record<string, { $type: DtcgType; $value: string }> = {};
  for (const key of orderedKeys(map)) {
    const value = map[key];
    if (value === undefined) continue;
    doc[key] = { $type: inferType(key, value), $value: value };
  }
  writeFileSync(resolve(outDir, filename), JSON.stringify(doc, null, 2) + '\n', 'utf8');
  return Object.keys(map).length;
}

const { radius: twRadius, font: twFont } = collectTailwindTokens();

// Drop stale per-theme files from previous syncs (keep the default dark pair).
for (const f of readdirSync(outDir)) {
  if (/^tokens\..+\.json$/.test(f) && f !== 'tokens.dark.json') rmSync(resolve(outDir, f));
}
mkdirSync(outDir, { recursive: true });

console.log('\nWriting token files:');

for (const { modeId, name } of allThemeModes) {
  const shared = { ...collectThemeNonColorTokens(modeId), ...twFont, ...twRadius };
  const light = { ...collectColorTokens(lightModeId, modeId), ...shared };
  const dark = { ...collectColorTokens(darkModeId, modeId), ...shared };

  const cls = themeNameToClass(name);
  const isDefault = name === DEFAULT_THEME;
  const lightFile = isDefault ? 'tokens.json' : `tokens.${cls}.json`;
  const darkFile = isDefault ? 'tokens.dark.json' : `tokens.${cls}.dark.json`;

  console.log(
    `  ${name.padEnd(20)} → ${lightFile} (${writeJson(lightFile, light)}), ${darkFile} (${writeJson(darkFile, dark)})`,
  );
}

console.log(`\nSynced to ${outDir}`);
console.log('Run `pnpm --filter @surfnet/curve-tokens build` to regenerate CSS.');
