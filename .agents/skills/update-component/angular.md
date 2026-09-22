# Update an Angular component (`@surfnet/curve-angular`)

Part of the **update-component** skill — see [`SKILL.md`](SKILL.md) for shared
rules, `CURVE:` markers, and accessibility.

Spartan splits each component in two:

| Layer | Where | How it updates |
| --- | --- | --- |
| **Brain** | `@spartan-ng/brain/<name>` in `node_modules` | `pnpm update` + `ng g @spartan-ng/cli:healthcheck --autoFix` |
| **Helm** | copied into `src/lib/ui/<name>/` | You own it. Re-running the `ui` generator **overwrites** helm. There is no `--diff`. |

Do **not** edit Brain sources. Put accessibility and design fixes in helm (or a
wrapper). If the bug is in Brain itself, compensate in helm and document the
gap rather than patching `node_modules`.

## Brain (npm)

After bumping `@spartan-ng/brain` / `@spartan-ng/cli`:

```bash
cd packages/angular
pnpm exec ng g @spartan-ng/cli:healthcheck
pnpm exec ng g @spartan-ng/cli:healthcheck --autoFix
```

Healthcheck reconciles deprecated Brain APIs. It is not a helm merge. Review
the diff; keep `CURVE:` helm edits.

## Helm (copied source)

The `ui` generator copies helm into `componentsPath` and may also pull
**dependent** components. Treat every already-vendored directory it would
touch as in-scope.

### Steps

1. **Confirm it is already vendored.** If `src/lib/ui/<name>/` does not exist,
   stop and use [`add-component/angular.md`](../add-component/angular.md).

2. **See what is installed:**

   ```bash
   cd packages/angular
   pnpm exec ng g @spartan-ng/cli:info --json
   ```

3. **Working tree must be clean** for the helm dirs you are about to
   regenerate (commit or stash Curve work first). You need `HEAD` as “ours.”

4. **Regenerate, then immediately inspect — do not commit the dump:**

   ```bash
   cd packages/angular
   pnpm exec ng g @spartan-ng/cli:ui <name> --defaults
   git diff -- packages/angular/src/lib/ui/<name>/
   ```

   `git diff` is **ours (HEAD, Curve) vs theirs (new helm)**. Dependent
   components the generator also copied show up in the same diff — merge those
   too, or restore them with `git checkout -- <path>` if they were collateral.

5. **Restore ours and merge by hand** (do not leave the generator output as
   the new source):

   ```bash
   # keep a copy of theirs, then restore Curve
   cp -R src/lib/ui/<name> /tmp/curve-helm-<name>-theirs
   git checkout -- src/lib/ui/<name>
   ```

   Apply upstream hunks from `/tmp/curve-helm-<name>-theirs` onto the restored
   Curve files. Keep every `CURVE:` hunk, contract `satisfies` / typed inputs,
   story files, and Phosphor / `NgIcon` conventions.

6. **Always re-run import rewrite** after any generator write:

   ```bash
   pnpm --filter @surfnet/curve-angular fix-helm-imports
   ```

   Confirm the published bundle will not leak the alias:

   ```bash
   pnpm --filter @surfnet/curve-angular build
   grep -r "@spartan-ng/helm" packages/angular/dist
   ```

   (`grep` must print nothing.)

7. **Re-apply Curve scaffolding** the generator does not know about:

   - Contract import + `satisfies Record<*Name, string>` (or typed inputs).
   - Export from `src/public-api.ts`.
   - New runtime deps in `ng-package.json` → `allowedNonPeerDependencies`.
   - Stories still source docs from the contract. Do not let the generator
     delete `*.stories.ts`.

8. **Accessibility pass** — see [SKILL.md](SKILL.md#accessibility). Check
   `@storybook/addon-a11y`. Update `a11y-gap` / `a11y-minor` tags if the merge
   fixed, confirmed, or reintroduced an issue. Put back any dropped
   `CURVE: a11y` hunks.

There is no approved `--overwrite` equivalent. If the user wants stock Spartan
helm back, say that explicitly, take the generator output, then still run
`fix-helm-imports` and re-apply contract wiring / stories / a11y markers.

## Verify

```bash
pnpm --filter @surfnet/curve-contracts lint
pnpm --filter @surfnet/curve-angular build
pnpm format
```

Rebuild Storybook if stories changed:
`pnpm --filter @surfnet/curve-angular build-storybook`.

## Notes

- Do not re-vendor `hlm-icon`. Phosphor + `NgIcon` sizing is a Curve
  convention; see [add-component/angular.md](../add-component/angular.md).
- Theme CSS lives in `@surfnet/curve-tokens`, not in a `ui-theme` regenerate.
  Do not run `ui-theme` as part of a component update.
