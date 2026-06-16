import { isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.json',
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
      fileName: 'index',
    },
    rollupOptions: {
      // Externalise bare imports (react, @base-ui/react, cva/clsx/...) so they
      // stay peer/runtime deps of the consumer. Relative imports, the `@/` alias
      // and absolute paths are bundled into the library.
      external: (id) => !id.startsWith('.') && !id.startsWith('@/') && !isAbsolute(id),
      output: {
        assetFileNames: 'surfnet-react.[ext]',
      },
    },
  },
});
