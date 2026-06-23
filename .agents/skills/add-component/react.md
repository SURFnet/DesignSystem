# Add a React component (`@surfnet/react`)

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
   `@surfnet/contracts` (see the [Contract step in SKILL.md](SKILL.md#contract-step)).
   This ensures the variant/size names are settled before the cva is written.

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

3. **Apply `satisfies` to the cva variant/size maps.** In the vendored component file,
   import the name unions from `@surfnet/contracts` and annotate the variant and size
   objects. The pattern (adapted from `button.tsx`):

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

   If the component has no size prop, omit the size annotation. Confirm `pnpm lint`
   passes — a name mismatch between the cva object and the contract type is a compile
   error.

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
   plus stories covering every variant/size/state the component offers. Source variant/size
   lists and docs from the contract object (`cardContract.variants`, `cardContract.variantDocs`,
   etc.) instead of duplicating literals. Use `@storybook/react-vite` types (`Meta`, `StoryObj`).

## Target layout

```
src/components/ui/card/
├── card.tsx           # vendored component (yours to edit)
├── card.stories.tsx   # Storybook story
└── index.ts           # export * from './card'
```

## Verify

```bash
pnpm --filter @surfnet/contracts lint       # contract types still compile
pnpm --filter @surfnet/react lint           # tsc --noEmit (satisfies check runs here)
pnpm --filter @surfnet/react build          # vite lib build + d.ts
pnpm --filter @surfnet/react build-storybook
pnpm format
```

## Definition of done

- Component vendored via the shadcn CLI — never hand-written.
- A `<name>Contract` entry exists in `@surfnet/contracts` and the cva variant/size maps
  carry `satisfies Record<...>` against the contract types; `pnpm lint` fails if either
  side adds or removes a name.
- Barrel `index.ts` in place; component exported from `src/index.ts`.
- Story covers full variant/size/state surface, sourcing lists from the contract object.
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
- The `@surfnet/contracts` import is a `devDependency` only — it must not appear in the
  published `dist`. The `satisfies` annotation is erased by TypeScript at compile time, so
  no import survives into the built output.
