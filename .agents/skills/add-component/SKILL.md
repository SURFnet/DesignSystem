---
name: add-component
description: Use when adding, scaffolding, or vendoring a component into the design system — for @surfnet/react (shadcn/ui + Base UI), @surfnet/angular (Spartan), or both packages in parity. This is the index; it routes to the per-framework playbooks in react.md and angular.md.
---

# Add a component

The design system ships components per framework. Decide the scope first, then follow the
matching playbook(s) in this skill's subfiles:

- **React only** → follow [`react.md`](react.md) (shadcn/Base UI flow for `@surfnet/react`).
- **Angular only** → follow [`angular.md`](angular.md) (Spartan flow for `@surfnet/angular`).
- **Both (keep the design system in parity)** → do **both** playbooks, then run the
  alignment + verification steps below.

## Available tooling (use it)

This repo ships deeper references and live tooling — reach for them before guessing at a
component's API or available variants:

- **Skills** (in `.agents/skills/`): the upstream **`shadcn`** skill (shadcn components,
  registries, presets, Base-vs-Radix) and **`spartan`** skill (spartan/ui, Brain/Helm
  layers, CLI, component APIs). Consult them for component-specific details.
- **MCP servers** (configured in `.mcp.json` / `.vscode/mcp.json`):
  - **`shadcn`** — browse/search/install Base UI components for `@surfnet/react`
    (scoped to `packages/react`).
  - **`spartan-ui`** — look up Spartan docs, component APIs, and examples for
    `@surfnet/angular` (read-only; install code via the Spartan CLI).

## Adding to both frameworks (parity)

The React and Angular versions of a component must stay in parity — same variants, sizes,
states, and story coverage.

1. **Confirm the component exists in both libraries.** Not every component is available in
   both shadcn (Base UI) and Spartan, and **names can differ**. Check:
   - shadcn (Base UI): https://ui.shadcn.com/docs/components
   - Spartan: https://www.spartan.ng (or `cd packages/angular && pnpm exec ng g @spartan-ng/cli:ui`
     and read the interactive list)

   Pick the matching primitive in each. If one side has no equivalent, stop and flag it
   rather than hand-rolling a divergent component.

2. **Define a contract in `@surfnet/contracts`** — see the [Contract step](#contract-step)
   below. Do this before touching either framework so both can reference it.

3. **Add the React version** — see [`react.md`](react.md).

4. **Add the Angular version** — see [`angular.md`](angular.md).

5. **Align the two versions:**
   - **Variants & sizes:** the two CLIs usually emit the same names (e.g. button:
     `default/secondary/outline/ghost/destructive/link`, sizes `xs/sm/default/lg/icon*`).
     Diff them; if they differ, keep the vendored defaults but **document the gap** rather
     than silently editing one side.
   - **Stories:** write the same set of named stories in both packages (Playground,
     Variants, Sizes, states, …) so the two Storybooks read identically. Mirror the button
     stories: `packages/react/src/components/ui/button/button.stories.tsx` and
     `packages/angular/src/lib/ui/button/src/lib/hlm-button.stories.ts`.
   - **Tokens:** both packages share the same oklch token names. If you add a new token,
     add it to **both** `react/src/index.css` and `angular/src/styles.css`.

6. **Verify both:**

   ```bash
   pnpm build && pnpm lint && pnpm format
   pnpm --filter @surfnet/react build-storybook
   pnpm --filter @surfnet/angular build-storybook
   # parity check — both should list the same story ids:
   node -e "console.log(Object.keys(require('./packages/react/storybook-static/index.json').entries))"
   node -e "console.log(Object.keys(require('./packages/angular/storybook-static/index.json').entries))"
   ```

## Contract step

**Every vendored component gets a `<name>Contract` entry in `@surfnet/contracts` — no
exceptions.** The contract is the single cross-framework source of truth for a component's
description and for the names of any **axes** it exposes (variant, size, orientation, …).
For components with an axis it also lets `pnpm lint` catch name drift between the two
frameworks. There is no "this one has no variants, skip it" judgment call: a component with
no axes still gets a description-only contract so the parity surface is explicit.

### Pick the axis shape

Capture the axes the component **actually** exposes. Use the real axis name — an
`orientation` prop is `orientations`, not `variants`. The three shapes:

1. **Variant / size axes** (e.g. `button`, `sidebar` menu button, `dropdown-menu` item,
   `select` trigger, `avatar`). Include only the axes that exist (a size-only component omits
   `variants`; a variant-only component omits `sizes`):

   ```ts
   export const cardContract = {
     variants: ['default', 'outline'],          // every allowed variant
     sizes: ['default', 'sm', 'lg'],            // every allowed size; omit if no size prop
     defaultVariant: 'default',
     defaultSize: 'default',
     description: 'One-sentence description of the component.',
     variantDocs: { default: 'For consumers.', outline: 'For consumers.' },
     sizeDocs: { default: 'Standard size.', sm: 'Compact.', lg: 'Large.' },
   } as const;

   export type CardVariantName = (typeof cardContract.variants)[number];
   export type CardSizeName = (typeof cardContract.sizes)[number];
   ```

   Model it on `packages/contracts/src/button.ts`.

2. **Orientation axis** (e.g. `field`, `separator`). Same shape, named for the axis:

   ```ts
   export const fieldContract = {
     orientations: ['vertical', 'horizontal', 'responsive'],
     defaultOrientation: 'vertical',
     description: 'A form-field wrapper that lays out a label, control, and description.',
     orientationDocs: {
       vertical: 'Label stacked above the control — the default.',
       horizontal: 'Label beside the control.',
       responsive: 'Stacks when narrow, horizontal when there is room.',
     },
   } as const;

   export type FieldOrientationName = (typeof fieldContract.orientations)[number];
   ```

3. **Description-only** (structural primitives with no axis — e.g. `input`, `label`,
   `table`, `breadcrumb`, `checkbox`). No axis arrays, no exported `*Name` types:

   ```ts
   export const inputContract = {
     description: 'A single-line text field for short free-form input.',
   } as const;
   ```

Then:

- **Export from `packages/contracts/src/index.ts`** — export the contract object plus any
  `*Name` types the component has (description-only contracts export just the object):

  ```ts
  export { cardContract, type CardVariantName, type CardSizeName } from './card.js';
  export { inputContract } from './input.js';
  ```

- **Verify the contracts package still type-checks:**

  ```bash
  pnpm --filter @surfnet/contracts lint
  ```

The per-framework playbooks (`react.md`, `angular.md`) each have a matching step that ties
the component to the contract **for every axis it has**: a `cva` map carries
`satisfies Record<CardVariantName, string>`; an inline-union prop (no `cva`) is typed as
`size?: CardSizeName`. Either way a name mismatch fails `pnpm lint` at compile time. A
description-only contract has nothing to enforce — wiring it into the story's docs is
enough.

## Definition of done

- Component vendored via the framework CLI(s) — never hand-write primitives.
- A `<name>Contract` `as const` entry exists in `@surfnet/contracts` for **every** component
  (description-only when it has no axis) and is exported from its `index.ts`.
- For each axis the component exposes, both frameworks are tied to the contract: `cva` maps
  carry `satisfies Record<...>`, inline-union props are typed as the contract's `*Name`
  (see per-framework playbooks). Description-only contracts have nothing to enforce.
- Exported from each package's entry (`src/index.ts` / `src/public-api.ts`).
- A Storybook story per package covering the component's full surface; when added to both,
  the story sets match.
- `pnpm build`, `pnpm lint`, `pnpm format`, and the relevant `build-storybook` runs pass.
- Any unavoidable React/Angular difference is documented, not hidden.
