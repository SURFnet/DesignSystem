---
'@surfnet/curve-react': patch
'@surfnet/curve-angular': patch
---

`Field` / `hlmField` no longer renders `role="group"`. A single field isn't a group, and inside a choice-card label the role caused the radio or checkbox to lose its accessible name (axe "Form elements must have labels"). To group related fields, use `FieldSet` / `fieldset[hlmFieldSet]`.
