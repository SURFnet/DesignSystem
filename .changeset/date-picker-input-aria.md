---
'@surfnet/curve-angular': patch
---

Stop `hlmInput`, `hlmTextarea` and `hlmRadioGroup` from dropping consumer ARIA attributes:

- `aria-describedby` is now merged with the ids from `hlmField` instead of being overwritten.
- `aria-invalid` is now accepted as an override of the form control's invalid state (as Spartan's combobox does). Without it, the control state still drives the attribute.

`hlm-date-picker-input` now forwards `aria-label`, `aria-labelledby`, `aria-describedby` and `aria-invalid` to its inner `<input>`.
