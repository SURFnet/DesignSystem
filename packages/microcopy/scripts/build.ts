/**
 * Turns src/microcopy.json into dist/index.ts: the default texts per language (`microcopy.en`,
 * `microcopy.nl`) plus their types. Both component packages copy that file into their own source
 * (see their `scripts/copy-microcopy.ts`), so their builds compile the texts in, the same way they
 * inline the design tokens, and this package itself never ships to npm.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOCALES = ['en', 'nl'] as const;
type Entry = { text: Record<(typeof LOCALES)[number], string>; example?: boolean };

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(resolve(root, 'src/microcopy.json'), 'utf8')) as {
  entries: Record<string, Entry>;
};
const entries = Object.entries(source.entries).filter(([, entry]) => !entry.example);

for (const [key, entry] of entries) {
  for (const locale of LOCALES) {
    if (typeof entry.text?.[locale] !== 'string') {
      throw new Error(`microcopy.json: "${key}" has no "${locale}" text.`);
    }
  }
}

const block = (locale: (typeof LOCALES)[number]) =>
  entries
    .map(([key, entry]) => `  ${JSON.stringify(key)}: ${JSON.stringify(entry.text[locale])},`)
    .join('\n');

const output = `// Generated from @surfnet/curve-microcopy (src/microcopy.json). Do not edit.

const en = {
${block('en')}
} as const;

/** A microcopy key, e.g. \`'dialog.close'\`. */
export type MicrocopyKey = keyof typeof en;

/** One text for every microcopy key. */
export type Microcopy = Record<MicrocopyKey, string>;

/** A language Curve ships texts for. */
export type MicrocopyLocale = ${LOCALES.map((locale) => `'${locale}'`).join(' | ')};

const nl: Microcopy = {
${block('nl')}
};

/** Curve's default texts per language. English is the default. */
export const microcopy: Record<MicrocopyLocale, Microcopy> = { en, nl };
`;

mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(resolve(root, 'dist/index.ts'), output);
console.log(`Wrote dist/index.ts (${entries.length} texts, ${LOCALES.join(' + ')}).`);
