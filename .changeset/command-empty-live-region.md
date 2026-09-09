---
'@surfnet/curve-angular': patch
'@surfnet/curve-react': patch
---

Keep Command empty state mounted in the DOM and announce it with `aria-live="polite"` and `aria-atomic`. Use `role="option"` (`aria-disabled`, `aria-selected="false"`) so the empty message is a valid listbox child, and mark separators as presentational so listboxes only expose `option` / `group` children.
