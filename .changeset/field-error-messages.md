---
'@surfnet/curve-angular': minor
---

Form fields show and announce their validation errors consistently.

- An empty `<hlm-field-error />` now shows the messages from the control's errors: a string error as-is (e.g. a JsonForms or server message), otherwise a message for the validator key. Several errors show as a list, as in React's `FieldError`. Curve ships Dutch defaults for Angular's built-in validators; override or add messages app-wide with `provideHlmFieldErrorMessages({ ... })`. Text you put inside `hlm-field-error` still wins.
- `hlm-field-error` shows a warning icon, so an error isn't communicated by colour alone.
- The field's error is now linked (`aria-describedby`) and `aria-invalid` is set on the focusable element of Checkbox, Switch, NativeSelect, Slider and InputOTP. NativeSelect gains an `aria-describedby` input.
- InputOTP now reports its form control to `hlmField`, so the field shows its error and the slots their invalid styling.
