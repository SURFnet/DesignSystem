# Add a React component (`@surfnet/react`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md) for scope/parity.

Components are **vendored** with the shadcn CLI — copied into the package so we own and
edit them. The package is pre-configured (`packages/react/components.json`) for **Base
UI** primitives (`"style": "base-nova"`) and **Tabler** icons (`"iconLibrary": "tabler"`).
Never hand-write a primitive or switch `style` to a Radix value.

> **Available tooling:** the **`shadcn` skill** (`.agents/skills/shadcn/`) is the deep
> reference for component APIs, registries, and presets, and the repo exposes a **shadcn
> MCP server** (`.mcp.json` / `.vscode/mcp.json`, scoped to this package) for
> browsing/searching/installing via natural language. The MCP adds files **flat**, so for
> the per-directory layout below either use the CLI `--path` flow or move the file + add a
> barrel after an MCP install.

## Steps

1. **Vendor the component into its own directory.** Pass `--path` with a trailing slash
   so the file lands inside a folder named after the component:

   ```bash
   cd packages/react
   # trailing slash → src/components/ui/card/card.tsx
   pnpm dlx shadcn@latest add card --path src/components/ui/card/
   ```

   The CLI resolves Base UI source and Tabler icon imports automatically from
   `components.json`. (A `--dry-run` preview _displays_ a flat path — ignore that; the
   real write nests correctly.)

2. **Add a barrel** `src/components/ui/card/index.ts`:

   ```ts
   export * from './card';
   ```

   This keeps `@/components/ui/card` imports resolving for other shadcn components.

3. **Re-export from the package entry** `src/index.ts`:

   ```ts
   export * from '@/components/ui/card';
   ```

4. **Add a story** `src/components/ui/card/card.stories.tsx`. Mirror
   `src/components/ui/button/button.stories.tsx`: a `Playground` with `argTypes`/`args`,
   plus stories covering every variant/size/state the component offers. Use
   `@storybook/react-vite` types (`Meta`, `StoryObj`).

## Target layout

```
src/components/ui/card/
├── card.tsx           # vendored component (yours to edit)
├── card.stories.tsx   # Storybook story
└── index.ts           # export * from './card'
```

## Verify

```bash
pnpm --filter @surfnet/react lint           # tsc --noEmit
pnpm --filter @surfnet/react build          # vite lib build + d.ts
pnpm --filter @surfnet/react build-storybook
pnpm format
```

## Notes

- Icons: import from `@tabler/icons-react` (components are prefixed `Icon`, e.g.
  `IconPlus`). Icon usage in stories is intentionally minimal right now — confirm the
  current ticket's scope before adding icons.
- If the component pulls in sibling shadcn components, they're vendored flat by default;
  apply the same per-directory + barrel treatment to each if you want them nested.
