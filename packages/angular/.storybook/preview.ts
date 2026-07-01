import {
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
  themeGlobalTypes,
  themeInitialGlobals,
  themeSwitcher,
} from '@surfnet/storybook-config';

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'angular', ...themeInitialGlobals },
  globalTypes: { ...frameworkGlobalTypes, ...themeGlobalTypes },
  decorators: [frameworkSwitcher('angular'), themeSwitcher()],
  parameters: {
    ...sharedParameters,
    // Must be a literal here (not spread from @surfnet/storybook-config) —
    // Storybook's index generator reads `options.storySort` via static AST
    // analysis of this file, it never executes the module. Keep in sync with
    // packages/react/.storybook/preview.ts.
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Foundations', 'Components'],
      },
    },
  },
};
