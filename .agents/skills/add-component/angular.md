# Add an Angular component (`@surfnet/curve-angular`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md). This covers what's left
**after** `pnpm import:component` / `pnpm new:component` (or [`manual.md`](manual.md)) has
generated the helm code, run `fix-helm-imports`, and added the contract, CSS stub (imported
in `src/styles.css`), public-API export and story stub. Don't hand-write helm code.

## 1. Move Tailwind into `hlm-<name>.css`

Spartan emits Tailwind; Curve ships none, so a leftover class simply has no effect (and
shows up as a visual difference). Replace the class strings in the helm directives:

- Name classes `curve-<component>[-part]` with BEM modifiers (`curve-card--size-sm`), set
  via `classes(() => 'curve-card')`. Keep Tailwind `group/*` / `peer/*` marker classes the
  helm code had — consumers' Tailwind may use them.
- Use Curve tokens (`var(--primary)`, `calc(var(--spacing, 0.25rem) * 4)`,
  `var(--radius-md, …)`) and Spartan's state attributes (`[data-state='open']`,
  `[data-disabled]`, `[data-matches-spartan-invalid='true']`).
- Translate faithfully — pitfalls (`ng-icon` host styles, runtime CSS layers, class strings
  passed into other components) are in the Angular section of
  `packages/react/docs/css-modules-pilot.md`.
- Enter/exit animations go inside `@media (prefers-reduced-motion: no-preference)` and use
  the shared `curve-enter` / `curve-exit` keyframes (`src/styles/motion.css`).

## 2. Wire the contract axes

For every axis in `packages/contracts/src/<name>.ts`, import its `*Name` union:

**a. Variant → class map with `satisfies Record<…>`** (adapted from `hlm-button.ts`, no
`cva`):

```ts
import type { CardVariantName, CardSizeName } from '@surfnet/curve-contracts';

const cardVariantClasses = {
  default: 'curve-card--variant-default',
  outline: 'curve-card--variant-outline',
} satisfies Record<CardVariantName, string>;
```

**b. Inline-union input → type the input** as the contract's `*Name`.

A description-only contract has nothing to wire. `pnpm lint` fails on any name mismatch.

## 3. New runtime dependencies

If the component introduced a brand-new npm runtime package (a new `@spartan-ng/brain/*`
entry point is fine), add it to `ng-package.json` → `allowedNonPeerDependencies`, or
`ng-packagr` fails with "must be explicitly allowed".

## 4. Fill in the story

Expand the stub next to the helm source, mirroring
`src/lib/ui/button/src/lib/hlm-button.stories.ts` (`Meta`, `StoryObj`, `moduleMetadata`,
template-based `render`), covering every variant/size/state with **the same story names as
React**. Source the description and axis lists from the contract object instead of
literals. If an input comes from a host directive (like `disabled` on the button), widen the
args type with an intersection so it shows as a control.

**Every control you declare must be live**: bind args into at least one template
(`props: args` with `[orientation]="orientation"`). Keep one args-driven Playground per
control and don't declare a control no story consumes. Tag stories `skip-visual` if they
can't be snapshotted stably.

## Verify

```bash
pnpm check:conventions
pnpm --filter @surfnet/curve-angular build     # satisfies check runs here
pnpm --filter @surfnet/curve-angular build-storybook
grep -r "@spartan-ng/helm" packages/angular/dist   # must find nothing
pnpm format && pnpm test:visual
```

## Updating an existing component

Do not re-run `ng g @spartan-ng/cli:ui` on a vendored component — the generator
overwrites helm. Use `pnpm update:component` or
[`update-component/angular.md`](../update-component/angular.md). Restyling or merging
upstream can have an effect on accessibility.

## Notes

- Cross-component helm imports must be relative, never `@spartan-ng/helm/*` (the alias
  isn't a real package and `ng-packagr` ignores tsconfig `paths`). Rerun
  `pnpm --filter @surfnet/curve-angular fix-helm-imports` if you add one; background in
  [`manual.md`](manual.md).
- `src/styles.css` is bundled into the published `dist/styles.css` by
  `scripts/build-css.ts` (Lightning CSS, no Tailwind): tokens, reset, base styles and every
  component stylesheet. Storybook loads the same file via the `styles` option, plus the
  shared `packages/storybook-config/src/story-chrome.css` for story layout classes (plain
  CSS, Tailwind-named; add a class there when a story needs one — there's no Tailwind).
- Icons: use [ng-icons](https://ng-icons.github.io/ng-icons/)'s `NgIcon` directly; there is
  no vendored icon component. `@ng-icons/core` is an **optional peer dependency**; a glyph
  set (we use `@ng-icons/phosphor-icons`) is a `devDependency` for stories and an install the
  consumer adds. Phosphor exports are split by weight — import `phosphor*` glyphs from a weight
  subpath such as `@ng-icons/phosphor-icons/regular`. Register glyphs with `provideIcons` and
  render a bare `<ng-icon name="…" />`; inside a `<button hlmBtn>` omit `size` so the button auto-sizes it, with
  `data-icon="inline-start"`/`-end` tightening the padding next to text. For standalone
  icons use `NgIcon`'s own `size`/`color` inputs. See `hlm-button.stories.ts` (`IconSizes`,
  `WithIcon`). Don't re-vendor the Spartan `hlm-icon` directive — it pins `--ng-icon__size`
  and breaks the button's per-size auto-sizing (only re-add it if a future Spartan
  generator requires `@spartan-ng/helm/icon`).
- The `@surfnet/curve-contracts` import is a `devDependency` only — it must not appear in the
  published `dist`. The `satisfies` annotation is erased by TypeScript at compile time, so
  no import survives into the built output.
