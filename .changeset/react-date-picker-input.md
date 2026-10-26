---
'@surfnet/curve-react': minor
---

Add `DatePickerInput`: a text input with a calendar button, for picking a date in a form. Type a date or pick one from the calendar (Arrow Down opens it). Unlike the button-based `DatePicker`, the label points at a real `<input>`, so screen readers hear the label as the name and the chosen date as the value, and `aria-invalid` / `aria-describedby` work as on any other field. `id` is required so a `<FieldLabel htmlFor>` can always be linked. When the typed text isn't a valid date, the input sets `aria-invalid="true"` by itself (checked when the user leaves the field or presses Enter), so it is announced and styled as invalid.
