# Curve

Curve is SURF's design system: framework-native component packages in a single
Turborepo + pnpm monorepo. Each package builds on the "you own the code" UI
library of its ecosystem.

- **`@surfnet/curve-react`** — React components built on [shadcn/ui](https://ui.shadcn.com)
  with [Base UI](https://base-ui.com) primitives, bundled with Vite. Published.
- **`@surfnet/curve-angular`** — Angular components built on [Spartan](https://spartan.ng)
  (`brain` primitives + `helm` styles), built with `ng-packagr`. Published.
- **`@surfnet/curve-tokens`** — design tokens: DTCG JSON source built with Style Dictionary
  into `tokens.css` (`:root`/`.dark` custom properties) and a typed TS map. Private;
  both component packages import this CSS at build time.
- **`@surfnet/curve-contracts`** — per-component `as const` specs (variant names, size names,
  defaults, docs) used at build time to enforce cross-framework parity via `satisfies`.
  Private; leaves no trace in published `dist`.
- **`@surfnet/curve-typescript-config`** — shared base TypeScript configs the packages extend.

## Repository layout

```
curve-design-system/
├── package.json            # root scripts delegate to Turborepo
├── pnpm-workspace.yaml      # workspace = packages/* + apps/*
├── turbo.json              # task graph (build, dev, storybook, lint)
├── .prettierrc.json        # shared formatting
├── packages/
│   ├── typescript-config/  # @surfnet/curve-typescript-config — base.json + react-library.json
│   ├── tokens/             # @surfnet/curve-tokens — DTCG JSON -> Style Dictionary -> tokens.css (private)
│   ├── contracts/          # @surfnet/curve-contracts — component API specs, build-time only (private)
│   ├── storybook-config/   # @surfnet/curve-storybook-config — shared Storybook config + Curve docs (private)
│   ├── react/              # @surfnet/curve-react — Vite library + Storybook (Vite) (published)
│   └── angular/            # @surfnet/curve-angular — ng-packagr library + Storybook (webpack) (published)
└── apps/
    └── react-app/          # @surfnet/curve-react-app — demo Next.js app for testing @surfnet/curve-react
    └── angular-app/        # @surfnet/curve-angular-app — demo Angular app for testing @surfnet/curve-angular
```

## Architecture

- **Turborepo** runs tasks across the workspace. `pnpm build` at the root builds
  every package in dependency order (`^build` first) and caches the results.
- **pnpm workspaces** link the packages locally. Both component packages depend on
  `@surfnet/curve-typescript-config` via `workspace:*` and extend its configs.
- **Storybook builders differ by framework**, by design. React uses the stable Vite
  builder (`@storybook/react-vite`). Angular uses the stable webpack builder
  (`@storybook/angular`), because the official Angular + Vite Storybook framework is
  not yet production-ready. The Angular _library_ itself is built with `ng-packagr`.

## Prerequisites

- **Node.js 24 LTS** (pinned in [`.nvmrc`](.nvmrc) — run `nvm use` to switch). The
  `engines` field also accepts the 24 LTS line; other versions (including odd releases
  like 23/25) print a warning on `pnpm install` rather than failing.
- **pnpm 11** (`corepack enable` picks up the version pinned in `package.json`).

## Getting started

```bash
pnpm install          # install the whole workspace

pnpm build            # build both libraries (Turborepo)
pnpm lint             # type-check
pnpm format           # format everything with Prettier

# Storybook
pnpm storybook              # both (React :6006, Angular :6007)
pnpm storybook:react        # http://localhost:6006
pnpm storybook:angular      # http://localhost:6007

# Visual regression (Playwright screenshots of the built Storybooks)
pnpm build-storybook
pnpm test:visual
```

Each component ships a Storybook story covering its full surface (variants, sizes,
states). Start there to see what's available. Both Storybooks are also deployed
to GitHub Pages on every push to `main`:

- **React** — https://surfnet.github.io/DesignSystem/react/
- **Angular** — https://surfnet.github.io/DesignSystem/angular/

## Visual regression

Playwright screenshots each **Components** and **Foundations** story in the built
Storybooks (React and Angular separately). CI compares those PNGs to baselines in
`tests/visual/__screenshots__/react/` and `tests/visual/__screenshots__/angular/`.

```bash
pnpm test:visual:install      # once per machine / after @playwright/test upgrades
pnpm build-storybook
pnpm test:visual              # compare snapshots to committed baselines
pnpm test:visual:parity       # optional: React vs Angular pixel diff (run when you want)
pnpm test:visual:ui           # Playwright UI mode
```

Baselines live in `tests/visual/__screenshots__/` and are committed. Refresh after
`pnpm build-storybook`:

```bash
pnpm test:visual:update
```

CI runs on `ubuntu-latest` (Linux Chromium). If snapshots from your machine do not
match CI, update baselines on Linux or from the failing CI run’s diff, then commit.

React↔Angular alignment is a separate step (`pnpm test:visual:parity`), not part of
the default `test:visual`. Tag a story `skip-visual` to exclude it (Spinner does).
Use `visual-fullpage` when the UI portals outside `#storybook-root`.

## Documentation

The written Curve docs — overview, designer and developer guides, accessibility,
releases — live in [`packages/storybook-config/docs/curve`](packages/storybook-config/docs/curve).
Both Storybooks load those MDX pages as the **Curve** section in the sidebar, so
you read them in Storybook (locally on `:6006` / `:6007`, or on GitHub Pages) rather
than as standalone files. Edit the MDX there, not in the framework packages, to keep
the two Storybooks in sync.

## Demo app

[`apps/react-app`](apps/react-app) (`@surfnet/curve-react-app`) is a minimal Next.js
(App Router) **demo app for testing `@surfnet/curve-react` components** as a real
workspace consumer — a smoke test that the package imports and renders outside
Storybook.

```bash
pnpm build                                # build @surfnet/curve-react first (the app consumes its dist)
pnpm --filter @surfnet/curve-react-app dev      # http://localhost:3000
```

It imports the package's compiled stylesheet (`@surfnet/curve-react/styles.css`) in
[`app/layout.tsx`](apps/react-app/app/layout.tsx) and renders a `Button` in
[`app/page.tsx`](apps/react-app/app/page.tsx). The app lists `@surfnet/curve-react`
under `transpilePackages` so Next compiles the workspace source. Turborepo wires
`@surfnet/curve-react-app#build` to depend on `@surfnet/curve-react#build` automatically via `^build`.

The app also runs its **own Tailwind v4** build (`@tailwindcss/postcss` +
[`app/globals.css`](apps/react-app/app/globals.css)) so you can write Tailwind utilities in
the app. To avoid a second preflight on top of the package's compiled CSS, `globals.css`
imports Tailwind granularly (no `preflight.css`) and re-declares the token → color mapping,
so app utilities like `bg-primary` resolve to the same `@surfnet/curve-tokens` variables.

## Adding a component

There are two generators with the same options:

```bash
# A shadcn / Spartan component: vendored through the upstream CLIs
pnpm import:component card                                # React + Angular
pnpm import:component card --react                        # one framework only
pnpm import:component card --description "A bordered surface…" --axis variants=default,outline

# A home-grown component: no upstream, named curve-<name>
pnpm new:component pill --axis variants=default,outline   # creates curve-pill
```

### Home-grown: `new:component`

No CLI runs and there is no upstream snapshot. The name always gets the `curve-` prefix (like
`curve-data-table`), so it never collides with an upstream component. Bare names that Spartan
already has are refused; import those instead. You get a small working component in each
framework: each contract axis becomes a typed prop that sets a `data-*` attribute, plus a CSS rule
stub per value and Playground + per-axis stories with the same names in both Storybooks. The
contract, barrel, exports and Angular `styles.css` import are wired up as below.

### Upstream: `import:component`

For each framework it:

1. writes the contract (`packages/contracts/src/card.ts`) and exports it;
2. vendors the component with the upstream CLI: shadcn (Base UI + Phosphor, per
   [`components.json`](packages/react/components.json)) or Spartan (`ng g @spartan-ng/cli:ui`,
   followed by `fix-helm-imports`);
3. undoes the CLIs' side effects: dependency bumps, unwanted packages (`cn`,
   `tw-animate-css`), edits to other tracked files, and duplicate copies of components
   Curve already has;
4. adds the barrel, the package export, a CSS stub (`card.module.css` /
   `hlm-card.css`, imported in `styles.css`) and a story stub;
5. saves a pristine upstream copy in `packages/<fw>/.upstream/card/`, for
   `pnpm update:component` later.

It stops before touching anything if the component already exists, or if Spartan needs a
newer `@spartan-ng/brain` than the repo has. It finishes with the list of what's left to do by hand:

- port the Tailwind class strings to CSS (a CSS Module in React, `curve-*` classes in Angular),
  using Curve tokens;
- wire each contract axis into the component (`satisfies Record<…>` / `*Name` prop types);
- write stories covering every variant, size and state, with the same story names in both
  frameworks;
- fill in the contract docs, then `pnpm changeset`.

`pnpm check:conventions` (also run in CI) fails until those are done: it flags leftover
Tailwind, `TODO`s in contracts, missing barrels, exports, stories or contracts, and
React/Angular story-title drift. Accepted exceptions go in
[`scripts/conventions.allowlist.json`](scripts/conventions.allowlist.json).

The resulting layout:

```
packages/react/src/components/ui/card/      packages/angular/src/lib/ui/card/src/
├── card.tsx           # yours to edit        ├── index.ts
├── card.module.css    # component styles     └── lib/
├── card.stories.tsx                               ├── hlm-card.ts
└── index.ts           # barrel                    ├── hlm-card.css
                                                   └── hlm-card.stories.ts
```

### Icons

#### React

Icons come from [`@phosphor-icons/react`](https://phosphoricons.com), an **optional peer
dependency** — install it alongside the package if you use icons:

```bash
pnpm add @phosphor-icons/react
```

Each icon is a tree-shaken component suffixed `Icon`:

```tsx
import { PlusIcon } from '@phosphor-icons/react';

<PlusIcon className="size-5" />        {/* size with a Tailwind size-* utility */}

<Button>
  <PlusIcon data-icon="inline-start" /> {/* inside a button, no size class needed */}
  Add item
</Button>
```

The button auto-sizes any `<svg>` it contains per button size; `data-icon="inline-start"`
/ `data-icon="inline-end"` tighten the padding next to text. See the **Button** stories
(`IconSizes`, `WithIcon`).

#### Angular

Angular uses [ng-icons](https://ng-icons.github.io/ng-icons/) for icons. Install
`@ng-icons/core` (the `NgIcon` component, an **optional peer dependency**) plus a glyph
set — we use the Phosphor set, `@ng-icons/phosphor-icons`:

```bash
pnpm add @ng-icons/core @ng-icons/phosphor-icons
```

Register the glyphs you need with `provideIcons` (named exports like `phosphorPlus`, imported
from the weight you want — `/regular`, `/bold`, `/fill`, …), then render them with `<ng-icon>`:

```ts
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorPlus } from '@ng-icons/phosphor-icons/regular';

@Component({
  imports: [NgIcon],
  providers: [provideIcons({ phosphorPlus })],
  template: `
    <ng-icon name="phosphorPlus" size="1.5rem" />              <!-- standalone: size with NgIcon's size input -->
    <button hlmBtn><ng-icon name="phosphorPlus" data-icon="inline-start" /> Add item</button>
  `,
})
```

Inside a `<button hlmBtn>`, leave `size` off — the button auto-sizes the `<ng-icon>` per
button size, and `data-icon="inline-start"` / `data-icon="inline-end"` tighten the padding
next to text. See the **Button** stories (`IconSizes`, `WithIcon`).

> Same icon set as React, different package: React uses `@phosphor-icons/react`
> (`*Icon` components), Angular uses `@ng-icons/phosphor-icons` (`phosphor*` exports,
> imported from a weight subpath like `@ng-icons/phosphor-icons/regular`).

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
component/API references) in `.agents/skills/`, alongside the repo's own
`add-component` and `update-component` skills. They're exposed to Claude Code
through the `.claude/skills` symlink.

## Customizing and updating components

Vendored shadcn (React) and Spartan helm (Angular) files are **source we own**.
The add CLIs copy them in once; running those CLIs again on an existing
component can overwrite local design and accessibility work.

**Changes can have an effect on accessibility.** Restyling a component, hiding a
label, changing a focus ring, or merging upstream can break keyboard use, screen
readers, names, or contrast — including on stories tagged `a11y-gap` /
`a11y-minor` in Storybook. Check the Accessibility addon before you consider an
edit done.

To refresh a component from upstream:

```bash
pnpm update:component card            # or --react / --angular
```

This fetches today's upstream in a throwaway git worktree and three-way merges it into
your copy per file (`git merge-file`), using the `.upstream/` snapshot as the common base.
Clean merges are written in place; real conflicts get standard `<<<<<<<` markers to
resolve in your editor. Your repo is only touched for the component's own files.

Components vendored before the scripts existed have no `.upstream/` snapshot. For those,
follow the manual flow in
[`.agents/skills/update-component/SKILL.md`](.agents/skills/update-component/SKILL.md)
(React: `react.md`, Angular: `angular.md`): diff, merge, keep `CURVE:` markers.
Never `shadcn add --overwrite` or re-run `ng g @spartan-ng/cli:ui` as a shortcut.

## Theming

Design tokens are defined once in [`packages/tokens/src/tokens.json`](packages/tokens/src/tokens.json)
using the [DTCG](https://design-tokens.github.io/community-group/format/) format and built
with Style Dictionary into `packages/tokens/dist/tokens.css`. Both component packages import
that CSS file — never hand-edit the `:root` or `.dark` blocks in a framework stylesheet.
Change the DTCG JSON and rebuild `@surfnet/curve-tokens` instead.

Each package's stylesheet then adds its own framework-specific wiring on top: Tailwind
`@theme inline` mappings, the radius scale, and the font stack (Geist for React, system
stack for Angular).

### Where the tokens come from (Figma sync)

The DTCG JSON isn't hand-written — it's pulled from Figma. `pnpm sync:figma`
([`scripts/sync-figma.ts`](scripts/sync-figma.ts), run via `jiti`) calls the Figma
**Variables REST API** directly (this is a bespoke integration, not the Tokens Studio
plugin format, despite the similarly-shaped JSON) and (re)writes:

- `packages/tokens/src/tokens.json` / `tokens.dark.json` — the default theme, light and dark
- `packages/tokens/src/tokens.<class>.json` / `tokens.<class>.dark.json` — one pair per
  additional brand theme (e.g. `tokens.surf-green.json`)

It expects three Figma variable collections, matched by name: **`1. TailwindCSS`**
(radius, font family — single mode), **`2. Theme`** (per-brand color palettes), and
**`3. Mode`** (semantic light/dark aliasing on top of the theme layer). The script
resolves Figma's variable alias chains and writes plain CSS-ready values (`rgba(...)`,
rem) — it produces JSON only, never CSS.

You need a `FIGMA_TOKEN` and `FIGMA_FILE_ID` in `.env` (see
[`.env.example`](.env.example)) to run the sync yourself. The JSON output is committed
to git, so running `pnpm sync:figma` is only needed when the Figma file actually
changes — a normal `pnpm build` works from whatever JSON is already checked in and
never talks to Figma.

### Multi-brand themes

Style Dictionary builds `packages/tokens/dist/tokens.css` as cascaded blocks: `:root`
(default theme, light) and `.dark` (its dark-mode diff), plus one `.theme-<class>` /
`.dark.theme-<class>` pair per additional brand theme — each containing only the
properties that differ from the default, to keep the CSS small. Switch themes at
runtime by adding classes to `<html>`, e.g. `class="dark theme-surf-green"`.

## Releasing & versioning

Versioning and publishing are managed with [Changesets](https://changesets.dev). The flow
has two halves: contributors describe their changes, and CI turns those descriptions into
version bumps and npm releases.

### When you make a change

Every PR that changes a publishable package should include a **changeset** — a small
markdown file describing what changed and how it bumps the version. Add one with:

```bash
pnpm changeset
```

The prompt asks which packages changed, whether each bump is `major` / `minor` / `patch`
(follow [semver](https://semver.org)), and for a summary. That summary becomes the
changelog entry, so write it for the people consuming the package. The command writes a
file under `.changeset/` — commit it with your code.

- Skip the changeset only for changes that don't affect any published package (docs, CI,
  internal tooling). CI does not fail without one, so use judgement.
- Need a changeset that doesn't bump anything? Run `pnpm changeset` and pick no packages
  (an empty changeset), useful to record that you deliberately skipped a release.
- Private packages (`@surfnet/curve-tokens`, `@surfnet/curve-contracts`,
  `@surfnet/curve-storybook-config`, `@surfnet/curve-typescript-config`) are versioned but
  never published — Changesets skips publishing any package marked `"private": true`.

### How a release happens (automated)

You do **not** run `version` or `publish` by hand. The
[`.github/workflows/release.yml`](.github/workflows/release.yml) workflow watches `main`:

1. When changesets land on `main`, the workflow opens (or updates) a **"Version Packages"**
   PR. That PR consumes the pending changeset files, bumps each package's `version`, and
   writes the `CHANGELOG.md` entries.
2. Review and merge that PR when you want to cut a release.
3. On merge, the same workflow runs `pnpm release` (build + `changeset publish`), publishing
   the changed public packages to npm and pushing git tags.

Publishing uses npm's **OIDC trusted publishing** — the workflow requests a short-lived
`id-token` (see the `id-token: write` permission and `npm publish`'s automatic provenance
in [`release.yml`](.github/workflows/release.yml)), so there's no `NPM_TOKEN` secret to
manage or rotate. The `@surfnet` npm scope must have this repository/workflow configured
as a trusted publisher on npmjs.com. The provided `GITHUB_TOKEN` handles the PR and tags
automatically.

### Running it manually (rarely needed)

```bash
pnpm changeset            # add a changeset
pnpm version-packages     # apply pending changesets: bump versions + changelogs
pnpm release              # build, then publish to npm (needs npm auth)
```
