---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
---

Form fields are now required by default. Input, Textarea, NativeSelect, Select, Checkbox, Switch, RadioGroup and InputOTP get `aria-required="true"` unless they sit in an optional field, so screen readers announce them as required. Mark the exceptions with `<Field optional>` (React) or `<div hlmField optional>` (Angular): the label then shows an "(optioneel)" suffix (override with `optionalText`) and the control drops `aria-required`. Input and Textarea also accept `optional` themselves, for controls outside a Field. An explicit `aria-required` on a control still wins. This only affects what is announced, not validation.

**Action needed:** add `optional` to the Fields in your forms that are not required, or they will be announced as required.
