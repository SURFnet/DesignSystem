import { tokenNames } from '@surfnet/tokens';

// Shared, framework-agnostic data for the "Foundations / Design Tokens" stories.
// React and Angular both render from these helpers so the two Storybooks stay in
// sync. No JSX / no framework imports here — only token bookkeeping.

// How a token should be visualised. The stories switch on this to pick a renderer.
export type TokenKind =
  | 'color' // swatch chip + value
  | 'font-size' // text sample sized by the token
  | 'radius' // rounded box sized by the token
  | 'font-family' // text sample in the token's family
  | 'font-weight' // text sample at the token's weight
  | 'raw'; // name + value row (dimensions that don't visualise cleanly)

export interface TokenGroup {
  id: string;
  title: string;
  description: string;
  kind: TokenKind;
  /** Returns true when a token name belongs to this group. First match wins. */
  match: (name: string) => boolean;
}

export interface TokenEntry {
  name: string;
  /** The `var(--name)` reference, ready to drop into a style. */
  cssVar: string;
}

export interface TokenGroupWithTokens {
  group: TokenGroup;
  tokens: TokenEntry[];
}

// Ordered groups. The first group whose `match` returns true claims the token, so
// the more specific prefixes come before the catch-all colour group at the end.
export const TOKEN_GROUPS: TokenGroup[] = [
  {
    id: 'font-family',
    title: 'Font families',
    description: 'Typeface stacks used across the system.',
    kind: 'font-family',
    match: (n) => n === 'font-sans' || n === 'font-mono',
  },
  {
    id: 'font-weight',
    title: 'Font weights',
    description: 'Numeric weight steps for the type scale.',
    kind: 'font-weight',
    match: (n) => n.startsWith('font-weight-'),
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Font-size / line-height pairs of the type scale.',
    kind: 'font-size',
    match: (n) => n.startsWith('text-'),
  },
  {
    id: 'radius',
    title: 'Radius',
    description: 'Corner radii from extra-small to fully rounded.',
    kind: 'radius',
    match: (n) => n.startsWith('radius-'),
  },
  {
    id: 'container',
    title: 'Container widths',
    description: 'Named max-width container sizes.',
    kind: 'raw',
    match: (n) => n.startsWith('container-'),
  },
  {
    id: 'breakpoint',
    title: 'Breakpoints',
    description: 'Responsive breakpoint widths.',
    kind: 'raw',
    match: (n) => n.startsWith('breakpoint-'),
  },
  {
    id: 'shadow',
    title: 'Shadows',
    description:
      'Box / inset / drop shadow primitives, broken down into their offset, blur and spread parts.',
    kind: 'raw',
    match: (n) =>
      n.startsWith('shadow-') || n.startsWith('inset-shadow-') || n.startsWith('drop-shadow-'),
  },
  {
    id: 'blur',
    title: 'Blur',
    description: 'Blur radii for backdrop / filter effects.',
    kind: 'raw',
    match: (n) => n.startsWith('blur-'),
  },
  {
    id: 'chart',
    title: 'Chart colours',
    description: 'Categorical palette for data visualisations.',
    kind: 'color',
    match: (n) => n.startsWith('chart-'),
  },
  {
    id: 'sidebar',
    title: 'Sidebar colours',
    description: 'Colours scoped to the sidebar surface.',
    kind: 'color',
    match: (n) => n.startsWith('sidebar-'),
  },
  {
    id: 'alpha',
    title: 'Alpha',
    description: 'Translucent overlay steps.',
    kind: 'color',
    match: (n) => n.startsWith('alpha-'),
  },
  {
    id: 'custom',
    title: 'Internal / custom',
    description:
      'Lower-level tokens used internally for per-component dark-mode overrides. Rarely referenced directly.',
    kind: 'color',
    match: (n) => n.startsWith('custom-'),
  },
  {
    id: 'semantic',
    title: 'Semantic colours',
    description:
      'The core role-based colours (background, foreground, primary, border, …) you reach for first.',
    kind: 'color',
    // Catch-all: any token not claimed above is a semantic colour.
    match: () => true,
  },
];

/**
 * Bucket every shipped token into its group, preserving token order within each
 * group. Empty groups are dropped.
 */
export function getTokenGroups(): TokenGroupWithTokens[] {
  const buckets = new Map<string, TokenEntry[]>(TOKEN_GROUPS.map((g) => [g.id, []]));

  for (const name of tokenNames) {
    const group = TOKEN_GROUPS.find((g) => g.match(name));
    if (group) buckets.get(group.id)!.push({ name, cssVar: `var(--${name})` });
  }

  return TOKEN_GROUPS.map((group) => ({ group, tokens: buckets.get(group.id)! })).filter(
    ({ tokens }) => tokens.length > 0,
  );
}

export interface TypeScaleEntry {
  /** e.g. `text-base` */
  id: string;
  fontSizeName: string;
  lineHeightName: string;
}

/**
 * Pair the split `text-<size>-font-size` / `text-<size>-line-height` tokens back
 * into a single scale entry per size, in shipped order.
 */
export function getTypographyScale(): TypeScaleEntry[] {
  return tokenNames
    .filter((n) => n.startsWith('text-') && n.endsWith('-font-size'))
    .map((fontSizeName) => {
      const id = fontSizeName.replace(/-font-size$/, '');
      return { id, fontSizeName, lineHeightName: `${id}-line-height` };
    });
}

/**
 * Read the resolved value of a token for the theme/mode currently applied to
 * `<html>`. Browser-only (Storybook preview). Returns the computed custom
 * property, so it always matches what is painted and honours the CSS cascade.
 */
export function readTokenValue(name: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}
