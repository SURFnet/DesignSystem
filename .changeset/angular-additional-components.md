---
'@surfnet/curve-angular': minor
---

Add 36 components to close the gap with the Figma component library: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `badge`, `button-group`, `calendar`, `carousel`, `combobox`, `command`, `context-menu`, `date-picker`, `dialog`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `tabs`, `toggle`, `toggle-group`, and `tooltip`.

- Every component has a `@surfnet/curve-contracts` entry and a Storybook story covering its full surface. Where a component exposes a styling axis, the input is typed from the contract so a stray `variant`/`size`/`orientation` value fails the type-check.
- `sheet`, `skeleton`, and `tooltip` were already vendored internally (as dependencies of `sidebar`) but not exported — they are now part of the public API.
- The newly vendored components use Phosphor icons instead of Spartan's default Lucide set, to match this package's existing icon convention.
- A few documented gaps remain where Spartan's primitives don't expose an identical surface (e.g. `scroll-area`'s orientation, `navigation-menu`'s `align`/`navOffset`) — noted in the component source rather than papered over.
