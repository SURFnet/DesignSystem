import type { StorybookConfig } from '@storybook/angular';
import { a11yTagConfig } from '@surfnet/curve-storybook-config';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/angular',
  tags: a11yTagConfig,
};

export default config;
