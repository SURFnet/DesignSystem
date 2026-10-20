# Manual fallback (no generator)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md). **Only read this when you
can't use `pnpm import:component`** (e.g. the script fails on an upstream CLI change). It
covers the mechanical steps the script normally does; afterwards continue with the
finishing steps in [`react.md`](react.md) / [`angular.md`](angular.md).

## 0. Confirm the component exists upstream

Not every component is in both shadcn (Base UI) and Spartan, and **names can differ**:

- shadcn (Base UI): https://ui.shadcn.com/docs/components
- Spartan: https://www.spartan.ng (or the `spartan-ui` MCP server)

If one side has no equivalent, stop and flag it rather than hand-rolling a divergent
component.

## 1. Contract

Add `packages/contracts/src/<name>.ts` and export it — see [`contract.md`](contract.md). When
building for parity, define it once and reuse it for both frameworks.

## 2. React (`packages/react`)

1. **Vendor into its own directory.** Pass `--path` with a trailing slash:

   ```bash
   cd packages/react
   # trailing slash → src/components/ui/card/card.tsx
   pnpm dlx shadcn@latest add card --path src/components/ui/card/
   ```

   The CLI resolves Base UI source and Phosphor icon imports from `components.json`. (A
   `--dry-run` preview _displays_ a flat path — ignore that; the real write nests correctly.)
   The shadcn MCP server adds files **flat** — move the file and add a barrel afterwards.

2. **Undo CLI side effects:** remove the `cn` npm dependency it adds and point
   `import { cn } from "cn"` at `@/lib/utils`. Revert unrelated dependency bumps.

3. **Barrel** `src/components/ui/card/index.ts`: `export * from './card';` — keeps
   `@/components/ui/card` imports resolving for other shadcn components.

4. **Package entry** `src/index.ts`: `export * from '@/components/ui/card';`

5. If the component pulled in sibling shadcn components, give each the same
   per-directory + barrel treatment.

Target layout:

```
src/components/ui/card/
├── card.tsx           # vendored component (Base UI + module classes)
├── card.module.css    # component styles (Curve tokens)
├── card.stories.tsx   # Storybook story
└── index.ts           # export * from './card'
```

## 3. Angular (`packages/angular`)

1. **Generate:**

   ```bash
   cd packages/angular
   pnpm exec ng g @spartan-ng/cli:ui <component> --defaults
   ```

   This copies helm code into `src/lib/ui/<component>/`, installs the `@spartan-ng/brain`
   primitive and adds a `@spartan-ng/helm/<component>` path mapping to `tsconfig.json`.
   **Revert any `@spartan-ng/brain` version bump** — brain stays on `0.0.1-alpha.720`; if the
   helm needs brain 1.x, stop and add React only.

2. **Rewrite helm imports** right away:
   `pnpm --filter @surfnet/curve-angular fix-helm-imports`. The CLI vendors cross-component
   imports through the `@spartan-ng/helm/*` alias, which isn't a real npm package;
   `ng-packagr` doesn't read tsconfig `paths`, so the alias would leak into the published
   bundle. Verify after a build: `grep -r "@spartan-ng/helm" packages/angular/dist` finds
   nothing.

3. **CSS stub:** add `src/lib/ui/<component>/src/lib/hlm-<component>.css` and import it from
   `src/styles.css` (primitives section first, composites after — a composite that restyles a
   primitive inside it must come later).

4. **Public API** `src/public-api.ts`: `export * from './lib/ui/card/src';`

## 4. Snapshot (optional)

Without a `packages/<fw>/.upstream/<name>/` copy of the pristine vendored files,
`pnpm update:component` can't three-way merge later; updates then follow the manual flow in
`update-component`.
