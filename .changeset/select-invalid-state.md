---
'@surfnet/curve-angular': patch
---

Select now shows its invalid state after validation fails: the trigger marks its form control as touched on blur (not only when the popup closes), so tabbing past an empty required select shows the error like other fields. `forceInvalid` on `hlm-select-trigger` now also sets `aria-invalid="true"`, and a new `aria-invalid` input overrides it.
