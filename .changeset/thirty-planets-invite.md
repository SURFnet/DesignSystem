---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
---

Add 36 components to close the gap with the Figma component library, in both packages: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `badge`, `button-group`, `calendar`, `carousel`, `combobox`, `command`, `context-menu`, `date-picker`, `dialog`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `tabs`, `toggle`, `toggle-group`, and `tooltip`. `chart` and `drawer` are deferred until Spartan ships an Angular equivalent — see ADR-019 in `docs/decision-log.md`.

- Every component has a `@surfnet/curve-contracts` entry (description-only, or with a variant/size/orientation axis enforced via `satisfies Record<...>` on both frameworks) and a Storybook story covering its full surface.
- `sheet`, `skeleton`, and `tooltip` were already vendored internally in `@surfnet/curve-angular` (as dependencies of `sidebar`) but not exported — they're now part of the public API.
- A handful of documented gaps remain where the two frameworks' vendored primitives don't expose identical surface (e.g. `scroll-area`'s orientation, `navigation-menu`'s per-trigger `align`) — noted in the component source rather than papered over.
