# @surfnet/curve-react

## 0.3.0

### Minor Changes

- 59d72e3: Align the Button with the updated Figma design.

  **Breaking:** the `xs` size is removed from the Button. Replace `size="xs"` with `size="sm"`. The icon-only `icon-xs` size is unchanged.

  The `destructive` variant is now a solid `--destructive` fill with `--destructive-foreground` text instead of a light red tint, and its hover state uses the same `/90` alpha layer as the other filled variants. The `outline` variant loses its `shadow-xs`, and the `default` and `destructive` variants keep a transparent border on hover.

  `--destructive-foreground` is now mapped to the `destructive-foreground` Tailwind color in both packages, so `bg-*` / `text-*` utilities can use it.

- aed7d3b: Align pagination across frameworks: add React `NumberedPagination`, and bring Previous/Next (`iconOnly`, logical padding, RTL icon flip, configurable `aria-label`) and Ellipsis (`srOnlyText`, decorative icon) in line with Angular.
- 3c533d0: Add 36 components to close the gap with the Figma component library: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `badge`, `button-group`, `calendar`, `carousel`, `combobox`, `command`, `context-menu`, `date-picker`, `dialog`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `tabs`, `toggle`, `toggle-group`, and `tooltip`.

  - Every component has a `@surfnet/curve-contracts` entry and a Storybook story covering its full surface. Where a component exposes a styling axis, the prop is typed from the contract so a stray `variant`/`size`/`orientation`/`side` value fails the type-check.
  - `date-picker` is hand-composed from `Calendar` + `Popover`, since shadcn ships no registry item for it.
  - `chart` and `drawer` are deferred until there is an Angular equivalent, to keep framework parity — see ADR-019 in `docs/decision-log.md`.

- 0468c9a: Rename the `--link` design token to `--primary-strong` so it can be used beyond hyperlinks. Tailwind utilities follow (`text-primary-strong`, `bg-primary-strong`, `border-primary-strong`); the `link` button variant now uses `text-primary-strong`.
- 02d3c7c: Added multiple new components

### Patch Changes

- a2792df: Align hover and selected interaction states with Figma: item hover uses `--muted`, selected/open/active states use `--secondary`, and dark-mode `--popover` uses neutral/900 instead of stone/800.

## 0.2.2

### Patch Changes

- f08b7f9: Rename the compiled stylesheet from `curve-react.css` to `styles.css` in `dist`, matching
  `@surfnet/curve-angular`. The public `./styles.css` export path is unchanged, so consumers
  importing it as documented are unaffected; only code importing the internal filename
  directly needs to switch to the `styles.css` export.

## 0.2.1

### Patch Changes

- d6ef476: Add a package README covering install, peer deps, usage, theming, and a Storybook link, so the npm/GitHub package pages have content.

## 0.2.0

### Minor Changes

- 769ca08: The `link` button variant now uses the dedicated `--link` design token instead of
  `--primary`, so link text picks up the theme- and mode-specific link colour. Exposes a
  matching `text-link` (and `bg-link` / `border-link`) utility via the `--color-link` theme
  mapping. Applied to both the React and Angular buttons so they stay in parity.

## 0.1.0

### Minor Changes

- 1523d8c: Initial release of the React component library (private for now; not yet published
  to npm).

  - Built on [shadcn/ui](https://ui.shadcn.com) with [Base UI](https://base-ui.com)
    primitives, bundled with Vite in library mode.
  - 16 components: `avatar`, `breadcrumb`, `button`, `card`, `checkbox`, `data-table`,
    `dropdown-menu`, `field`, `input`, `input-group`, `label`, `select`, `separator`,
    `sidebar`, `table`, `textarea`.
  - Each component ships in its own directory with a Storybook story covering its full
    variant/size/state surface and an autodocs page.
  - Styled with Tailwind CSS v4, sourcing all design tokens from `@surfnet/curve-tokens`
    and shipping a compiled `styles.css`.
  - Variant and size names are checked against `@surfnet/curve-contracts` at build time
    to keep parity with `@surfnet/curve-angular`.
