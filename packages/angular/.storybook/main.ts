import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  staticDirs: [{ from: '../../storybook-config/static', to: 'downloads' }],
  framework: '@storybook/angular',
};

export default config;
