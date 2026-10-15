---
'@surfnet/curve-react': patch
'@surfnet/curve-angular': patch
---

Placeholder text now uses the `--placeholder` token instead of `--muted-foreground`: Combobox, Date Picker, Input, Input Group, Select and Textarea. The base `::placeholder` style in the package CSS uses `--placeholder` too, so plain `<input>` and `<textarea>` elements match the components.
