---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
'@surfnet/curve-contracts': minor
---

Add `info`, `success`, `warning`, and `danger` signal-color variants to the Alert component, each styled as a subtle-tinted banner (`bg-<name>-subtle` / `text-<name>-subtle-foreground`).

**Breaking:** the `destructive` variant is renamed to `danger`. Replace `variant="destructive"` with `variant="danger"` on `Alert` (Button, Badge, and other components are unaffected — their `destructive` variant is unchanged).

The new signal tokens (`info`, `success`, `warning`, `danger`, each with `-hover`, `-foreground`, `-subtle`, `-subtle-hover`, `-subtle-foreground`) are now mapped to Tailwind `--color-*` utilities in both packages, so `bg-*` / `text-*` utilities for these colors are available for other components too.
