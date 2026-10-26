---
'@surfnet/curve-angular': patch
---

`forceInvalid` now also sets `aria-invalid="true"` on the native control, so the visual and accessible invalid states stay together. This applies to `hlmInput`, `hlmTextarea`, `hlm-native-select`, and the inputs of `hlm-date-picker-input` and `hlm-combobox-input`. An explicit `aria-invalid` still takes precedence. You still link the error message yourself with `aria-describedby`.
