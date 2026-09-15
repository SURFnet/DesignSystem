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
| Angular            | Spartan + Tailwind parity                                | React only                                             | Unchanged in this pilot                   |

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

**Published `styles.css` does not bundle Tailwind.** It includes tokens, minimal base (`src/styles/base.css`), **semantic color utilities** (`src/styles/semantic-colors.css` — e.g. `text-muted-foreground`, `bg-primary`), and CSS Modules.

| Area        | Path                                 | Role                                                         |
| ----------- | ------------------------------------ | ------------------------------------------------------------ |
| Library CSS | `src/index.css`                      | Tokens + base + semantic colors only                         |
| Storybook   | `.storybook/story-chrome.css`        | Plain CSS demo utilities for stories — not Tailwind          |
| shadcn CLI  | `components.json` → `tailwind.css`   | CLI metadata; migrate vendored Tailwind to modules after add |
| `cn()`      | `src/lib/utils.ts`                   | `tailwind-merge` for consumer `className`s                   |
| Demo app    | `apps/react-app/src/app/globals.css` | App Tailwind (theme + utilities)                             |
| Angular     | `packages/angular`                   | Unchanged — Spartan + Tailwind                               |

Component `src/components/ui/**/*.tsx` files use CSS Modules only.

**Add-component skill:** [`.claude/skills/add-component/react.md`](../../../.claude/skills/add-component/react.md) documents the CSS Module workflow for new components.

## Pilot verification (Button)

- **Build:** `pnpm --filter @surfnet/curve-react build` — CSS Module compiles into `dist/styles.css` (single bundle; module class names are hashed). `button.module.js` is a small re-export of hashed class strings for `buttonVariants()`.
- **Lint:** `pnpm --filter @surfnet/curve-react lint` — TypeScript includes `*.module.css` via [`src/vite-env.d.ts`](../src/vite-env.d.ts).
- **Storybook:** existing stories under `Components/Button` cover variants, sizes, icons, destructive, disabled, and `render` prop — run `pnpm --filter @surfnet/curve-react storybook` for visual and a11y checks.
- **Calendar:** `buttonVariants()` in [`calendar.tsx`](../src/components/ui/calendar/calendar.tsx) unchanged at the call site; styling now comes from module classes instead of Tailwind utilities.
