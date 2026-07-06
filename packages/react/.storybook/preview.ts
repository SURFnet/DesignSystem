import {
  a11yParameters,
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
  themeGlobalTypes,
  themeInitialGlobals,
  themeSwitcher,
} from '@surfnet/curve-storybook-config';

// Pull in Tailwind + the design tokens so stories render with the real styles.
import '../src/index.css';

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'react', ...themeInitialGlobals },
  globalTypes: { ...frameworkGlobalTypes, ...themeGlobalTypes },
  decorators: [frameworkSwitcher('react'), themeSwitcher()],
  parameters: {
    ...sharedParameters,
    ...a11yParameters,
    // Force the React jsxDecorator to always serialize the rendered JSX for the
    // "Show code" panel. Without this, a story with `render: () => (...)` (no
    // `args` param) is treated as a non-args story, so Storybook prints the whole
    // story object instead of the JSX. See @storybook/react's `skipJsxRender`.
    docs: { source: { type: 'dynamic' } },
    // Must be a literal (Storybook reads it via static analysis, not
    // execution). Keep in sync with packages/angular/.storybook/preview.ts.
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Foundations', 'Components'],
      },
    },
  },
};
