/**
 * Creates a home-grown component (curve-<name>) in contracts plus React and/or
 * Angular. For shadcn / Spartan components, use `pnpm import:component`.
 *
 * Usage: pnpm new:component <name> [--react] [--angular] [--description "…"]
 *                                  [--axis variants=default,outline]
 *
 * See scripts/lib/scaffold.ts.
 */

import { scaffold } from './lib/scaffold';

await scaffold('new');
