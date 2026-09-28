import { isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import { defineConfig } from 'vite';
import type { Plugin as PostcssPlugin } from 'postcss';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// Wraps every component CSS Module in `@layer components`, so consumers'
// Tailwind utilities and plain CSS can override component styles without
// specificity fights. Done here rather than in each file so module authors
// write plain, unwrapped CSS.
//
// Each module also restates the full layer order: Vite emits module CSS
// *before* src/index.css in the bundle, and the first mention of a layer fixes
// its priority, so without this `components` would rank below `base` (the
// reset). Keep this list in sync with the one at the top of src/index.css.
const LAYER_ORDER = 'theme, base, components, utilities';

const layerCssModules: PostcssPlugin = {
  postcssPlugin: 'curve-layer-modules',
  Once(root, { AtRule }) {
    if (!root.source?.input.file?.endsWith('.module.css')) return;
    const layer = new AtRule({ name: 'layer', params: 'components' });
    layer.append(root.nodes);
    root.removeAll();
    root.append(new AtRule({ name: 'layer', params: LAYER_ORDER }), layer);
  },
};

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
    }),
  ],
  css: {
    postcss: { plugins: [layerCssModules] },
  },
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(rootDir, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // Externalise bare imports (react, @base-ui/react, cva/clsx/...) so they
      // stay peer/runtime deps of the consumer. Relative imports, the `@/` alias
      // and absolute paths are bundled into the library.
      external: (id) => !id.startsWith('.') && !id.startsWith('@/') && !isAbsolute(id),
      plugins: [preserveDirectives()],
      output: {
        // The built stylesheet is always `styles.css` (referenced by the
        // `./styles.css` export), but other assets (e.g. the Geist font files
        // pulled in via @import) must each keep a distinct name or they
        // overwrite one another.
        assetFileNames: (asset) =>
          (asset.names ?? [asset.name]).some((name) => name?.endsWith('.css'))
            ? 'styles.[ext]'
            : '[name]-[hash][extname]',
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
