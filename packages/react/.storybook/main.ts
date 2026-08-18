import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  staticDirs: [{ from: '../../storybook-config/static', to: 'downloads' }],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
