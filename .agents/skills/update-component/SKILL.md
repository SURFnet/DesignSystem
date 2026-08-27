---
name: update-component
description: >-
  Merge upstream shadcn or Spartan changes into an already-vendored Curve
  component without overwriting local design or accessibility edits. Use when
  updating, upgrading, re-vendoring, re-adding, or refreshing an existing
  component; when running shadcn add or ng g on a component that is already in
  the repo; or when preserving CURVE customizations against upstream.
---

# Update a component

Use this playbook for a component that **already lives in the repo**. For a
component that is not vendored yet, use [`add-component`](../add-component/SKILL.md)
instead.

- **React only** → [`react.md`](react.md) (`@surfnet/curve-react` / shadcn).
- **Angular only** → [`angular.md`](angular.md) (`@surfnet/curve-angular` / Spartan).
- **Both** → do each playbook, then keep variants, sizes, stories, and a11y
  behaviour in parity.

**Never treat a re-vendor as an install.** The CLIs copy source into the package;
running them again on an existing component can wipe Curve edits. Git is the
source of truth. Diff, then merge.

## Accessibility

**Changes can have an effect on accessibility.** Styling, markup, ARIA, focus
order, contrast, and keyboard behaviour are coupled. A visual tweak (hiding a
label, restyling a focus ring, swapping an icon-only control, changing
hover-only state) can make the component unusable with a keyboard or screen
reader. An upstream merge can silently drop a Curve a11y fix.

Before you finish any update or local edit:

1. Re-read the component as assistive tech would: name, role, state, keyboard
   path, visible focus, contrast.
2. Check the Storybook **Accessibility** addon (`@storybook/addon-a11y`) on the
   Playground and on state stories (disabled, invalid, open, icon-only).
3. Keep or update story tags: `a11y-gap` (known WCAG gap) and `a11y-minor`
   (smaller concern). They come from the shared config in
   `@surfnet/curve-storybook-config`. If you **fix** an issue, remove or
   downgrade the tag. If you **confirm** or **introduce** one, add the matching
   tag. Do not drop these tags during a merge “to match upstream.”
4. Prefer putting durable a11y fixes in markup / ARIA / Brain-adjacent helm
   behaviour, and covering them with a story or test so a later re-vendor
   fails loudly.

## Where to put the change

| Kind of change | Put it here | Survives a re-vendor? |
| --- | --- | --- |
| Color, radius, type, spacing | Tokens (`packages/tokens`) + `@theme` mapping | Yes |
| Variant / size / axis **names** | `@surfnet/curve-contracts` + `satisfies` on both frameworks | Compile error if upstream reintroduces a stray name |
| Extra look on top of upstream | Compose via `cn()` / `hlm()`, keep the extra classes Curve-owned | Only if you re-apply them in the merge |
| Missing `aria-*`, roles, focus, names, keyboard | Vendored TS / templates (helm, not Brain) | No — mark with `CURVE:` and cover with a story/test |
| Headless behaviour (Angular) | Stay on `@spartan-ng/brain` via npm. Do **not** edit `node_modules`. Compensate in helm or wrap. | Brain updates with `pnpm update` + `healthcheck` |

Design that only exists as “we rewrote 40 Tailwind classes in the vendored
file” will fight every upstream update. Design that lives in tokens will not.

## Mark Curve deviations

Every intentional difference from upstream gets a durable marker next to the
code, so a `--diff` / `git diff` review can keep it:

```ts
// CURVE: a11y — icon-only buttons need an accessible name (do not drop on re-vendor)
// CURVE: design — focus ring uses ring-offset-background to match tokens
```

Use `a11y` or `design` (or both) and a short why. Same idea in `cva` maps and
Angular templates (`<!-- CURVE: a11y — … -->`).

Audit markers with:

```bash
rg "CURVE:" packages/react/src/components/ui packages/angular/src/lib/ui
```

Do **not** add a `CURVE:` comment for contract `satisfies` wiring, barrels,
stories, or `fix-helm-imports` rewrites — those are standard Curve scaffolding,
not deviations.

## Hard rules (agents and humans)

1. **Do not** run `shadcn add --overwrite`, `shadcn add --all`, or
   `ng g @spartan-ng/cli:ui` on an existing component as a refresh. Follow the
   per-framework playbook.
2. **Do not** use the shadcn MCP `add` tool to update an existing component — it
   writes files flat and skips the `--path` layout.
3. Preserve every `CURVE:` hunk unless the user explicitly drops that
   customization. Preserve contract `satisfies` / `*Name` typing.
4. After Angular helm is regenerated, run
   `pnpm --filter @surfnet/curve-angular fix-helm-imports` and confirm `dist`
   has no `@spartan-ng/helm` imports.
5. Stop and ask if the upstream diff is large, renames the public API, or
   disagrees with the contract.

## After both frameworks (parity)

If the component exists in both packages, confirm after the merge:

- Variant / size / axis **names** still match the contract (`pnpm lint`).
- Story names still match across Storybooks.
- A11y behaviour matches: the same issue is not fixed on one side and left
  tagged `a11y-gap` on the other without a documented reason.

## Definition of done

- Upstream hunks merged; Curve `CURVE:` edits and contract wiring kept.
- Story `a11y-gap` / `a11y-minor` tags match the current state.
- Storybook a11y addon checked for the stories you touched.
- `pnpm build`, `pnpm lint`, and `pnpm format` pass for the packages you
  touched; rebuild Storybook if stories changed.
- A changeset added (`pnpm changeset`) if a publishable package changed.
- Any React/Angular gap left after the update is documented, not hidden.
