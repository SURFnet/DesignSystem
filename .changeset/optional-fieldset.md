---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
---

Add `optional` to `FieldSet` / `hlmFieldSet`. The legend gets the "(optioneel)" suffix (change it with `optionalText` on the legend) and controls inside the fieldset no longer get `aria-required`.

Radios in a required radio group now each get the native `required` attribute, so screen readers announce "required" on every option. In an optional field or fieldset they don't.
