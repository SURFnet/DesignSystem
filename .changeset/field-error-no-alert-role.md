---
'@surfnet/curve-react': patch
'@surfnet/curve-angular': patch
---

`FieldError` (React) and `hlm-field-error` (Angular) no longer have `role="alert"`. With several invalid fields, each error interrupted the screen reader at once. Show an error summary above the form and move focus to it after a failed submit instead — see "Formulieren bouwen" in the Curve docs. In React, link each error to its control with `aria-describedby`; in Angular `hlmField` already does this.
