---
'@surfnet/curve-react': minor
---

Add 36 components to close the gap with the Figma component library: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `badge`, `button-group`, `calendar`, `carousel`, `combobox`, `command`, `context-menu`, `date-picker`, `dialog`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `tabs`, `toggle`, `toggle-group`, and `tooltip`.

- Every component has a `@surfnet/curve-contracts` entry and a Storybook story covering its full surface. Where a component exposes a styling axis, the prop is typed from the contract so a stray `variant`/`size`/`orientation`/`side` value fails the type-check.
- `date-picker` is hand-composed from `Calendar` + `Popover`, since shadcn ships no registry item for it.
- `chart` and `drawer` are deferred until there is an Angular equivalent, to keep framework parity — see ADR-019 in `docs/decision-log.md`.
