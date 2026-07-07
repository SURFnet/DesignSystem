---
'@surfnet/curve-angular': minor
---

Initial release of the Angular component library.

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
