# @surfnet/curve-angular

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
