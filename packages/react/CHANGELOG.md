# @surfnet/curve-react

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
