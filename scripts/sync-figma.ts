/**
 * Pulls tokens from the Figma Variables API and writes them as DTCG JSON into
 * packages/tokens/src/ (tokens.json, tokens.dark.json, tokens.<class>[.dark].json
 * per extra theme). JSON only — the @surfnet/tokens build turns these into CSS.
 * Needs FIGMA_TOKEN + FIGMA_FILE_ID in .env.
 *
 * By default it reads from the main file. Pass --branch "<name-or-key>" (or set
 * FIGMA_BRANCH) to pull variables from a Figma branch instead. A branch key (the
 * segment after /branch/ in the branch URL) is used directly; anything else is
 * treated as a branch name and resolved to its key via the file's branch
 * metadata (which needs the file_content:read token scope).
 *
 * Usage: pnpm sync:figma [--theme "SURF Blue"] [--branch "my-branch"]
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
  options: {
    theme: { type: 'string', default: 'SURF Blue' },
    branch: { type: 'string' },
  },
  strict: false,
});

const DEFAULT_THEME = args.theme as string;
const BRANCH = (args.branch as string | undefined) ?? process.env.FIGMA_BRANCH;
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error('ERROR: set FIGMA_TOKEN and FIGMA_FILE_ID in .env');
  process.exit(1);
}

const outDir = resolve(fileURLToPath(import.meta.url), '..', '..', 'packages/tokens/src');

/** Resolve a Figma branch name to its own file key (branches are separate files). */
async function resolveBranchFileKey(branchName: string): Promise<string> {
  const metaResp = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_ID}?branch_data=true&depth=1`,
    { headers: { 'X-Figma-Token': FIGMA_TOKEN! } },
  );
  if (!metaResp.ok) {
    console.error(`Figma API error ${metaResp.status}: ${await metaResp.text()}`);
    process.exit(1);
  }
  const { branches = [] } = (await metaResp.json()) as {
    branches?: { key: string; name: string }[];
  };
  const branch = branches.find((b) => b.name === branchName);
  if (!branch) {
    const available = branches.map((b) => `"${b.name}"`).join(', ') || '(none)';
    console.error(`Branch "${branchName}" not found. Available branches: ${available}`);
    process.exit(1);
  }
  return branch.key;
}

/** Figma file/branch keys are ~22-char base62 strings (no spaces). */
const looksLikeKey = (s: string): boolean => /^[A-Za-z0-9]{15,}$/.test(s);

const fileKey = BRANCH
  ? looksLikeKey(BRANCH)
    ? BRANCH
    : await resolveBranchFileKey(BRANCH)
  : FIGMA_FILE_ID;

console.log(
  BRANCH
    ? `\nFetching variables from Figma branch "${BRANCH}" (${fileKey})…`
    : `\nFetching variables from Figma file ${fileKey}…`,
);

const resp = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
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

// Layout detection. The original ("v1") file separates Light/Dark and theme into
// two collections ("3. Mode" × "2. Theme"). The redesigned ("v2") layout folds
// them into one themes collection whose modes are per-theme + per-scheme
// (e.g. "SURF Blue - Light"), with primitives in a Tailwind collection and
// typography in a Typography collection. The v2 collections are detected
// structurally rather than by name/number — the branch renumbers them as it
// evolves (e.g. "3. Themes" → "4. Themes").
const SCHEME_MODE = /[-–]\s*(light|dark)\s*$/i;

/** The largest collection whose modes carry a "<theme> - Light/Dark" suffix. */
const findThemesV2 = (): LocalVariableCollection | null => {
  let best: LocalVariableCollection | null = null;
  for (const col of Object.values(collections)) {
    if (!col.modes.some((m) => SCHEME_MODE.test(m.name))) continue;
    if (!best || col.variableIds.length > best.variableIds.length) best = col;
  }
  return best;
};

const modeCol = findCollection('3. Mode', ['Light', 'Dark']);
const themesCol = findThemesV2();
if (!modeCol && !themesCol) {
  console.error(
    'Could not find a "3. Mode" (Light/Dark) collection or a themes collection with "<theme> - Light/Dark" modes',
  );
  process.exit(1);
}
const layout: 'v1' | 'v2' = modeCol ? 'v1' : 'v2';
console.log(
  `Variable layout: ${layout === 'v1' ? 'standard ("3. Mode" × "2. Theme")' : `redesigned ("${themesCol!.name}")`}`,
);

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

type ThemeOutput = { name: string; light: TokenMap; dark: TokenMap };

/** v1 layout: "3. Mode" (Light/Dark) resolved through each "2. Theme" palette. */
function collectV1(): ThemeOutput[] {
  const lightModeId = modeCol!.modes.find((m) => m.name === 'Light')!.modeId;
  const darkModeId = modeCol!.modes.find((m) => m.name === 'Dark')!.modeId;

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

  // "1. TailwindCSS" — border-radius + font-family tokens (single mode)
  const twCol = findCollection('1. TailwindCSS');
  const twModeId = twCol?.modes[0]?.modeId ?? null;

  // Stop boundary so resolveAlias doesn't cross into the theme layer with a
  // semantic mode ID; a second pass then applies the correct theme mode.
  const themeModeIds = new Set(themeCol.modes.map((m) => m.modeId));

  /** Resolve a colour through "3. Mode" (semantic) into a "2. Theme" palette. */
  const resolveColor = (
    varId: string,
    semanticModeId: string,
    themeModeId: string,
  ): string | null => {
    const raw = variables[varId]?.valuesByMode[semanticModeId];
    if (raw === undefined) return null;
    const resolved = resolveAlias(resolveAlias(raw, semanticModeId, themeModeIds), themeModeId);
    return isColor(resolved) ? figmaColorToRgba(resolved) : null;
  };

  /** All colour vars in "3. Mode" resolved through the given theme mode. */
  const collectColorTokens = (semanticModeId: string, themeModeId: string): TokenMap => {
    const tokens: TokenMap = {};
    for (const varId of modeCol!.variableIds) {
      const v = variables[varId];
      if (!v || v.resolvedType !== 'COLOR') continue;
      const val = resolveColor(varId, semanticModeId, themeModeId);
      if (val) tokens[figmaNameToCssProp(v.name)] = val;
    }
    return tokens;
  };

  /** Radius + font-family tokens from "1. TailwindCSS" (theme-independent). */
  const collectTailwindTokens = (): { radius: TokenMap; font: TokenMap } => {
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
  };

  /** Non-colour tokens (typography, radius, blur, …) from "2. Theme" for the given
   *  theme mode, plus the resolved font stacks. */
  const collectThemeNonColorTokens = (themeModeId: string): TokenMap => {
    const tokens: TokenMap = {};

    for (const varId of themeCol.variableIds) {
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
  };

  const { radius: twRadius, font: twFont } = collectTailwindTokens();
  console.log(`Default theme: "${DEFAULT_THEME}" — syncing ${themeCol.modes.length} theme(s)`);

  return themeCol.modes.map(({ modeId, name }) => {
    const shared = { ...collectThemeNonColorTokens(modeId), ...twFont, ...twRadius };
    return {
      name,
      light: { ...collectColorTokens(lightModeId, modeId), ...shared },
      dark: { ...collectColorTokens(darkModeId, modeId), ...shared },
    };
  });
}

/** v2 layout: a single themes collection (modes = "<theme> - Light/Dark"), with
 *  primitives in a Tailwind collection and typography in a Typography collection.
 *  Names are emitted verbatim (via figmaNameToCssProp) — the branch's redesigned
 *  taxonomy, not the v1 shadcn-flat names. Collections are matched by keyword with
 *  a content-based fallback, since the branch renumbers them as it evolves. */
function collectV2(): ThemeOutput[] {
  const largestWith = (pred: (name: string) => boolean): LocalVariableCollection | null =>
    Object.values(collections)
      .filter((c) => c.variableIds.some((id) => pred(variables[id]?.name ?? '')))
      .sort((a, b) => b.variableIds.length - a.variableIds.length)[0] ?? null;

  const twCol = largestWith((n) => n.startsWith('border-radius/')) ?? findCollection('Tailwind');
  const typoCol = largestWith((n) => n.startsWith('heading-')) ?? findCollection('Typography');

  // Primitive families that belong to the design-system token contract. The rest
  // of the Tailwind collection (spacing, width, height, opacity, …) is skipped.
  const KEEP = new Set([
    'text',
    'font-weight',
    'border-radius',
    'blur',
    'breakpoint',
    'container',
    'shadow',
    'drop-shadow',
    'inset-shadow',
  ]);

  /** Primitive + typography tokens — theme-independent on the branch. */
  const collectNonColor = (): TokenMap => {
    const tokens: TokenMap = {};

    if (twCol) {
      const modeId = twCol.modes[0]!.modeId;
      for (const varId of twCol.variableIds) {
        const v = variables[varId];
        if (!v) continue;
        const raw = v.valuesByMode[modeId];
        if (raw === undefined) continue;
        const val = resolveAlias(raw, modeId);

        // Font stacks → --font-sans / --font-mono (match the v1 output shape).
        if (v.name === 'font/font-sans' && typeof val === 'string') {
          tokens['font-sans'] = `${val}, sans-serif`;
          continue;
        }
        if (v.name === 'font/font-mono' && typeof val === 'string') {
          tokens['font-mono'] = `${val}, monospace`;
          continue;
        }

        const top = v.name.split('/')[0] ?? '';
        if (!KEEP.has(top)) continue;

        const key = figmaNameToCssProp(v.name);
        if (isColor(val))
          tokens[key] = figmaColorToRgba(val); // shadow colour parts
        else if (typeof val === 'number') {
          if (top === 'font-weight') tokens[key] = String(val);
          else if (top === 'text' || top === 'border-radius') tokens[key] = pxToRem(val);
          else tokens[key] = `${val}px`;
        } else if (typeof val === 'string') tokens[key] = val;
      }
    }

    if (typoCol) {
      const modeId =
        typoCol.modes.find((m) => m.name === 'Desktop')?.modeId ?? typoCol.modes[0]!.modeId;
      for (const varId of typoCol.variableIds) {
        const v = variables[varId];
        if (!v) continue;
        const raw = v.valuesByMode[modeId];
        if (raw === undefined) continue;
        const val = resolveAlias(raw, modeId);

        const key = figmaNameToCssProp(v.name);
        if (typeof val === 'number') {
          if (/font-weight/.test(v.name)) tokens[key] = String(val);
          else if (/font-size|line-height/.test(v.name)) tokens[key] = pxToRem(val);
          else tokens[key] = `${val}px`;
        } else if (typeof val === 'string') tokens[key] = val;
      }
    }

    return tokens;
  };

  /** Colour vars in the themes collection for one (theme + scheme) mode. */
  const collectColors = (modeId: string): TokenMap => {
    const tokens: TokenMap = {};
    for (const varId of themesCol!.variableIds) {
      const v = variables[varId];
      if (!v || v.resolvedType !== 'COLOR') continue;
      const raw = v.valuesByMode[modeId];
      if (raw === undefined) continue;
      const val = resolveAlias(raw, modeId);
      if (isColor(val)) tokens[figmaNameToCssProp(v.name)] = figmaColorToRgba(val);
    }
    return tokens;
  };

  // Group modes by theme; mode names look like "SURF Blue - Light".
  const byTheme = new Map<string, { light?: string; dark?: string }>();
  for (const m of themesCol!.modes) {
    const match = /^(.*?)\s*[-–]\s*(light|dark)\s*$/i.exec(m.name);
    const theme = match ? match[1]!.trim() : m.name;
    const scheme = (match ? match[2]!.toLowerCase() : 'light') as 'light' | 'dark';
    const entry = byTheme.get(theme) ?? {};
    entry[scheme] = m.modeId;
    byTheme.set(theme, entry);
  }

  const shared = collectNonColor();
  console.log(
    `Themes in "${themesCol!.name}": ${[...byTheme.keys()].map((t) => `"${t}"`).join(', ')}`,
  );

  return [...byTheme].map(([name, modes]) => ({
    name,
    light: { ...collectColors(modes.light ?? modes.dark!), ...shared },
    dark: { ...collectColors(modes.dark ?? modes.light!), ...shared },
  }));
}

/** Infer a DTCG $type from a resolved CSS value string. */
function inferType(key: string, value: string): DtcgType {
  if (/^rgba?\(|^#|^oklch\(|^hsl/.test(value)) return 'color';
  if (/font-weight/.test(key)) return 'number';
  if (/font-family/.test(key) || key.startsWith('font-')) return 'fontFamily';
  if (/(rem|px|em)$/.test(value)) return 'dimension';
  if (/^-?\d+(\.\d+)?$/.test(value)) return 'number';
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

const themes = layout === 'v1' ? collectV1() : collectV2();

// Drop stale per-theme files from previous syncs (keep the default dark pair).
for (const f of readdirSync(outDir)) {
  if (/^tokens\..+\.json$/.test(f) && f !== 'tokens.dark.json') rmSync(resolve(outDir, f));
}
mkdirSync(outDir, { recursive: true });

console.log('\nWriting token files:');

for (const { name, light, dark } of themes) {
  const cls = themeNameToClass(name);
  const isDefault = name === DEFAULT_THEME;
  const lightFile = isDefault ? 'tokens.json' : `tokens.${cls}.json`;
  const darkFile = isDefault ? 'tokens.dark.json' : `tokens.${cls}.dark.json`;

  console.log(
    `  ${name.padEnd(20)} → ${lightFile} (${writeJson(lightFile, light)}), ${darkFile} (${writeJson(darkFile, dark)})`,
  );
}

console.log(`\nSynced to ${outDir}`);
console.log('Run `pnpm --filter @surfnet/tokens build` to regenerate CSS.');
