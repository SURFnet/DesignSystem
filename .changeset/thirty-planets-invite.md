---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
---

Add 38 components to close the gap with the Figma component library: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `badge`, `button-group`, `calendar`, `carousel`, `combobox`, `command`, `context-menu`, `date-picker`, `dialog`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `tabs`, `toggle`, `toggle-group`, and `tooltip` in both packages, plus `chart` and `drawer` in `@surfnet/curve-react` only (no Spartan equivalent yet).

- Every component has a `@surfnet/curve-contracts` entry (description-only, or with a variant/size/orientation axis enforced via `satisfies Record<...>` on both frameworks) and a Storybook story covering its full surface.
- `sheet`, `skeleton`, and `tooltip` were already vendored internally in `@surfnet/curve-angular` (as dependencies of `sidebar`) but not exported — they're now part of the public API.
- A handful of documented gaps remain where the two frameworks' vendored primitives don't expose identical surface (e.g. `scroll-area`'s orientation, `navigation-menu`'s per-trigger `align`) — noted in the component source rather than papered over.
