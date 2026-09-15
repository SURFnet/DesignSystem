# Add a React component (`@surfnet/curve-react`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md) for scope/parity.

Components are **vendored** with the shadcn CLI — copied into the package so we own and
edit them. The package is pre-configured (`packages/react/components.json`) for **Base
UI** primitives (`"style": "base-vega"`) and **Phosphor** icons (`"iconLibrary": "phosphor"`).
Never hand-write a primitive or switch `style` to a Radix value.

**Styling:** library components use **co-located CSS Modules** (`*.module.css`) and Curve
tokens (`var(--primary)`, `var(--border)`, …). The shadcn CLI may still emit Tailwind
utility strings — **migrate them to a module** before considering the component done. See
[`packages/react/docs/css-modules-pilot.md`](../../packages/react/docs/css-modules-pilot.md)
for the pattern, migration table, and gaps (e.g. overlay motion not ported).

> **Available tooling:** the **`shadcn` skill** (`.agents/skills/shadcn/`) is the deep
> reference for component APIs, registries, and presets, and the repo exposes a **shadcn
> MCP server** (`.mcp.json` / `.vscode/mcp.json`, scoped to this package) for
> browsing/searching/installing via natural language. The MCP adds files **flat**, so for
> the per-directory layout below either use the CLI `--path` flow or move the file + add a
> barrel after an MCP install.

## Steps

