import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// The monorepo root (apps/react-app -> ../..), where the pnpm workspace and
// lockfile live. Turbopack resolves dependencies (incl. next itself) from here.
const workspaceRoot = join(__dirname, '..', '..');

// GitHub Pages build: emit a fully static export served from a repo sub-path.
// Gated behind an env var (set by the deploy workflow / `build:pages` script) so
// `next dev` and a normal `next build` — which keep the server-rendered
// data-loading demo — are completely unaffected.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

// Public path on GitHub Pages: https://surfnet.github.io/DesignSystem/react-app/
// Must stay in sync with the folder the deploy workflow copies `out/` into
// (site/react-app) in .github/workflows/deploy-storybook.yml.
const basePath = '/DesignSystem/react-app';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next/Turbopack resolve from the monorepo root
  // and don't infer a stray parent lockfile.
  outputFileTracingRoot: workspaceRoot,
  turbopack: { root: workspaceRoot },
  ...(isStaticExport
    ? {
        output: 'export',
        basePath,
        // Static hosts serve folders as `<route>/index.html`; the trailing slash
        // keeps GitHub Pages resolving deep links reliably.
        trailingSlash: true,
        // No Next image optimizer on a static host.
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
