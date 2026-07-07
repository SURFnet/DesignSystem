import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import StyleDictionary from 'style-dictionary';
import type { Dictionary } from 'style-dictionary/types';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = resolve(root, 'src');
const dist = resolve(root, 'dist');

type TokenMap = Record<string, string>;
type Theme = { cls: string; light: TokenMap; dark: TokenMap };

// Reads the DTCG sources from `pnpm sync:figma` (tokens.json → :root,
// tokens.dark.json → .dark, tokens.<class>[.dark].json → .theme-<class>) and
// emits tokens.css with per-theme/per-mode diffs against the default theme.

/** Read a DTCG file into a flat { '--prop': value } map (or null if absent). */
function readTokens(filename: string): TokenMap | null {
  let raw: string;
  try {
    raw = readFileSync(resolve(srcDir, filename), 'utf8');
  } catch {
    return null;
  }
  const out: TokenMap = {};
  for (const [key, token] of Object.entries(JSON.parse(raw))) {
    if (key.startsWith('$')) continue;
    if (token && typeof token === 'object' && '$value' in token) {
      out[`--${key}`] = String((token as { $value: unknown }).$value);
    }
  }
  return out;
}

const defaultLight = readTokens('tokens.json');
if (!defaultLight) {
  console.error('No src/tokens.json found. Run `pnpm sync:figma` first.');
  process.exit(1);
}
const defaultDark = readTokens('tokens.dark.json') ?? {};

// Per-theme override files: tokens.<class>.json (+ optional dark).
const themes: Theme[] = [];
for (const file of readdirSync(srcDir).sort()) {
  const cls = /^tokens\.(.+)\.json$/.exec(file)?.[1];
  if (!cls || cls === 'dark' || cls.endsWith('.dark')) continue;
  themes.push({
    cls,
    light: readTokens(`tokens.${cls}.json`) ?? {},
    dark: readTokens(`tokens.${cls}.dark.json`) ?? {},
  });
}

/** Keys in `next` differing from `base` (base order first, then next-only keys). */
function diff(base: TokenMap, next: TokenMap): TokenMap {
  const out: TokenMap = {};
  for (const key of Object.keys(base)) {
    const v = next[key];
    if (v !== undefined && v !== base[key]) out[key] = v;
  }
  for (const key of Object.keys(next)) {
    const v = next[key];
    if (v !== undefined && !(key in base)) out[key] = v;
  }
  return out;
}

const darkDiff = diff(defaultLight, defaultDark);
const fullDark = { ...defaultLight, ...defaultDark };

const themeBlocks = themes.map(({ cls, light, dark }) => {
  const lightDiff = diff(defaultLight, light);
  // `.theme-<cls>` is emitted after `.dark` and has equal specificity, so by the
  // time `.dark.theme-<cls>` applies, the cascade already resolved to `:root` +
  // `.dark` + `.theme-<cls>` (i.e. defaultLight, overridden by darkDiff, then by
  // lightDiff). Diff the fully-resolved dark theme against *that*, not against
  // defaultDark, or any token whose theme-dark value matches the default-dark
  // value gets omitted here and the theme's light override leaks into dark mode.
  const cascadeBeforeThemeDark = { ...defaultLight, ...darkDiff, ...lightDiff };
  const fullResolvedDark = { ...fullDark, ...light, ...dark };
  return { cls, lightDiff, darkDiff: diff(cascadeBeforeThemeDark, fullResolvedDark) };
});

// Full resolved value sets per theme/mode, mirroring how the CSS cascade resolves
// (theme + mode layered over the default :root). Keyed by theme class; the default
// theme is keyed `default`. Keys drop the leading `--`.
const themeModes = ['light', 'dark'] as const;
const themeValues: Record<string, { light: TokenMap; dark: TokenMap }> = {
  default: { light: defaultLight, dark: fullDark },
};
for (const { cls, light, dark } of themes) {
  themeValues[cls] = {
    light: { ...defaultLight, ...light },
    dark: { ...fullDark, ...light, ...dark },
  };
}