1. **Define the contract first.** Before vendoring, add `<name>Contract` to
   `@surfnet/curve-contracts` (see the [Contract step in SKILL.md](SKILL.md#contract-step)) — this
   is required for **every** component, including structural primitives that get a
   description-only contract. It settles the axis names before the component is written.

2. **Vendor the component into its own directory.** Pass `--path` with a trailing slash
   so the file lands inside a folder named after the component:

   ```bash
   cd packages/react
   # trailing slash → src/components/ui/card/card.tsx
   pnpm dlx shadcn@latest add card --path src/components/ui/card/
   ```

   The CLI resolves Base UI source and Phosphor icon imports automatically from
   `components.json`. (A `--dry-run` preview _displays_ a flat path — ignore that; the
   real write nests correctly.)

3. **Add `card.module.css` and wire styles.** Prefer semantic tokens, not Tailwind
   utilities or shadcn/css `--color-*` scales.

   - Put layout, states, and variant rules in the module; use `data-variant`, `data-size`,
     `data-orientation`, etc. on the element when selectors need them.
   - Import the module in `card.tsx` and merge with `cn(styles.root, className)` from
     `@/lib/utils` (lets consumers pass extra classes, including app-level Tailwind).
   - TypeScript: `packages/react/src/vite-env.d.ts` already declares `*.module.css`. With
     `noUncheckedIndexedAccess`, assert the import when you need dotted access:

     ```ts
     type CardModuleClasses = { root: string; variantOutline: string };
     const styles = cardStyles as CardModuleClasses;
     ```

   - **Do not** add new `class-variance-authority` / Tailwind `cva` maps in React — use
     module classes + optional exported `cardVariants()` helpers (see `button.tsx`).

4. **Tie the component to the contract — for every axis it has.** Import the `*Name` unions
   from `@surfnet/curve-contracts` and wire them in:

   **a. Variant / size class map → `satisfies Record<…>`** (e.g. `button`, `badge`,
   `toggle`):

   ```ts
   import type { CardVariantName, CardSizeName } from '@surfnet/curve-contracts';

   const variantClass: Record<CardVariantName, string> = {
     default: styles.variantDefault,
     outline: styles.variantOutline,
   } satisfies Record<CardVariantName, string>;

   export function cardVariants({
     variant = 'default',
     size = 'default',
     className,
   }: {
     variant?: CardVariantName;
     size?: CardSizeName;
     className?: string;
   } = {}) {
     return cn(styles.card, variantClass[variant], sizeClass[size], className);
   }
   ```

   Export `cardVariants` when another component composes your styles (Calendar →
   `buttonVariants`, Toggle group → `toggleVariants`).

   **b. Inline-union prop → type the prop** (e.g. `select` trigger size, `dropdown-menu`
   item variant):

   ```ts
   import type { AvatarSizeName } from '@surfnet/curve-contracts';

   function Avatar({ size = 'default', ...props }: AvatarPrimitive.Root.Props & {
     size?: AvatarSizeName;
   }) {
     return (
       <AvatarPrimitive.Root data-size={size} className={cn(styles.root, className)} />
     );
   }
   ```

   A **description-only** contract has no axis to enforce — skip wiring, but still add a
   module and pull `docs.description` from the contract in Storybook.

   Confirm `pnpm lint` passes — a name mismatch between the component and the contract
   type is a compile error.

5. **Add a barrel** `src/components/ui/card/index.ts`:

   ```ts
   export * from './card';
   ```

   This keeps `@/components/ui/card` imports resolving for other shadcn components.

6. **Re-export from the package entry** `src/index.ts`:

   ```ts
   export * from '@/components/ui/card';
   ```

7. **Add a story** `src/components/ui/card/card.stories.tsx`. Mirror
   `src/components/ui/button/button.stories.tsx`: a `Playground` with `argTypes`/`args`,
   plus stories covering every variant/size/state the component offers. Source the docs
   description **and** any axis lists from the contract object (`cardContract.description`,
   `cardContract.variants`, `cardContract.variantDocs`, etc.) instead of duplicating
   literals.

   **Story layout:** Tailwind utilities in `*.stories.tsx` are fine for demo chrome
   (`flex gap-3`, `w-80`) — they are not shipped as the component API. Keep component
   `className` overrides in stories minimal so visuals reflect the module.

   **Every control you declare must be live.** A control in `argTypes`/`args` only does
   something if a story actually consumes those args — an args-driven Playground (`export
   const Default: Story = {}`, or `render: (args) => <Card {...args} />`). If _every_ story
   hardcodes its props in `render`, the control is dead. See existing button stories.

## Target layout

```
src/components/ui/card/
├── card.tsx           # vendored component (Base UI + module classes)
├── card.module.css    # component styles (Curve tokens)
├── card.stories.tsx   # Storybook story
└── index.ts           # export * from './card'
```

## Verify

```bash
pnpm --filter @surfnet/curve-contracts lint       # contract types still compile
pnpm --filter @surfnet/curve-react lint           # tsc --noEmit (satisfies check runs here)
pnpm --filter @surfnet/curve-react build          # vite lib build + d.ts; CSS → dist/styles.css
pnpm --filter @surfnet/curve-react build-storybook
pnpm format
pnpm test:visual   # after both Storybooks are built
```

## Definition of done

- Component vendored via the shadcn CLI — never hand-written.
- Co-located `*.module.css`; no Tailwind utility strings left in the component `.tsx`.
- A `<name>Contract` entry exists in `@surfnet/curve-contracts` (description-only if the
  component has no axis). For every axis, the component is tied to the contract via
  `satisfies Record<...>` and/or `*Name` prop types; `pnpm lint` fails on name drift.
- Barrel `index.ts` in place; component exported from `src/index.ts`.
- Story covers full variant/size/state surface, sourcing its description and axis lists from
  the contract object.
- `pnpm build`, `pnpm lint`, `pnpm format`, and `build-storybook` all pass.
- Visual tests pass (`pnpm test:visual`). Refresh baselines with `pnpm test:visual:update`
  when appearance changed. Tag stories `skip-visual` if they cannot be snapshotted stably.

## Updating an existing component

Do not re-run `shadcn add` (or `--overwrite`) on a component that is already
vendored. Follow [`update-component/react.md`](../update-component/react.md).
Restyling or merging upstream can have an effect on accessibility.

## Notes

- **Published CSS:** consumers import `@surfnet/curve-react/styles.css` for tokens, base
  styles, **semantic color utilities** (`text-*` / `bg-*` / `border-*` on theme names),
  and compiled CSS Modules. Full Tailwind (layout, spacing, opacity modifiers) is **not**
  shipped — apps add their own Tailwind or plain CSS. Storybook uses `.storybook/story-chrome.css`.
- **Icons:** import from `@phosphor-icons/react` (suffix `Icon`, e.g. `PlusIcon`). Optional
  peer for consumers; devDependency for Storybook. Size/color icons in the module or via
  parent `svg` rules — see `button.stories.tsx` (`IconSizes`, `WithIcon`).
- **Native alternatives:** for simple form controls, consider a `Native*` sibling +
  description-only contract (see `css-modules-pilot.md` table). Do not replace Base UI
  overlays without an explicit product decision.
- If the component pulls in sibling shadcn components, apply the same per-directory +
  barrel + module treatment to each.
- The `@surfnet/curve-contracts` import is a `devDependency` only — it must not appear in
  published `dist`. Types and `satisfies` erase at compile time.
- **No Tailwind in `@surfnet/curve-react`** — not in the lib build or Storybook. New story
  layout classes go in `.storybook/story-chrome.css` if needed. See
  [`css-modules-pilot.md`](../../packages/react/docs/css-modules-pilot.md).
