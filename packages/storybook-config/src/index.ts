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
export const sharedParameters = {
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
