# AGENTS.md

Operational guide for AI agents working in **surf-design-system**. Humans should read
[README.md](README.md) first; this file captures the conventions and gotchas that are
easy to get wrong.

## What this repo is

A Turborepo + pnpm monorepo with five packages:

| Package                      | What                                                                                            | Build                               | Storybook                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------ |
| `@surfnet/react`             | React components on shadcn/ui + **Base UI**                                                     | Vite (lib mode) + `vite-plugin-dts` | `@storybook/react-vite`        |
| `@surfnet/angular`           | Angular components on **Spartan** (`brain` + `helm`)                                            | `ng-packagr`                        | `@storybook/angular` (webpack) |
| `@surfnet/tokens`            | DTCG JSON -> Style Dictionary -> `tokens.css` + typed TS map (_published_)                      | Style Dictionary                    | —                              |
| `@surfnet/contracts`         | Per-component `as const` specs: variant/size names, defaults, docs (_private, build-time only_) | `tsc --noEmit`                      | —                              |
| `@surfnet/typescript-config` | Shared base `tsconfig`s                                                                         | —                                   | —                              |

Both component packages style with **Tailwind CSS v4** and source their design tokens from `@surfnet/tokens`.

## Environment

- **Node 22 LTS** (pinned in `.nvmrc`; `engines` also allows 24). Other versions only
  warn on install. Run `nvm use` first.
- **pnpm 11** (pinned via `packageManager`). Always use pnpm, never npm/yarn.

## Core commands

```bash
pnpm install                                   # whole workspace
pnpm build                                     # turbo: build both libraries
pnpm lint                                      # turbo: type-check
pnpm format                                    # prettier --write across the repo
pnpm --filter @surfnet/react storybook         # React Storybook (port 6006)
pnpm --filter @surfnet/angular storybook       # Angular Storybook (port 6007)
```

Always run `pnpm lint` and `pnpm format` before considering a change done, and rebuild
the package you touched.

## MCP servers

The repo ships two MCP servers, configured in both `.mcp.json` (Claude Code, auto-detected)
and `.vscode/mcp.json` (VS Code / GitHub Copilot — open it and click **Start**):

