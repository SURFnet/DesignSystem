# surf-design-system

The SURF design system: framework-native component packages in a single
Turborepo + pnpm monorepo. Each package builds on the "you own the code" UI
library of its ecosystem.

- **`@surfnet/react`** — React components built on [shadcn/ui](https://ui.shadcn.com)
  with [Base UI](https://base-ui.com) primitives, bundled with Vite.
- **`@surfnet/angular`** — Angular components built on [Spartan](https://spartan.ng)
  (`brain` primitives + `helm` styles), built with `ng-packagr`.
- **`@surfnet/typescript-config`** — shared base TypeScript configs the packages extend.

## Repository layout

```
surf-design-system/
├── package.json            # root scripts delegate to Turborepo
├── pnpm-workspace.yaml      # workspace = packages/*
├── turbo.json              # task graph (build, dev, storybook, lint)
├── .prettierrc.json        # shared formatting
└── packages/
    ├── typescript-config/  # @surfnet/typescript-config — base.json + react-library.json
    ├── react/              # @surfnet/react — Vite library + Storybook (Vite)
    └── angular/            # @surfnet/angular — ng-packagr library + Storybook (webpack)
```

## Architecture

- **Turborepo** runs tasks across the workspace. `pnpm build` at the root builds
  every package in dependency order (`^build` first) and caches the results.
- **pnpm workspaces** link the packages locally. Both component packages depend on
  `@surfnet/typescript-config` via `workspace:*` and extend its configs.
- **Storybook builders differ by framework**, by design. React uses the stable Vite
  builder (`@storybook/react-vite`). Angular uses the stable webpack builder
  (`@storybook/angular`), because the official Angular + Vite Storybook framework is
  not yet production-ready. The Angular _library_ itself is built with `ng-packagr`.

## Prerequisites

- **Node.js 22 LTS** (pinned in [`.nvmrc`](.nvmrc) — run `nvm use` to switch). The
  `engines` field also accepts the 24 LTS line; other versions (including odd releases
  like 23/25) print a warning on `pnpm install` rather than failing.
- **pnpm 11** (`corepack enable` picks up the version pinned in `package.json`).

## Getting started

```bash
pnpm install          # install the whole workspace

pnpm build            # build both libraries (Turborepo)
pnpm lint             # type-check
pnpm format           # format everything with Prettier

# Storybook (run per package)
pnpm --filter @surfnet/react storybook     # http://localhost:6006
pnpm --filter @surfnet/angular storybook   # http://localhost:6006
```

Each component ships a Storybook story covering its full surface (variants, sizes,
states). Start there to see what's available.

## Adding a component

### React (shadcn / Base UI)

shadcn components are **vendored** — copied into the package so you own and can edit
them. The package is configured (in [`components.json`](packages/react/components.json))
for **Base UI** primitives (`"style": "base-nova"`) and **Tabler** icons
(`"iconLibrary": "tabler"` → `@tabler/icons-react`).

We keep **one directory per component** (component + stories + future tests live
together). Pass `--path` with a **trailing slash** so the CLI writes the component
straight into its own folder:

```bash
cd packages/react
# note the trailing slash — it puts card.tsx inside src/components/ui/card/
pnpm dlx shadcn@latest add card --path src/components/ui/card/
```

This creates `src/components/ui/card/card.tsx`. Then finish the wiring:

1. Add a barrel — `src/components/ui/card/index.ts` with `export * from './card';`.
   This keeps `@/components/ui/card` imports working for other shadcn components.
2. Re-export it from [`src/index.ts`](packages/react/src/index.ts).
3. Add a `card.stories.tsx` in the same folder (mirror
   [`button.stories.tsx`](packages/react/src/components/ui/button/button.stories.tsx)).

The resulting layout:

```
src/components/ui/
└── button/
    ├── button.tsx          # the component (yours to edit)
    ├── button.stories.tsx  # Storybook story
    └── index.ts            # barrel → export * from './button'
```

> shadcn pulls the Base UI variant and Tabler icon imports automatically from the
> `style` and `iconLibrary` fields in `components.json` — don't switch `style` back to
> a Radix style.

### Angular (Spartan)

Spartan splits each component into a `brain` primitive (installed from npm) and `helm`
styles (**copied into the package**). The generator is configured via
[`components.json`](packages/angular/components.json)
(`componentsPath: src/lib/ui`, `importAlias: @spartan-ng/helm`).

```bash
cd packages/angular
pnpm exec ng g @spartan-ng/cli:ui <component>   # e.g. card, dialog, input
```

This copies the helm code into `src/lib/ui/<component>/`, installs the matching
`@spartan-ng/brain` primitive, and adds a `@spartan-ng/helm/<component>` path mapping
in `tsconfig.json`. Then:

1. Re-export it from [`src/public-api.ts`](packages/angular/src/public-api.ts).
2. Add a `*.stories.ts` (mirror
   [`hlm-button.stories.ts`](packages/angular/src/lib/ui/button/src/lib/hlm-button.stories.ts)).

> The vendored helm files import each other through the `@spartan-ng/helm/*` path
> alias, which resolves to local source — `ng-packagr` inlines them into the build.

## AI assistants (MCP servers & skills)

The repo is set up so AI assistants (primarily Claude Code and GitHub Copilot) understand
the design system. Two MCP servers are configured in both [`.mcp.json`](.mcp.json)
(Claude Code, auto-detected) and [`.vscode/mcp.json`](.vscode/mcp.json) (VS Code / Copilot
— open it and click **Start**):

- **`shadcn`** — browse/search/install shadcn + Base UI components for the React package
  ([docs](https://ui.shadcn.com/docs/mcp)). Scoped via `--cwd packages/react`.
- **`spartan-ui`** — read-only Spartan docs, component APIs, and examples for the Angular
  package ([docs](https://spartan.ng/documentation/mcp)). Reference only — use the Spartan
  CLI to install code.

In Claude Code, run `/mcp` to confirm both show `Connected`. For Cursor/Codex/OpenCode, run
`npx shadcn@latest mcp init --client <name>` and add the `spartan-ui` entry from the snippet
above.

The repo also vendors the upstream **`shadcn`** and **`spartan`** agent skills (deep
component/API references) in `.agents/skills/`, alongside the repo's own `add-component`
skill. They're exposed to Claude Code through the `.claude/skills` symlink.

## Theming

Design tokens live as CSS variables in each package's stylesheet
([`react/src/index.css`](packages/react/src/index.css),
[`angular/src/styles.css`](packages/angular/src/styles.css)). They share the same
oklch palette, so keep them in sync when you adjust the theme.
