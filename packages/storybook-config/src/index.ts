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
// Browser-safe a11y config; the audit lives behind the `./test-runner` subpath.
export { WCAG_21_AA_TAGS, a11yParameters } from './a11y.js';

// Shared preview parameters so every framework's Storybook renders stories the
// same way.
//
// `options.storySort` isn't here: Storybook reads it via static analysis of
// each preview.ts, not by executing this module, so it must be a literal in
// every preview.ts instead (see those files for the actual value).
export const sharedParameters = {
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
