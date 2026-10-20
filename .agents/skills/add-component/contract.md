# Contract reference

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md). The generators write the
contract for you (`--description`, `--axis`); read this when you need to add or reshape an
axis by hand, or when following [`manual.md`](manual.md).

**Every vendored component gets a `<name>Contract` entry in `@surfnet/curve-contracts` — no
exceptions.** The contract is the single cross-framework source of truth for a component's
description and for the names of any **axes** it exposes (variant, size, orientation, …).
For components with an axis it also lets `pnpm lint` catch name drift between the two
frameworks. There is no "this one has no variants, skip it" judgment call: a component with
no axes still gets a description-only contract so the parity surface is explicit.

## Pick the axis shape

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

## Export and verify

Export from `packages/contracts/src/index.ts` — the contract object plus any `*Name` types
the component has (description-only contracts export just the object):

```ts
export { cardContract, type CardVariantName, type CardSizeName } from './card.js';
export { inputContract } from './input.js';
```

```bash
pnpm --filter @surfnet/curve-contracts lint
```

How each framework ties itself to the contract is in [`react.md`](react.md) and
[`angular.md`](angular.md) ("Wire the contract axes"). A description-only contract has
nothing to enforce — wiring it into the story's docs is enough.
