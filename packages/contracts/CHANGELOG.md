# @surfnet/curve-contracts

## 0.1.0

### Minor Changes

- 1523d8c: Initial release of the cross-framework contracts package (private, build-time only).

  - `defineContract()` declares each component's contract as `props` (a map of axes such
    as `variants`, `sizes`, or `orientations` to their allowed option names), `defaults`
    (one option per axis), and `docs` (a description plus per-option copy). TypeScript
    ties `defaults` and `docs` to the exact options listed in `props`, so a stray or
    missing option is a compile error.
  - Covers the 16 components shared by both frameworks: `avatar`, `breadcrumb`, `button`,
    `card`, `checkbox`, `data-table`, `dropdown-menu`, `field`, `input`, `input-group`,
    `label`, `select`, `separator`, `sidebar`, `table`, `textarea`. Components without a
    variant/size axis (e.g. `data-table`) declare a docs-only contract.
  - `@surfnet/curve-react` and `@surfnet/curve-angular` each enforce a contract's `props`
    at compile time via `satisfies Record<AxisName, string>` on their `cva` calls, so a
    variant added to one framework and missed in the other fails `pnpm lint`.
  - Storybook stories import contracts directly to drive controls and autodocs;
    component source only imports the derived types. Stories are excluded from both
    packages' library builds, so none of it reaches a published `dist`.
