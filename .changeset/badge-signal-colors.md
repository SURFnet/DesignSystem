---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
'@surfnet/curve-contracts': minor
---

Add `info`, `success`, `warning`, and `danger` signal-color variants to the Badge component, styled as a subtle tint (`bg-<name>-subtle` / `text-<name>-subtle-foreground`), matching the Alert component's signal variants and the Figma spec.

**Breaking:** the `destructive` variant is renamed to `danger`. Replace `variant="destructive"` with `variant="danger"` on `Badge` (Alert was already renamed in a previous release; other components are unaffected).
