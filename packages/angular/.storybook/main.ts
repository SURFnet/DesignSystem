import type { StorybookConfig } from '@storybook/angular';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|mdx)',
    '../src/**/*.mdx',
    // Framework-agnostic Foundations prose, shared with the React Storybook so
    // both stay in sync and story ids match for the framework switcher.
    '../../storybook-config/docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        // MDX 3 has no GitHub-flavoured markdown, so pipe tables in .mdx render
        // as literal text without this. Keep in sync with the React config.
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  staticDirs: [
    { from: '../../storybook-config/static', to: 'downloads' },
    // Persona-based accessibility skill — canonical source in .agents/skills/accessibility
    { from: '../../../.agents/skills/accessibility', to: 'downloads/accessibility' },
  ],
  framework: '@storybook/angular',
};

export default config;
