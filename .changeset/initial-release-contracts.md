---
'@surfnet/curve-contracts': major
---

Initial release of the cross-framework contracts package (private, build-time only).

- `as const` specs declaring the canonical variant names, size names, defaults, and
  docs for the 16 components shared by both frameworks: `avatar`, `breadcrumb`,
  `button`, `card`, `checkbox`, `data-table`, `dropdown-menu`, `field`, `input`,
  `input-group`, `label`, `select`, `separator`, `sidebar`, `table`, `textarea`.
- `@surfnet/curve-react` and `@surfnet/curve-angular` each enforce these specs at
  compile time via `satisfies Record<VariantName, string>` on their `cva` calls, so a
  variant added to one framework and missed in the other fails `pnpm lint`.
- Types only, erased at compile time; never present in a published `dist`.
