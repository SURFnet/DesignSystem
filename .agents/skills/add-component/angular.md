# Add an Angular component (`@surfnet/angular`)

Part of the **add-component** skill — see [`SKILL.md`](SKILL.md) for scope/parity.

Spartan splits each component in two: the `brain` primitive (installed from npm) and the
`helm` styled directive/component (**copied into the package**). Vendor with the CLI —
don't hand-write helm code. Config lives in `packages/angular/components.json`
(`componentsPath: src/lib/ui`, `importAlias: @spartan-ng/helm`).

> **Available tooling:** the **`spartan` skill** (`.agents/skills/spartan/`) is the deep
> reference for spartan/ui, the Brain/Helm layers, and component APIs, and the repo
> exposes a **`spartan-ui` MCP server** (`.mcp.json` / `.vscode/mcp.json`) for looking up
> Spartan docs, APIs, and examples. The MCP is read-only — install code with the CLI below.

## Steps

1. **Define the contract first.** Before generating, add `<name>Contract` to
   `@surfnet/contracts` (see the [Contract step in SKILL.md](SKILL.md#contract-step)).
   This ensures the variant/size names are settled before the helm directive is written.

2. **Generate the component:**

   ```bash
   cd packages/angular
   pnpm exec ng g @spartan-ng/cli:ui <component>   # e.g. card, dialog, input
   ```

   This copies helm code into `src/lib/ui/<component>/`, installs the matching
   `@spartan-ng/brain` primitive, and adds a `@spartan-ng/helm/<component>` path mapping
   to `tsconfig.json`. The schematic is interactive unless `components.json` already
   exists (it does) — pass `--defaults` for non-interactive runs.

3. **Apply `satisfies` to the cva variant/size maps.** In the generated helm file, import
   the name unions from `@surfnet/contracts` and annotate the variant and size objects.
   The pattern (adapted from `hlm-button.ts`):

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

4. **Export from the public API** `src/public-api.ts`:

   ```ts
   export * from './lib/ui/card/src';
   ```

5. **Declare new runtime deps as allowed.** If the component introduced a new npm runtime
   dependency (a new `@spartan-ng/brain/*` entry point is fine, but a brand-new package
   isn't), add it to `ng-package.json` → `allowedNonPeerDependencies`, or `ng-packagr`
   fails with "must be explicitly allowed".

6. **Add a story** next to the helm source, e.g.
   `src/lib/ui/card/src/lib/card.stories.ts`. Mirror
   `src/lib/ui/button/src/lib/hlm-button.stories.ts`: use `@storybook/angular`
   (`Meta`, `StoryObj`, `moduleMetadata`), import the helm directive/component, and write
   template-based `render` stories covering every variant/size/state. Source variant/size
   lists and docs from the contract object (`cardContract.variants`, `cardContract.variantDocs`,
   etc.) instead of duplicating literals. If an input comes from a host directive (like
   `disabled` on the button), widen the args type with an intersection so it shows as a
   control.

## Verify

```bash
pnpm --filter @surfnet/contracts lint       # contract types still compile
pnpm --filter @surfnet/angular build        # ng-packagr (FESM + d.ts); satisfies check runs here
pnpm --filter @surfnet/angular build-storybook
pnpm format
```

## Definition of done

- Component generated via the Spartan CLI — never hand-written.
- A `<name>Contract` entry exists in `@surfnet/contracts` and the cva variant/size maps
  carry `satisfies Record<...>` against the contract types; `pnpm lint` (or the build)
  fails if either side adds or removes a name.
- Component exported from `src/public-api.ts`.
- Story covers full variant/size/state surface, sourcing lists from the contract object.
- `pnpm build`, `pnpm format`, and `build-storybook` all pass.

## Notes

- Helm files import each other through the `@spartan-ng/helm/*` alias, which the tsconfig
  paths resolve to local source; `ng-packagr` inlines them. Don't rewrite these to
  relative imports — keeping the alias lets future `ng g` runs work unchanged.
- The library has no global stylesheet in its build output; the theme tokens in
  `src/styles.css` are loaded by Storybook (via the `styles` option) and are meant to be
  imported by consuming apps.
- Icons: the vendored Spartan `hlm` icon directive (`src/lib/ui/icon/`) renders ng-icons.
  `@ng-icons/core` and the Tabler set `@ng-icons/tabler-icons` are **optional peer
  dependencies** (kept as devDependencies so stories build) — because they're peer deps
  they don't go in `ng-package.json → allowedNonPeerDependencies`. The Spartan CLI may add
  them (and Lucide) to `dependencies`; move them to peers and drop the unused Lucide set.
  Register glyphs with `provideIcons` and render `<ng-icon hlm name="…" size="…" />`; the
  button auto-sizes an icon it contains, and `data-icon="inline-start"`/`-end` tightens the
  padding next to text. See `hlm-button.stories.ts` (`IconSizes`, `WithIcon`).
- The `@surfnet/contracts` import is a `devDependency` only — it must not appear in the
  published `dist`. The `satisfies` annotation is erased by TypeScript at compile time, so
  no import survives into the built output.
