# CSS Modules pilot (shadcn/css pattern)

This pilot moves **Button** styling from Tailwind `cva` class strings to a co-located CSS Module, inspired by [shadcn/css](https://shadcn-css.com/docs/introduction). We are **not** installing the `shadcn-css` CLI or Radix-based components.

## Gap matrix: shadcn/css vs Curve React

| Area               | Curve (`@surfnet/curve-react`)                           | [shadcn/css](https://shadcn-css.com/docs/introduction) | Pilot choice                              |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| Primitives         | [Base UI](https://base-ui.com) (`@base-ui/react`)        | Radix UI (`@radix-ui/react-slot`, …)                   | Keep Base UI                              |
| Vendoring          | Official `shadcn` CLI (`base-vega`, Phosphor)            | `shadcn-css` CLI                                       | Keep official shadcn for new primitives   |
| Variant names      | `@surfnet/curve-contracts` (`default`, not `primary`)    | Often `primary`                                        | Contract names + `data-variant`           |
| Tokens             | `@surfnet/curve-tokens` (`--primary`, `--background`, …) | Bundled `--color-*` scale                              | Curve `tokens.css` via `var(--primary)`   |
| Styling            | Tailwind utilities in `cva`                              | CSS Modules + `data-*` attributes                      | CSS Module + `data-variant` / `data-size` |
| `buttonVariants()` | Used by Calendar nav buttons                             | N/A                                                    | Kept via composable module classes        |
| Angular            | Spartan + Tailwind parity                                | React only                                             | Plain per-component CSS (see below)       |

## Decision gate (after Button pilot)

**Recommendation:** Continue a **gradual, pattern-based** migration for React only—co-located `.module.css` files and semantic token variables—not a wholesale switch to the shadcn/css registry.

| Option                                                   | Pros                                                                              | Cons                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **A. Per-component CSS Modules** (recommended next step) | Easier visual edits; aligns with shadcn/css ergonomics; keeps Base UI + contracts | Two styling systems until most components migrate; each primitive needs selector QA |
| **B. Hybrid**                                            | Lower risk for complex overlays                                                   | Split brain: some components Tailwind, some CSS                                     |
| **C. Stay on Tailwind**                                  | Single toolchain; official shadcn updates stay drop-in                            | Variant maps stay dense; harder for CSS-first contributors                          |
| **D. Adopt shadcn/css CLI**                              | Upstream CSS files to copy                                                        | Radix-only, different APIs, duplicate token system, no Angular path                 |

**Suggested order if A:** Badge, Separator, Skeleton → Input, Checkbox, Switch → Dialog, Popover, Select (validate overlay selectors).

### Migrated to CSS Modules (React)

| Component           | Module                           |
| ------------------- | -------------------------------- |
| Button              | `button.module.css`              |
| Badge               | `badge.module.css`               |
| Separator           | `separator.module.css`           |
| Skeleton            | `skeleton.module.css`            |
| Input               | `input.module.css`               |
| Textarea            | `textarea.module.css`            |
| Checkbox            | `checkbox.module.css`            |
| Switch              | `switch.module.css`              |
| Label               | `label.module.css`               |
| Spinner             | `spinner.module.css`             |
| Progress            | `progress.module.css`            |
| Kbd                 | `kbd.module.css`                 |
| Alert               | `alert.module.css`               |
| Toggle              | `toggle.module.css`              |
| Toggle group        | `toggle-group.module.css`        |
| Radio group         | `radio-group.module.css`         |
| Slider              | `slider.module.css`              |
| Avatar              | `avatar.module.css`              |
| Aspect ratio        | `aspect-ratio.module.css`        |
| Native select       | `native-select.module.css`       |
| Empty               | `empty.module.css`               |
| Breadcrumb          | `breadcrumb.module.css`          |
| Card                | `card.module.css`                |
| Table               | `table.module.css`               |
| Pagination          | `pagination.module.css`          |
| Button group        | `button-group.module.css`        |
| Tabs                | `tabs.module.css`                |
| Scroll area         | `scroll-area.module.css`         |
| Resizable           | `resizable.module.css`           |
| Popover             | `popover.module.css`             |
| Hover card          | `hover-card.module.css`          |
| Tooltip             | `tooltip.module.css`             |
| Input OTP           | `input-otp.module.css`           |
| Sonner              | `sonner.module.css`              |
| Date picker         | `date-picker.module.css`         |
| Numbered pagination | `numbered-pagination.module.css` |
| Field               | `field.module.css`               |
| Item                | `item.module.css`                |
| Dialog              | `dialog.module.css`              |
| Sheet               | `sheet.module.css`               |
| Select              | `select.module.css`              |
| Sidebar             | `sidebar.module.css`             |
| Calendar            | `calendar.module.css`            |
| Accordion           | `accordion.module.css`           |
| Alert dialog        | `alert-dialog.module.css`        |
| Carousel            | `carousel.module.css`            |
| Data table          | `data-table.module.css`          |
| Dropdown menu       | `dropdown-menu.module.css`       |
| Context menu        | `context-menu.module.css`        |
| Command             | `command.module.css`             |
| Input group         | `input-group.module.css`         |
| Combobox            | `combobox.module.css`            |
| Navigation menu     | `navigation-menu.module.css`     |

### Native HTML alternatives

Lightweight siblings of Base UI components — same tokens and CSS Modules, no extra primitives:

| Component        | Element                   | When to use                                             |
| ---------------- | ------------------------- | ------------------------------------------------------- |
| `NativeSelect`   | `<select>`                | Simple option lists                                     |
| `NativeInput`    | `<input>`                 | Text-like and file types; `size` default \| sm          |
| `NativeTextarea` | `<textarea>`              | Multi-line text                                         |
| `NativeCheckbox` | checkbox input            | Boolean choice                                          |
| `NativeRadio`    | radio input               | One-of-many (use with fieldset / shared `name`)         |
| `NativeRange`    | range input               | Simple slider                                           |
| `NativeFieldset` | `<fieldset>` / `<legend>` | Semantic form groups                                    |
| `NativeProgress` | `<progress>`              | Determinate bar without custom labels                   |
| `NativeDialog`   | `<dialog>`                | Simple modal; use `Dialog` for focus trap / composition |
| `NativePopover`  | `popover` API             | Lightweight floating panel                              |
| `NativeDetails`  | `<details>` / `<summary>` | Single expandable blocks; use `Accordion` for groups    |

Shared field styles: [`native-control/control.module.css`](../src/components/ui/native-control/control.module.css).

**Contracts:** Keep variant/size **names** in `@surfnet/curve-contracts`. Native components each have a description-only contract in that package.

**Publishing:** Consumers still import `@surfnet/curve-react/styles.css`; CSS Modules compile into that bundle.

**Follow-ups:** optional shared focus/disabled partials under `src/styles/`; extend `semantic-colors.css` when new semantic tokens ship.

### Tailwind vs semantic color utilities (React package)

**Published `styles.css` does not run Tailwind.** It includes tokens, Tailwind's preflight reset (vendored as `src/styles/preflight.css`, `--theme()` calls resolved by hand), minimal base (`src/styles/base.css`), shared motion keyframes (`src/styles/motion.css`), **semantic color utilities** (`src/styles/semantic-colors.css` — e.g. `text-muted-foreground`, `bg-primary`), and CSS Modules.

**Cascade layers.** Everything sits in Tailwind's layer names, declared once as `@layer theme, base, components, utilities`: reset + base in `base`, every CSS Module in `components` (wrapped by the `curve-layer-modules` PostCSS plugin in `vite.config.ts`, which also restates the order because Vite emits module CSS first), semantic utilities in `utilities`. A consumer's Tailwind build merges into the same layers, so `className="h-12"` beats a component, and unlayered app CSS beats everything. Tokens stay unlayered custom properties.

**Motion.** Enter/exit animations (popups, menus, dialogs, sheet, accordion, navigation menu) are declared only inside `@media (prefers-reduced-motion: no-preference)`. Popups/dialogs use the shared `curve-enter` / `curve-exit` keyframes from `motion.css`, referenced as `animation-name: global(curve-enter)` so CSS Modules don't hash the name and tuned per component with `--curve-enter-*` / `--curve-exit-*` custom properties; Base UI's `[data-starting-style]` / `[data-ending-style]` transitions cover the rest.

| Area        | Path                                    | Role                                                         |
| ----------- | --------------------------------------- | ------------------------------------------------------------ |
| Library CSS | `src/index.css`                         | Tokens + base + semantic colors only                         |
| Storybook   | `storybook-config/src/story-chrome.css` | Plain CSS demo utilities for stories (shared with Angular)   |
| shadcn CLI  | `components.json` → `tailwind.css`      | CLI metadata; migrate vendored Tailwind to modules after add |
| `cn()`      | `src/lib/utils.ts`                      | `tailwind-merge` for consumer `className`s                   |
| Demo app    | `apps/react-app/src/app/globals.css`    | App Tailwind (theme + utilities)                             |
| Angular     | `packages/angular`                      | Plain CSS per component, no Tailwind (see below)             |

Component `src/components/ui/**/*.tsx` files use CSS Modules only.

**Add-component skill:** [`.claude/skills/add-component/react.md`](../../../.claude/skills/add-component/react.md) documents the CSS Module workflow for new components.

## Pilot verification (Button)

- **Build:** `pnpm --filter @surfnet/curve-react build` — CSS Module compiles into `dist/styles.css` (single bundle; module class names are hashed). `button.module.js` is a small re-export of hashed class strings for `buttonVariants()`.
- **Lint:** `pnpm --filter @surfnet/curve-react lint` — TypeScript includes `*.module.css` via [`src/vite-env.d.ts`](../src/vite-env.d.ts).
- **Storybook:** existing stories under `Components/Button` cover variants, sizes, icons, destructive, disabled, and `render` prop — run `pnpm --filter @surfnet/curve-react storybook` for visual and a11y checks.
- **Calendar:** `buttonVariants()` in [`calendar.tsx`](../src/components/ui/calendar/calendar.tsx) unchanged at the call site; styling now comes from module classes instead of Tailwind utilities.

## Angular

All `@surfnet/curve-angular` components are styled with plain CSS; the published `dist/styles.css` contains no Tailwind. Spartan's helm layer is mostly **directives** (`button[hlmBtn]`, …), which cannot own component styles, so Angular can't use CSS Modules or `styleUrl`. Each component has a co-located stylesheet with stable `curve-` prefixed classes:

| Piece           | Where                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Component CSS   | `src/lib/ui/<name>/src/lib/hlm-<name>.css`, imported into `@layer components` from `src/styles.css`                    |
| Import order    | Primitives first (separator, label, button, toggle, input, …), then composites, so a composite can restyle a primitive |
| Class names     | Block + BEM modifiers: `curve-button`, `curve-button--variant-ghost`, `curve-button--size-icon-sm`                     |
| Variant helpers | `buttonVariants()` / `toggleVariants()` / `listVariants()` return those classes (no `cva`)                             |
| Contracts       | `satisfies Record<ButtonVariantName, string>` on the class maps, as before                                             |
| State selectors | Spartan attributes: `[data-disabled]`, `[data-matches-spartan-invalid='true']`, `[data-state='open' / 'closed']`       |
| Motion          | `src/styles/motion.css` (identical to React's), keyframes used as plain `curve-enter` / `curve-exit`                   |
| Base            | `src/styles/{preflight,base,semantic-colors,utilities}.css` — preflight/semantic colours/utilities shared with React   |
| Build           | `scripts/build-css.ts` bundles with Lightning CSS (keeps `@import … layer()`), fonts copied by `copy-font-files.ts`    |
| Storybook       | Shared `storybook-config/src/story-chrome.css` (plain CSS, as in React) — no Tailwind                                  |

**Layer order** (`src/styles.css`): `theme, base, ng-icon, cdk-overlay, cdk-resets, default, components, utilities`. `ng-icon`, `cdk-*` and `default` are layers that @ng-icons, the Angular CDK and ngx-scrollbar declare when they inject their styles at runtime; left undeclared they'd be created last and outrank every component rule (e.g. `ng-icon` sets the icon colour in its layer). Reserving them between the reset and the components restores the old precedence: reset < library styles < Curve components < utilities.

**Pitfalls when translating helm Tailwind to CSS** (all hit during the migration):

- **`ng-icon` host styles are unlayered.** `:host { display; width; height; line-height; vertical-align; overflow }` beats any layered rule. Where the Tailwind selector used to outrank it (`[&>ng-icon]:flex`, `group-…:hidden`), use `!important` for just that property. Where a plain class sat on the `<ng-icon>` itself (`class="size-3"`), the host already won before, so don't force it.
- **`tailwind-merge` used to resolve conflicts.** `classes()` merges every source on an element (host directives, `setClass()`, static `class="…"` in templates, passed-in class inputs) and the last one won. In CSS that becomes specificity plus import order: overrides on top of another component are qualified (`.curve-button.curve-calendar-day`, `.curve-input-group.curve-command-input-group`).
- **Tailwind composes `box-shadow`** from independent ring and shadow variables, so `shadow-none` never cancelled a focus ring. Write out the resulting shadow per state (ring first, then the shadow).
- **Order among equal-specificity variants** follows Tailwind's output (e.g. data variants sort by value: `disabled` < `outside` < `range-between` < `selected` < `today` for calendar days). When unsure, read the rule order from a Tailwind build instead of guessing.
- **`leading-*` pins line-height:** with `leading-normal`, a later `text-sm` only changes the font size.
- **Animations need the right state element.** Select and combobox content have no state attribute; Spartan puts `data-state` on the CDK overlay pane, so their motion keys off `.cdk-overlay-pane[data-state]` (Spartan waits for subtree animations before closing).
- `group/*` and `peer/*` marker classes stay on the hosts (consumers' Tailwind may target them); component CSS uses `[data-slot]` / `curve-*` selectors.
- **The layer order statement is its own first import** (`src/styles/layers.css`). webpack's `css-loader` (Storybook) emits imported files before the importing file's own rules, so a statement at the top of `styles.css` would land after the component layers.
- No `data-variant` / `data-size` host attributes on `hlmBtn`: ancestors use `:has([data-size=…])` (e.g. the item group gap), and a button's size must not trip them. The React item group had the same collision; its selector is now scoped to `[data-slot='item']`.

**Verification:** every Angular story (414 screenshots, light and dark) rendered pixel-identical before and after, with Tailwind removed from the package CSS. Hover, focus and open states that no story shows were translated by hand from the original classes.
