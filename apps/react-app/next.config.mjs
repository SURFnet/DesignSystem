import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@surfnet/react'],
  // Pin the workspace root so Next doesn't pick up a stray parent lockfile.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
