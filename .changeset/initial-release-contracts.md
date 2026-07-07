---
'@surfnet/curve-contracts': major
---

Initial release of the cross-framework contracts package (private, build-time only).

- A `defineContract()` helper declares each component's contract as props/defaults/docs.
  `props` is an arbitrary map of axes (e.g. `variants`, `sizes`, `orientations`) to
  their allowed option names, `defaults` picks one option per axis, and `docs` carries
  a description plus per-option copy. TypeScript rejects a `defaults` value absent from
  its `props` array, and a `docs` entry that misses or adds an option, as compile
  errors instead of letting them drift silently.
- Covers the 16 components shared by both frameworks: `avatar`, `breadcrumb`, `button`,
  `card`, `checkbox`, `data-table`, `dropdown-menu`, `field`, `input`, `input-group`,
  `label`, `select`, `separator`, `sidebar`, `table`, `textarea`. Components without a
  variant/size axis (e.g. `data-table`, sidebar's outer shell) declare a docs-only
  contract; `sidebar` additionally exports a `sidebarMenuButtonContract` for its
  variant/size axes.
- `@surfnet/curve-react` and `@surfnet/curve-angular` each enforce a contract's `props`
  at compile time via `satisfies Record<AxisName, string>` on their `cva` calls, so a
  variant added to one framework and missed in the other fails `pnpm lint`.
- Contracts carry real runtime values (`defaults`, `docs`), not just types — Storybook
  stories import them directly to drive controls and autodocs. Component source only
  ever `import type`s the derived names, and stories are excluded from both packages'
  library builds, so none of it, types or values, reaches a published `dist`.
