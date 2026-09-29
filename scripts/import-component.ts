/**
 * Vendors a shadcn (React) and/or Spartan (Angular) component and wires it into
 * Curve, keeping a pristine upstream copy for `pnpm update:component`. For a
 * home-grown component, use `pnpm new:component`.
 *
 * Usage: pnpm import:component <name> [--react] [--angular] [--description "…"]
 *                                     [--axis variants=default,outline]
 *
 * See scripts/lib/scaffold.ts.
 */

import { scaffold } from './lib/scaffold';

await scaffold('import');
