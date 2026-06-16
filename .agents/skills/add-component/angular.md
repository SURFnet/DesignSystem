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

1. **Generate the component:**

   ```bash
   cd packages/angular
   pnpm exec ng g @spartan-ng/cli:ui <component>   # e.g. card, dialog, input
   ```

   This copies helm code into `src/lib/ui/<component>/`, installs the matching
   `@spartan-ng/brain` primitive, and adds a `@spartan-ng/helm/<component>` path mapping
   to `tsconfig.json`. The schematic is interactive unless `components.json` already
   exists (it does) — pass `--defaults` for non-interactive runs.

2. **Export from the public API** `src/public-api.ts`:

   ```ts
   export * from './lib/ui/card/src';
   ```

3. **Declare new runtime deps as allowed.** If the component introduced a new npm runtime
   dependency (a new `@spartan-ng/brain/*` entry point is fine, but a brand-new package
   isn't), add it to `ng-package.json` → `allowedNonPeerDependencies`, or `ng-packagr`
   fails with "must be explicitly allowed".

4. **Add a story** next to the helm source, e.g.
   `src/lib/ui/card/src/lib/card.stories.ts`. Mirror
   `src/lib/ui/button/src/lib/hlm-button.stories.ts`: use `@storybook/angular`
   (`Meta`, `StoryObj`, `moduleMetadata`), import the helm directive/component, and write
   template-based `render` stories covering every variant/size/state. If an input comes
   from a host directive (like `disabled` on the button), widen the args type with an
   intersection so it shows as a control.

## Verify

```bash
pnpm --filter @surfnet/angular build              # ng-packagr (FESM + d.ts)
pnpm --filter @surfnet/angular build-storybook
pnpm format
```

## Notes

- Helm files import each other through the `@spartan-ng/helm/*` alias, which the tsconfig
  paths resolve to local source; `ng-packagr` inlines them. Don't rewrite these to
  relative imports — keeping the alias lets future `ng g` runs work unchanged.
- The library has no global stylesheet in its build output; the theme tokens in
  `src/styles.css` are loaded by Storybook (via the `styles` option) and are meant to be
  imported by consuming apps.