// Emit dist/tokens.css
const block = (selector: string, map: TokenMap): string =>
  `${selector} {\n${Object.entries(map)
    .map(([p, v]) => `  ${p}: ${v};`)
    .join('\n')}\n}`;

const cssBlocks = [block(':root', defaultLight)];
if (Object.keys(darkDiff).length) cssBlocks.push(block('.dark', darkDiff));
for (const { cls, lightDiff, darkDiff: tDark } of themeBlocks) {
  if (Object.keys(lightDiff).length)
    cssBlocks.push(`/* theme-${cls} */`, block(`.theme-${cls}`, lightDiff));
  if (Object.keys(tDark).length) cssBlocks.push(block(`.dark.theme-${cls}`, tDark));
}
mkdirSync(dist, { recursive: true });
writeFileSync(resolve(dist, 'tokens.css'), cssBlocks.join('\n\n') + '\n', 'utf8');

// Emit the typed token map (index.js + index.d.ts). Token names are mode- and
// theme-independent, so the default :root set drives them; `themes` carries the
// full resolved values per theme/mode.
const valueObject = (map: TokenMap, indent: number): string => {
  const pad = ' '.repeat(indent);
  const lines = Object.entries(map).map(
    ([k, v]) => `${pad}"${k.replace(/^--/, '')}": ${JSON.stringify(v)}`,
  );
  return `{\n${lines.join(',\n')}\n${' '.repeat(indent - 2)}}`;
};

const themesJs = `export const themes = {\n${Object.entries(themeValues)
  .map(
    ([cls, { light, dark }]) =>
      `  "${cls}": {\n    light: ${valueObject(light, 6)},\n    dark: ${valueObject(dark, 6)},\n  }`,
  )
  .join(',\n')}\n};`;

const HEADER = '// Auto-generated by style-dictionary.config.ts — do not edit manually.';

StyleDictionary.registerFormat({
  name: 'surf/tokens-js',
  format: ({ dictionary }: { dictionary: Dictionary }) => {
    const entries = dictionary.allTokens.map((t) => `  "${t.name}": "var(--${t.name})"`);
    const names = dictionary.allTokens.map((t) => `"${t.name}"`);
    return [
      HEADER,
      `export const tokens = {\n${entries.join(',\n')}\n};`,
      '',
      `export const tokenNames = /** @type {const} */ ([${names.join(', ')}]);`,
      '',
      themesJs,
      '',
    ].join('\n');
  },
});

StyleDictionary.registerFormat({
  name: 'surf/tokens-dts',
  format: ({ dictionary }: { dictionary: Dictionary }) => {
    const union = dictionary.allTokens.map((t) => `  | '${t.name}'`).join('\n');
    const themeNames = Object.keys(themeValues)
      .map((c) => `'${c}'`)
      .join(' | ');
    return [
      HEADER,
      `export type TokenName =\n${union};`,
      '',
      'export declare const tokens: Record<TokenName, string>;',
      'export declare const tokenNames: readonly TokenName[];',
      '',
      `export type ThemeName = ${themeNames};`,
      `export type ThemeMode = ${themeModes.map((m) => `'${m}'`).join(' | ')};`,
      'export declare const themes: Record<ThemeName, Record<ThemeMode, Record<TokenName, string>>>;',
      '',
    ].join('\n');
  },
});

const sd = new StyleDictionary({
  source: [resolve(srcDir, 'tokens.json')],
  platforms: {
    surf: {
      transforms: ['name/kebab'],
      buildPath: 'dist/',
      files: [
        { destination: 'index.js', format: 'surf/tokens-js' },
        { destination: 'index.d.ts', format: 'surf/tokens-dts' },
      ],
    },
  },
  log: { verbosity: 'silent' },
});
await sd.buildAllPlatforms();

const themeNote = themeBlocks.length ? ` + ${themeBlocks.length} theme override(s)` : '';
console.log(`Built dist/tokens.css${themeNote}, dist/index.js, dist/index.d.ts`);
