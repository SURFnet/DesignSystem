import type { StorybookConfig } from '@storybook/react-vite';
import { a11yTagConfig } from '@surfnet/curve-storybook-config';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  tags: a11yTagConfig,
};

export default config;
