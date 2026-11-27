---
'@surfnet/curve-react': major
'@surfnet/curve-angular': major
'@surfnet/curve-microcopy': major
---

Built-in texts now come in English and Dutch, from `@surfnet/curve-microcopy`, and English is the default everywhere.

- **Breaking:** texts that were Dutch are now English by default: the "(optioneel)" label suffix (React and Angular) and Angular's automatic field error messages. For Dutch, add `<CurveMicrocopyProvider locale="nl">` around your React app or `provideCurveMicrocopy('nl')` to your Angular app config.
- New: `CurveMicrocopyProvider` and `useMicrocopy()` (React), `provideCurveMicrocopy()`, `injectMicrocopy()` and `CURVE_MICROCOPY` (Angular). Pass `messages` to replace single texts by key; a prop or input on a component still wins.
- React components that read texts are now client components (`'use client'`).
- React's `DatePickerInput` calendar button reads "Open calendar" (was "Select date"), the same as Angular.
- Angular: `HLM_FIELD_ERROR_MESSAGES` now only holds your own messages from `provideHlmFieldErrorMessages`; Curve's own messages follow the chosen language.

See Storybook: Foundations › Microcopy.
