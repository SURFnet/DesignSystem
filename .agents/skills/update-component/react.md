# Update a React component (`@surfnet/curve-react`)

Part of the **update-component** skill — see [`SKILL.md`](SKILL.md) for shared
rules, `CURVE:` markers, and accessibility.

Components are vendored with the shadcn CLI into
`packages/react/src/components/ui/<name>/`. Updating means a **3-way-style
merge** of upstream registry source into that folder, not a re-install.

Use the CLI from `packages/react` so `components.json` (Base UI, Phosphor,
`--path` layout) applies. **Never fetch raw files from GitHub** — the CLI
resolves the registry and CSS.

## Steps

1. **Confirm it is already vendored.** If `src/components/ui/<name>/` does not
   exist, stop and use [`add-component/react.md`](../add-component/react.md).

2. **List what the CLI would touch** (no writes):

   ```bash
   cd packages/react
   pnpm dlx shadcn@latest add <name> --dry-run
   ```

   Note sibling files (the CLI may want to update dependencies of this
   component). Each already-vendored sibling needs the same merge treatment —
   do not overwrite them as collateral.

3. **Diff each affected file against the local copy:**

   ```bash
   pnpm dlx shadcn@latest add <name> --diff
   pnpm dlx shadcn@latest add <name> --diff <file>
   ```

   `--diff` implies `--dry-run`. Prefer `--diff` on a specific file when the
   combined output is truncated.

4. **Merge per file:**

   | Diff | Action |
   | --- | --- |
   | No local Curve edits (file matches a stock vendor copy aside from standard scaffolding) | Safe to take upstream, then **re-apply** contract `satisfies` / `*Name` typing, the barrel, and story docs sourcing. |
   | Has `CURVE:` markers or other local edits | Keep those hunks. Apply upstream hunks around them by editing the local file. |
   | User explicitly wants to discard Curve customizations | Only then `pnpm dlx shadcn@latest add <name> --overwrite`, and say so. Re-apply contract wiring, barrel, and stories afterwards. |

   **Never pass `--overwrite` without explicit approval.**

5. **Re-apply Curve scaffolding the CLI does not know about:**

   - Contract import + `satisfies Record<*Name, string>` (or typed inline-union
     props) from `@surfnet/curve-contracts`.
   - `index.ts` barrel and `src/index.ts` export (do not flatten the directory).
   - Story still sources description / axes from the contract object.
   - Phosphor icons (`*Icon` from `@phosphor-icons/react`), not whatever
     upstream defaulted to.

6. **Accessibility pass** — see [SKILL.md](SKILL.md#accessibility). Check
   `@storybook/addon-a11y` on the component stories. Update `a11y-gap` /
   `a11y-minor` tags if the merge fixed, confirmed, or reintroduced an issue.
   If upstream dropped a `CURVE: a11y` hunk, put it back.

## Verify

```bash
pnpm --filter @surfnet/curve-contracts lint
pnpm --filter @surfnet/curve-react lint
pnpm --filter @surfnet/curve-react build
pnpm format
```

Rebuild Storybook if stories changed:
`pnpm --filter @surfnet/curve-react build-storybook`.

## Notes

- The published `styles.css` is compiled Tailwind. Consumers do not need to
  re-run shadcn; only this package's source merge changes what they get after
  the next Curve release.
- CSS entry updates (`src/index.css`, `@theme`) from `--diff globals.css` /
  the dry-run CSS section: take token mappings only when they are new Curve
  needs. **Do not** paste shadcn's `:root` / `.dark` blocks — tokens come from
  `@surfnet/curve-tokens`.
