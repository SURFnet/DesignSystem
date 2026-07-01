export { FRAMEWORKS, frameworkGlobalTypes, frameworkSwitcher } from './frameworks.js';
export type { Framework, FrameworkTarget } from './frameworks.js';
export { THEME_NAMES, themeGlobalTypes, themeInitialGlobals, themeSwitcher } from './themes.js';
export { TOKEN_GROUPS, getTokenGroups, getTokenValue, getTypographyScale } from './tokens.js';
export type {
  TokenEntry,
  TokenGroup,
  TokenGroupWithTokens,
  TokenKind,
  TypeScaleEntry,
} from './tokens.js';

// Shared preview parameters so every framework's Storybook renders stories the
// same way.
//
// `options.storySort` deliberately isn't included here: Storybook's story
// index generator reads it via static AST analysis of each package's own
// preview.ts (it never executes the module), so a value reached through this
// spread is invisible to it — it has to be a literal in every preview.ts.
// Keep the `storySort` literal below in sync across packages.
export const sharedParameters = {
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

// Pins "Foundations" above "Components" (alphabetical order would otherwise put
// Components first) and sorts alphabetically within each, so the sidebar reads
// identically across both frameworks' Storybooks. Copy this literal into each
// package's `.storybook/preview.ts` — see the comment on `sharedParameters`.
//
// parameters: {
//   options: {
//     storySort: {
//       method: 'alphabetical',
//       order: ['Foundations', 'Components'],
//     },
//   },
// },
