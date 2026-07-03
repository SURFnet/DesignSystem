# Add a React component (`@surfnet/curve-react`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md) for scope/parity.

Components are **vendored** with the shadcn CLI — copied into the package so we own and
edit them. The package is pre-configured (`packages/react/components.json`) for **Base
UI** primitives (`"style": "base-nova"`) and **Phosphor** icons (`"iconLibrary": "phosphor"`).
Never hand-write a primitive or switch `style` to a Radix value.

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

3. **Tie the component to the contract — for every axis it has.** Import the `*Name` unions
   from `@surfnet/curve-contracts` and wire them in. There are two wiring styles depending on how
   the vendored component models the axis:

   **a. `cva` map → `satisfies Record<…>`** (e.g. `button`, `field`):

   ```ts
   import type { CardVariantName, CardSizeName } from '@surfnet/curve-contracts';

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

   **b. inline-union prop (no `cva`) → type the prop** (e.g. `avatar` size,
   `select` trigger size, `dropdown-menu` item variant). Replace the hand-written union with
   the contract type:

   ```ts
   import type { AvatarSizeName } from '@surfnet/curve-contracts';

   function Avatar({ size = 'default', ...props }: AvatarPrimitive.Root.Props & {
     size?: AvatarSizeName;   // was: 'default' | 'sm' | 'lg'
   }) { /* … */ }
   ```

   A **description-only** contract has no axis, so there's nothing to wire here — skip to the
   barrel. Confirm `pnpm lint` passes — a name mismatch between the component and the
   contract type is a compile error.

4. **Add a barrel** `src/components/ui/card/index.ts`:

   ```ts
   export * from './card';
   ```

   This keeps `@/components/ui/card` imports resolving for other shadcn components.

5. **Re-export from the package entry** `src/index.ts`:

   ```ts
   export * from '@/components/ui/card';
   ```

6. **Add a story** `src/components/ui/card/card.stories.tsx`. Mirror
   `src/components/ui/button/button.stories.tsx`: a `Playground` with `argTypes`/`args`,
   plus stories covering every variant/size/state the component offers. Source the docs
   description **and** any axis lists from the contract object (`cardContract.description`,
   `cardContract.variants`, `cardContract.variantDocs`, etc.) instead of duplicating
   literals — a description-only component still pulls its `docs.description.component` from
   the contract. Use `@storybook/react-vite` types (`Meta`, `StoryObj`).

   **Every control you declare must be live.** A control in `argTypes`/`args` only does
   something if a story actually consumes those args — an args-driven Playground (`export
   const Default: Story = {}`, or `render: (args) => <Card {...args} />`). If _every_ story
   hardcodes its props in `render`, the control is dead: it shows in the panel but moving it
   changes nothing. So keep one args-driven Playground per declared control, reserve
   hardcoded `render` for static showcase stories (Variants, Sizes, …), and don't declare a
   control no story consumes. (Storybook here only surfaces controls you declare explicitly —
   it does not infer them from props — so an unused `argTypes` entry is always dead weight.)

## Target layout

```
src/components/ui/card/
├── card.tsx           # vendored component (yours to edit)
├── card.stories.tsx   # Storybook story
└── index.ts           # export * from './card'
```

## Verify

```bash
pnpm --filter @surfnet/curve-contracts lint       # contract types still compile
pnpm --filter @surfnet/curve-react lint           # tsc --noEmit (satisfies check runs here)
pnpm --filter @surfnet/curve-react build          # vite lib build + d.ts
pnpm --filter @surfnet/curve-react build-storybook
pnpm format
```

## Definition of done

- Component vendored via the shadcn CLI — never hand-written.
- A `<name>Contract` entry exists in `@surfnet/curve-contracts` (description-only if the component
  has no axis). For every axis, the component is tied to the contract — `cva` maps carry
  `satisfies Record<...>`, inline-union props are typed as the contract's `*Name`; `pnpm
  lint` fails if either side adds or removes a name.
- Barrel `index.ts` in place; component exported from `src/index.ts`.
- Story covers full variant/size/state surface, sourcing its description and axis lists from
  the contract object.
- `pnpm build`, `pnpm lint`, `pnpm format`, and `build-storybook` all pass.

## Notes

- Icons: import from `@phosphor-icons/react` (components are suffixed `Icon`, e.g.
  `PlusIcon`). The package is an **optional peer dependency** (kept as a devDependency so
  stories build); never move it back to `dependencies`. Render icons directly (`<PlusIcon
  className="size-5" />`) or inside a button — the button auto-sizes the SVG per size, and
  `data-icon="inline-start"` / `data-icon="inline-end"` tightens the padding next to text.
  See `button.stories.tsx` (`IconSizes`, `WithIcon`) for the established pattern.
- If the component pulls in sibling shadcn components, they're vendored flat by default;
  apply the same per-directory + barrel treatment to each if you want them nested.
- The `@surfnet/curve-contracts` import is a `devDependency` only — it must not appear in the
  published `dist`. The `satisfies` annotation is erased by TypeScript at compile time, so
  no import survives into the built output.
