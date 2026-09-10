# @surfnet/curve-contracts

## 0.4.1

No changes in this release.

## 0.4.0

### Minor Changes

- eaf158a: Add `info`, `success`, `warning`, and `danger` signal-color variants to the Alert component, each styled as a subtle-tinted banner (`bg-<name>-subtle` / `text-<name>-subtle-foreground`).

  **Breaking:** the `destructive` variant is renamed to `danger`. Replace `variant="destructive"` with `variant="danger"` on `Alert` (Button, Badge, and other components are unaffected — their `destructive` variant is unchanged).

  The new signal tokens (`info`, `success`, `warning`, `danger`, each with `-hover`, `-foreground`, `-subtle`, `-subtle-hover`, `-subtle-foreground`) are now mapped to Tailwind `--color-*` utilities in both packages, so `bg-*` / `text-*` utilities for these colors are available for other components too.

## 0.3.0

### Minor Changes

- 59d72e3: Align the Button with the updated Figma design.

  **Breaking:** the `xs` size is removed from the Button. Replace `size="xs"` with `size="sm"`. The icon-only `icon-xs` size is unchanged.

  The `destructive` variant is now a solid `--destructive` fill with `--destructive-foreground` text instead of a light red tint, and its hover state uses the same `/90` alpha layer as the other filled variants. The `outline` variant loses its `shadow-xs`, and the `default` and `destructive` variants keep a transparent border on hover.

  `--destructive-foreground` is now mapped to the `destructive-foreground` Tailwind color in both packages, so `bg-*` / `text-*` utilities can use it.

- 02d3c7c: Added multiple new components

## 0.2.2

## 0.2.1

## 0.2.0

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
