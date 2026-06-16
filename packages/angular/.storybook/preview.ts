import {
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
} from '@surfnet/storybook-config';

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'angular' },
  globalTypes: frameworkGlobalTypes,
  decorators: [frameworkSwitcher('angular')],
  parameters: sharedParameters,
};
