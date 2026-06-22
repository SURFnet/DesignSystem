import {
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
  themeGlobalTypes,
  themeInitialGlobals,
  themeSwitcher,
} from '@surfnet/storybook-config';

// Pull in Tailwind + the design tokens so stories render with the real styles.
import '../src/index.css';

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'react', ...themeInitialGlobals },
  globalTypes: { ...frameworkGlobalTypes, ...themeGlobalTypes },
  decorators: [frameworkSwitcher('react'), themeSwitcher()],
  parameters: sharedParameters,
};
