---
'@surfnet/react': minor
'@surfnet/contracts': minor
---

Add eleven new React primitives: `avatar`, `breadcrumb`, `checkbox`, `dropdown-menu`, `field`, `input`, `label`, `select`, `separator`, `sidebar`, and `table`, plus a `data-table` component built on the `table` primitive and TanStack Table (row selection, sorting, filtering, column visibility, and pagination). Each ships with a Storybook story covering its variants and states.

Each new component also gets a contract in `@surfnet/contracts` as the cross-framework source of truth for its description and variant/size/orientation names. Where a component exposes a real variant axis (`avatar` size, `dropdown-menu` item variant, `field` orientation, `select` trigger size, `sidebar` menu-button variant/size), the React component is type-checked against the contract.
