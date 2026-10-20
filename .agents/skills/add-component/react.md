# Add a React component (`@surfnet/curve-react`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md). This covers what's left
**after** `pnpm import:component` / `pnpm new:component` (or [`manual.md`](manual.md)) has
vendored the component, barrel, exports, contract and stubs.

Never hand-write a primitive or switch `components.json` `style` to a Radix value.

## 1. Move Tailwind into `<name>.module.css`

Library components use **co-located CSS Modules** and Curve tokens (`var(--primary)`,
`var(--border)`, …). The shadcn CLI emits Tailwind utility strings — migrate them to the
module stub. Pattern, migration table and gaps (e.g. overlay motion not ported):
[`packages/react/docs/css-modules-pilot.md`](../../packages/react/docs/css-modules-pilot.md).

- Prefer semantic tokens, not Tailwind utilities or `--color-*` scales.
- Put layout, states and variant rules in the module; use `data-variant`, `data-size`,
  `data-orientation`, etc. on the element when selectors need them.
- Merge with `cn(styles.root, className)` from `@/lib/utils` (consumers can still pass
  classes, including app-level Tailwind).
- With `noUncheckedIndexedAccess`, assert the import when you need dotted access:

  ```ts
  type CardModuleClasses = { root: string; variantOutline: string };
  const styles = cardStyles as CardModuleClasses;
  ```

- **Do not** add `class-variance-authority` / `cva` maps — use module classes + optional
  exported `cardVariants()` helpers (see `button.tsx`).

## 2. Wire the contract axes

For every axis in `packages/contracts/src/<name>.ts`, import its `*Name` union:

**a. Variant / size class map → `satisfies Record<…>`** (e.g. `button`, `badge`, `toggle`):

```ts
import type { CardVariantName, CardSizeName } from '@surfnet/curve-contracts';

const variantClass = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
} satisfies Record<CardVariantName, string>;

export function cardVariants({
  variant = 'default',
  size = 'default',
  className,
}: { variant?: CardVariantName; size?: CardSizeName; className?: string } = {}) {
  return cn(styles.card, variantClass[variant], sizeClass[size], className);
}
```

Export `cardVariants` when another component composes your styles (Calendar →
`buttonVariants`, Toggle group → `toggleVariants`).

**b. Inline-union prop → type the prop** (e.g. `select` trigger size):

```ts
function Avatar({ size = 'default', ...props }: AvatarPrimitive.Root.Props & {
  size?: AvatarSizeName;
}) {
  return <AvatarPrimitive.Root data-size={size} className={cn(styles.root, className)} />;
}
```

A description-only contract has nothing to wire. `pnpm lint` fails on any name mismatch.

## 3. Fill in the story

Expand the stub `<name>.stories.tsx`, mirroring
`src/components/ui/button/button.stories.tsx`: a `Playground` with `argTypes`/`args`, plus
stories for every variant/size/state. Source the description **and** axis lists from the
contract (`cardContract.description`, `.variants`, `.variantDocs`, …) instead of literals.

- Layout classes come from `story-chrome.css` (`flex gap-3`, `w-80`); add one there if
  needed. Keep component `className` overrides minimal so visuals reflect the module.
- **Every control you declare must be live**: at least one args-driven story
  (`export const Default: Story = {}` or `render: (args) => <Card {...args} />`) must consume
  it. Don't declare a control no story uses.
- Tag stories `skip-visual` if they can't be snapshotted stably.

## Verify

```bash
pnpm check:conventions
pnpm --filter @surfnet/curve-react lint     # satisfies check runs here
pnpm --filter @surfnet/curve-react build
pnpm --filter @surfnet/curve-react build-storybook
pnpm format && pnpm test:visual
```

## Updating an existing component

Do not re-run `shadcn add` (or `--overwrite`) on a vendored component. Use
`pnpm update:component` or [`update-component/react.md`](../update-component/react.md).
Restyling or merging upstream can have an effect on accessibility.

## Notes

- **Published CSS:** consumers import `@surfnet/curve-react/styles.css` for tokens, base
  styles, **semantic color utilities** (`text-*` / `bg-*` / `border-*` on theme names),
  and compiled CSS Modules. Full Tailwind (layout, spacing, opacity modifiers) is **not**
  shipped — apps add their own Tailwind or plain CSS. Storybook uses the shared
  `@surfnet/curve-storybook-config/story-chrome.css`.
- **Icons:** import from `@phosphor-icons/react` (suffix `Icon`, e.g. `PlusIcon`). Optional
  peer for consumers; devDependency for Storybook. Size/color icons in the module or via
  parent `svg` rules — see `button.stories.tsx` (`IconSizes`, `WithIcon`).
- **Native alternatives:** for simple form controls, consider a `Native*` sibling +
  description-only contract (see `css-modules-pilot.md` table). Do not replace Base UI
  overlays without an explicit product decision.
- If the component pulls in sibling shadcn components, give each the same module
  treatment.
- The `@surfnet/curve-contracts` import is a `devDependency` only — it must not appear in
  published `dist`. Types and `satisfies` erase at compile time.
- **No Tailwind in `@surfnet/curve-react`** — not in the lib build or Storybook. New story
  layout classes go in `packages/storybook-config/src/story-chrome.css` (shared with Angular) if needed. See
  [`css-modules-pilot.md`](../../packages/react/docs/css-modules-pilot.md).
