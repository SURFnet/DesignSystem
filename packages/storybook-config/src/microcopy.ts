import data from '@surfnet/curve-microcopy/microcopy.json';

// Shared, framework-agnostic data for the "Foundations / Microcopy" stories, read straight from
// `@surfnet/curve-microcopy`'s JSON (the same source the components get their texts from).
// React and Angular both render from these helpers so the two Storybooks stay in sync.

export type MicrocopyKind = 'zichtbaar' | 'screenreader' | 'foutmelding';

export const MICROCOPY_KINDS: Record<MicrocopyKind, string> = {
  zichtbaar: 'Visible',
  screenreader: 'Screen reader only',
  foutmelding: 'Error message',
};

export interface MicrocopyUsage {
  /** The component or selector that shows the text. */
  where: string;
  /** How an app replaces this one text, or `null` when only the language changes it. */
  change: string | null;
}

export interface MicrocopyRow {
  key: string;
  kind: MicrocopyKind;
  description: string;
  en: string;
  nl: string;
  /** A sample of what a format function makes, not a fixed text. */
  example: boolean;
  angular: MicrocopyUsage | null;
  react: MicrocopyUsage | null;
}

export interface MicrocopyGroup {
  component: string;
  rows: MicrocopyRow[];
}

interface RawEntry {
  component: string;
  kind: MicrocopyKind;
  description: string;
  text: { en: string; nl: string };
  example?: boolean;
  angular: MicrocopyUsage | null;
  react: MicrocopyUsage | null;
}

/** Every microcopy entry, grouped by component in the order of the JSON. */
export function getMicrocopyGroups(): MicrocopyGroup[] {
  const groups = new Map<string, MicrocopyRow[]>();
  for (const [key, entry] of Object.entries(data.entries as Record<string, RawEntry>)) {
    const rows = groups.get(entry.component) ?? [];
    rows.push({
      key,
      kind: entry.kind,
      description: entry.description,
      en: entry.text.en,
      nl: entry.text.nl,
      example: Boolean(entry.example),
      angular: entry.angular,
      react: entry.react,
    });
    groups.set(entry.component, rows);
  }
  return [...groups].map(([component, rows]) => ({ component, rows }));
}

/** Splits text on backticks, so `code` parts can be shown in a code font. */
export function splitInlineCode(text: string): { text: string; code: boolean }[] {
  return text.split('`').map((part, index) => ({ text: part, code: index % 2 === 1 }));
}
