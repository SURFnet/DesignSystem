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

2. **Add the React version** — see [`react.md`](react.md).

3. **Add the Angular version** — see [`angular.md`](angular.md).

4. **Align the two versions:**
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

5. **Verify both:**

   ```bash
   pnpm build && pnpm lint && pnpm format
   pnpm --filter @surfnet/react build-storybook
   pnpm --filter @surfnet/angular build-storybook
   # parity check — both should list the same story ids:
   node -e "console.log(Object.keys(require('./packages/react/storybook-static/index.json').entries))"
   node -e "console.log(Object.keys(require('./packages/angular/storybook-static/index.json').entries))"
   ```

## Definition of done

- Component vendored via the framework CLI(s) — never hand-write primitives.
- Exported from each package's entry (`src/index.ts` / `src/public-api.ts`).
- A Storybook story per package covering the component's full surface; when added to both,
  the story sets match.
- `pnpm build`, `pnpm lint`, `pnpm format`, and the relevant `build-storybook` runs pass.
- Any unavoidable React/Angular difference is documented, not hidden.
