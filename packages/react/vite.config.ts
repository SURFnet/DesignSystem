import { isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
    }),
  ],
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
