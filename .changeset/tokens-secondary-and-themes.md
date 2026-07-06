---
'@surfnet/curve-tokens': minor
---

Resync design tokens from Figma. The `secondary` color is now a distinct tint per
theme (light in light mode, darker shade in dark mode) instead of duplicating
`primary` — e.g. the default theme's `--secondary` goes from `#064bcb` to `#d5e2fa`,
so secondary buttons render pale blue as designed. Adds a new `link` color token to
every theme, adds the `surf-blue-yellow` theme, and removes the `studielink-aii` theme.