- **`shadcn`** — browse/search/install shadcn + Base UI components for `@surfnet/react`.
  Runs `npx shadcn@latest mcp --cwd packages/react`, **scoped to the React package**
  (that's where `components.json` lives). The standard shadcn/ui registry needs no setup;
  add private/third-party registries under `registries` in `packages/react/components.json`.
  Note: MCP `add` drops components **flat** — to keep the one-directory-per-component
  layout, prefer the `add-component` skill's `--path .../<name>/` flow.
- **`spartan-ui`** — read-only access to Spartan docs, component APIs, and examples for
  `@surfnet/angular` (`npx -y @spartan-ng/mcp`). It fetches live from spartan.ng and caches
  on disk; it does not install code — use the Spartan CLI for that.

In Claude Code, `/mcp` should list both as `Connected`. Other clients (Cursor, Codex,
OpenCode): `npx shadcn@latest mcp init --client <name>` for shadcn, and add the
`spartan-ui` entry manually from the snippet in their MCP config.

## Conventions & gotchas (read before editing)

### React (`@surfnet/react`)

- Components are **vendored** via the shadcn CLI. The package is configured for **Base
  UI** primitives (`components.json` → `"style": "base-nova"`) and **Tabler** icons
  (`"iconLibrary": "tabler"`). **Do not** switch `style` back to a Radix value.
- **One directory per component**: `src/components/ui/<name>/` holds `<name>.tsx`, its
  story, an `index.ts` barrel, and (later) tests. The barrel keeps `@/components/ui/<name>`
  imports resolving for other shadcn components.
- See the **add-component** skill (`react.md`) for the exact flow.
- Library build externalises bare imports; relative + `@/` aliased imports are bundled
  (`vite.config.ts`). `.d.ts` files land under `dist/src/` — that's why `package.json`
  `types` points at `dist/src/index.d.ts`.

### Angular (`@surfnet/angular`)

- Components are **vendored** via the Spartan CLI (`ng g @spartan-ng/cli:ui`): the `brain`
  primitive is installed from npm, the `helm` code is copied into `src/lib/ui/<name>/`.
- The CLI adds a `@spartan-ng/helm/<name>` path mapping in `tsconfig.json`; helm files
  import each other through it, and `ng-packagr` inlines those into the build.
- Runtime deps of the library must be listed in `ng-package.json` →
  `allowedNonPeerDependencies`, or `ng-packagr` fails the build.
- See the **add-component** skill (`angular.md`) for the exact flow.

### Storybook

- React uses the Vite builder; Angular uses the **webpack** builder (official Angular +
  Vite Storybook isn't production-ready). The Angular library itself is still `ng-packagr`.
- **Do not remove `browserTarget: "angular:build"`** from the `storybook` /
  `build-storybook` targets in `packages/angular/angular.json` — the Angular dev server
  throws `AngularLegacyBuildOptionsError` without it. Keep the explicit `tsConfig`
  (compiles stories) and `styles` (loads Tailwind) alongside it.
- Angular's webpack Storybook needs `packages/angular/.postcssrc.json`
  (`@tailwindcss/postcss`) to generate Tailwind utilities — without it stories get theme
  tokens but no utility classes. Don't delete it.
- Both Storybooks share `@storybook/addon-a11y` + `@storybook/addon-docs`, and every story
  meta sets `tags: ['autodocs']` so each gets a generated **Docs** page. Keep the two
  packages' addon sets in sync.
- Ports are pinned in the configs so both can run at once: **React → 6006** (the
  `storybook` script's `-p 6006` in `packages/react/package.json`), **Angular → 6007**
  (the `storybook` target's `"port": 6007` in `packages/angular/angular.json`).

### Shared packages (`@surfnet/tokens` + `@surfnet/contracts`)

- **Token source of truth is DTCG JSON only.** All color and other semantic token values
  live in `packages/tokens/src/tokens*.json`. Never hand-edit `:root` or `.dark` blocks in
  a framework stylesheet — change the DTCG JSON and rebuild `@surfnet/tokens` instead.
- **Figma sync:** `pnpm sync:figma` (`scripts/sync-figma.ts`, root, run via `jiti`) pulls variables from
  the Figma Variables API and (re)writes the DTCG JSON: `tokens.json` / `tokens.dark.json`
  for the default theme plus `tokens.<class>.json` / `tokens.<class>.dark.json` per extra
  theme. It writes JSON only — no CSS. Needs `FIGMA_TOKEN` + `FIGMA_FILE_ID` in `.env`
  (see `.env.example`). The JSON is committed, so syncing is optional for a normal build.
- **Token flow:** Figma -> `sync:figma` -> DTCG JSON -> Style Dictionary build ->
  `dist/tokens.css` (`:root` default light, `.dark` diff, `.theme-<class>` /
  `.dark.theme-<class>` per-theme diffs) + `dist/index.{js,d.ts}` (typed token map). Both
  component packages `@import` the CSS; Vite / PostCSS inlines it into each published
  `styles.css`. Switch themes by adding a class to `<html>` (e.g. `class="dark theme-surf-green"`).
- **Parity mechanism:** `@surfnet/contracts` exports an `as const` spec (e.g.
  `buttonContract`) that declares the canonical variant names, size names, defaults, and
  docs. Both frameworks enforce this at compile time with
  `satisfies Record<ButtonVariantName, string>` on their cva call. A mismatch (stray
  variant in one framework, missing size in another) fails `pnpm lint` immediately.
- **Contracts are build-time only.** `@surfnet/contracts` is private and must not appear
  in any published `dist` — types erase after compilation. Each framework continues to
  export its own `VariantProps<typeof buttonVariants>`.
- **Do not add runtime utils to the shared packages.** `cn` stays in React; `hlm` stays
  in Angular. The shared packages are intentionally thin.

## Definition of done for a new component

1. Component vendored via the framework's CLI (don't hand-write primitives).
2. Exported from the package entry (`src/index.ts` / `src/public-api.ts`).
3. A Storybook story covering the component's full surface (variants, sizes, states).
4. `pnpm build`, `pnpm lint`, and `pnpm format` all pass.

## Skills

Task-specific playbooks live in `.agents/skills/` (symlinked to `.claude/skills`):

- **add-component** — (repo-authored) add a component to `@surfnet/react`,
  `@surfnet/angular`, or both in parity. The `SKILL.md` index routes to the per-framework
  playbooks `react.md` and `angular.md`.
- **shadcn** — (upstream, from `shadcn/ui`) deep reference for shadcn components, registries,
  presets, and Base-vs-Radix.
- **spartan** — (upstream, from `spartan-ng/spartan`) deep reference for spartan/ui, the
  Brain/Helm layers, the CLI generators, and component APIs.

The two upstream skills are vendored as plain files in `.agents/skills/` (the same place as
our own skill); they reach Claude Code through the `.claude/skills` symlink. To refresh them,
re-fetch from their repos — do **not** use `skills add` without scoping it, as it scatters
copies into ~20 unrelated agent directories.
