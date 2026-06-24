# Add an Angular component (`@surfnet/angular`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md) for scope/parity.

Spartan splits each component in two: the `brain` primitive (installed from npm) and the
`helm` styled directive/component (**copied into the package**). Vendor with the CLI —
don't hand-write helm code. Config lives in `packages/angular/components.json`
(`componentsPath: src/lib/ui`, `importAlias: @spartan-ng/helm`).

> **Available tooling:** the **`spartan` skill** (`.agents/skills/spartan/`) is the deep
> reference for spartan/ui, the Brain/Helm layers, and component APIs, and the repo
> exposes a **`spartan-ui` MCP server** (`.mcp.json` / `.vscode/mcp.json`) for looking up
> Spartan docs, APIs, and examples. The MCP is read-only — install code with the CLI below.

## Steps

1. **Define the contract first.** Before generating, add `<name>Contract` to
   `@surfnet/contracts` (see the [Contract step in SKILL.md](SKILL.md#contract-step)) — this
   is required for **every** component, including structural primitives that get a
   description-only contract. It settles the axis names before the helm directive is written.
   When building for parity, the React side defines the contract; reuse the same one here.

2. **Generate the component:**

   ```bash
   cd packages/angular
   pnpm exec ng g @spartan-ng/cli:ui <component>   # e.g. card, dialog, input
   ```

   This copies helm code into `src/lib/ui/<component>/`, installs the matching
   `@spartan-ng/brain` primitive, and adds a `@spartan-ng/helm/<component>` path mapping
   to `tsconfig.json`. The schematic is interactive unless `components.json` already
   exists (it does) — pass `--defaults` for non-interactive runs.

3. **Tie the component to the contract — for every axis it has.** Import the `*Name` unions
   from `@surfnet/contracts` and wire them in. Two styles, by how the helm code models the
   axis:

   **a. `cva` map → `satisfies Record<…>`** (the common case; adapted from `hlm-button.ts`):

   ```ts
   import type { CardVariantName, CardSizeName } from '@surfnet/contracts';

   const cardVariants = cva('...', {
     variants: {
       variant: {
         default: '...',
         outline: '...',
       } satisfies Record<CardVariantName, string>,
       size: {
         default: '...',
         sm: '...',
         lg: '...',
       } satisfies Record<CardSizeName, string>,
     },
   });
   ```

   **b. inline-union input (no `cva`) → type the input** as the contract's `*Name` instead
   of a hand-written union.

   A **description-only** contract has no axis, so there's nothing to wire — skip to the
   public-API export. Confirm `pnpm lint` passes — a name mismatch between the component and
   the contract type is a compile error.

4. **Export from the public API** `src/public-api.ts`:

   ```ts
   export * from './lib/ui/card/src';
   ```

5. **Declare new runtime deps as allowed.** If the component introduced a new npm runtime
   dependency (a new `@spartan-ng/brain/*` entry point is fine, but a brand-new package
   isn't), add it to `ng-package.json` → `allowedNonPeerDependencies`, or `ng-packagr`
   fails with "must be explicitly allowed".

6. **Add a story** next to the helm source, e.g.
   `src/lib/ui/card/src/lib/card.stories.ts`. Mirror
   `src/lib/ui/button/src/lib/hlm-button.stories.ts`: use `@storybook/angular`
   (`Meta`, `StoryObj`, `moduleMetadata`), import the helm directive/component, and write
   template-based `render` stories covering every variant/size/state. Source the docs
   description **and** any axis lists from the contract object (`cardContract.description`,
   `cardContract.variants`, `cardContract.variantDocs`, etc.) instead of duplicating
   literals — a description-only component still pulls its docs description from the
   contract. If an input comes from a host directive (like
   `disabled` on the button), widen the args type with an intersection so it shows as a
   control.

## Verify

```bash
pnpm --filter @surfnet/contracts lint       # contract types still compile
pnpm --filter @surfnet/angular build        # ng-packagr (FESM + d.ts); satisfies check runs here
pnpm --filter @surfnet/angular build-storybook
pnpm format
```

## Definition of done

- Component generated via the Spartan CLI — never hand-written.
- A `<name>Contract` entry exists in `@surfnet/contracts` (description-only if the component
  has no axis). For every axis, the component is tied to the contract — `cva` maps carry
  `satisfies Record<...>`, inline-union inputs are typed as the contract's `*Name`; `pnpm
  lint` (or the build) fails if either side adds or removes a name.
- Component exported from `src/public-api.ts`.
- Story covers full variant/size/state surface, sourcing its description and axis lists from
  the contract object.
- `pnpm build`, `pnpm format`, and `build-storybook` all pass.

## Notes

- Helm files import each other through the `@spartan-ng/helm/*` alias, which the tsconfig
  paths resolve to local source; `ng-packagr` inlines them. Don't rewrite these to
  relative imports — keeping the alias lets future `ng g` runs work unchanged.
- The library has no global stylesheet in its build output; the theme tokens in
  `src/styles.css` are loaded by Storybook (via the `styles` option) and are meant to be
  imported by consuming apps.
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
- The `@surfnet/contracts` import is a `devDependency` only — it must not appear in the
  published `dist`. The `satisfies` annotation is erased by TypeScript at compile time, so
  no import survives into the built output.
