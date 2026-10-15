import type { StorybookConfig } from '@storybook/angular';
import remarkGfm from 'remark-gfm';
import { a11yTagConfig } from '@surfnet/curve-storybook-config';

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
    '@storybook/addon-designs',
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
  // `import source from './file.ts?raw'` gives a file's text, to show example code in Docs (Vite
  // does this out of the box in the React Storybook). Keep the other rules — the TypeScript
  // loader above all — away from `?raw` imports so they aren't compiled as well.
  webpackFinal: async (config) => {
    const rules = config.module?.rules ?? [];
    for (const rule of rules) {
      if (rule && typeof rule === 'object' && !rule.resourceQuery) {
        rule.resourceQuery = { not: [/raw/] };
      }
    }
    config.module = {
      ...config.module,
      rules: [{ resourceQuery: /raw/, type: 'asset/source' }, ...rules],
    };
    return config;
  },
  tags: a11yTagConfig,
};

export default config;
