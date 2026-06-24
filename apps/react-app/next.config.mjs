import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// The monorepo root (apps/react-app -> ../..), where the pnpm workspace and
// lockfile live. Turbopack resolves dependencies (incl. next itself) from here.
const workspaceRoot = join(__dirname, '..', '..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next/Turbopack resolve from the monorepo root
  // and don't infer a stray parent lockfile.
  outputFileTracingRoot: workspaceRoot,
  turbopack: { root: workspaceRoot },
};

export default nextConfig;
