# @surfnet/curve-react

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
