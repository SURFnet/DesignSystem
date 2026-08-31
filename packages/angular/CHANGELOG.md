# @surfnet/curve-angular

## 0.3.0

### Minor Changes

- 3c533d0: Add 36 components to close the gap with the Figma component library: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `badge`, `button-group`, `calendar`, `carousel`, `combobox`, `command`, `context-menu`, `date-picker`, `dialog`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `tabs`, `toggle`, `toggle-group`, and `tooltip`.

  - Every component has a `@surfnet/curve-contracts` entry and a Storybook story covering its full surface. Where a component exposes a styling axis, the input is typed from the contract so a stray `variant`/`size`/`orientation` value fails the type-check.
  - `sheet`, `skeleton`, and `tooltip` were already vendored internally (as dependencies of `sidebar`) but not exported — they are now part of the public API.
  - The newly vendored components use Phosphor icons instead of Spartan's default Lucide set, to match this package's existing icon convention.
  - Bump `@spartan-ng/brain` to `0.0.1-alpha.720` so `navigation-menu` can expose trigger `align` (and match React's Alignment story). Overlay/dialog host bindings that brain removed (`closeDelay`, `restoreFocus`, close `delay`) are dropped from the helm wrappers.
  - A few documented gaps remain where Spartan's primitives don't expose an identical surface (e.g. `scroll-area`'s orientation) — noted in the component source rather than papered over.

- 59d72e3: Align the Button with the updated Figma design.

  **Breaking:** the `xs` size is removed from the Button. Replace `size="xs"` with `size="sm"`. The icon-only `icon-xs` size is unchanged.

  The `destructive` variant is now a solid `--destructive` fill with `--destructive-foreground` text instead of a light red tint, and its hover state uses the same `/90` alpha layer as the other filled variants. The `outline` variant loses its `shadow-xs`, and the `default` and `destructive` variants keep a transparent border on hover.

  `--destructive-foreground` is now mapped to the `destructive-foreground` Tailwind color in both packages, so `bg-*` / `text-*` utilities can use it.

- 0468c9a: Rename the `--link` design token to `--primary-strong` so it can be used beyond hyperlinks. Tailwind utilities follow (`text-primary-strong`, `bg-primary-strong`, `border-primary-strong`); the `link` button variant now uses `text-primary-strong`.
- 02d3c7c: Added multiple new components

### Patch Changes

- a2792df: Align hover and selected interaction states with Figma: item hover uses `--muted`, selected/open/active states use `--secondary`, and dark-mode `--popover` uses neutral/900 instead of stone/800.
- aed7d3b: Align pagination across frameworks: add React `NumberedPagination`, and bring Previous/Next (`iconOnly`, logical padding, RTL icon flip, configurable `aria-label`) and Ellipsis (`srOnlyText`, decorative icon) in line with Angular.

## 0.2.2

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

- 1523d8c: Initial release of the Angular component library.

  - Built on [Spartan](https://spartan.ng) (`brain` primitives + `helm` styles), built
    with `ng-packagr`.
  - 20 components: `avatar`, `breadcrumb`, `button`, `card`, `checkbox`, `data-table`,
    `dropdown-menu`, `field`, `icon`, `input`, `input-group`, `label`, `select`,
    `separator`, `sheet`, `sidebar`, `skeleton`, `table`, `textarea`, `tooltip`.
    `icon`, `sheet`, `skeleton`, and `tooltip` are Angular-only for now, ahead of their
    React and `@surfnet/curve-contracts` counterparts.
  - Each component ships with a Storybook story (webpack builder) and an autodocs page.
  - Styled with Tailwind CSS v4, sourcing all design tokens from `@surfnet/curve-tokens`,
    and ships a compiled `styles.css` plus the Geist variable font files it depends on.
  - Variant and size names are checked against `@surfnet/curve-contracts` at build time
    to keep parity with `@surfnet/curve-react`.
