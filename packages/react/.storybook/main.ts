import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.mdx',
    // Framework-agnostic Foundations prose, shared with the Angular Storybook so
    // both stay in sync and story ids match for the framework switcher.
    '../../storybook-config/docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        // MDX 3 has no GitHub-flavoured markdown, so pipe tables in .mdx render
        // as literal text without this. Keep in sync with the Angular config.
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  staticDirs: [{ from: '../../storybook-config/static', to: 'downloads' }],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
