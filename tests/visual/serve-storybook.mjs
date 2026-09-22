#!/usr/bin/env node
/**
 * Tiny static file server for a built Storybook.
 * Usage: node tests/visual/serve-storybook.mjs <dir> <port>
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const dir = resolve(process.argv[2] ?? '');
const port = Number(process.argv[3]);

if (!dir || !Number.isInteger(port)) {
  console.error('Usage: node tests/visual/serve-storybook.mjs <dir> <port>');
  process.exit(1);
}

if (!existsSync(join(dir, 'index.json'))) {
  console.error(
    `Storybook static build missing at ${dir} (no index.json).\nRun \`pnpm build-storybook\` first.`,
  );
  process.exit(1);
}

const root = resolve(dir) + sep;

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`);
  const relative = decodeURIComponent(url.pathname);
  const filePath = normalize(join(dir, relative === '/' ? 'index.html' : relative));

  if (!filePath.startsWith(root) && filePath !== root.slice(0, -1)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404).end('Not found');
    return;
  }

  const type = MIME[extname(filePath)] ?? 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  createReadStream(filePath).pipe(res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving ${dir} at http://127.0.0.1:${port}`);
});
