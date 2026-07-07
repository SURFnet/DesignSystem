---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
---

The `link` button variant now uses the dedicated `--link` design token instead of
`--primary`, so link text picks up the theme- and mode-specific link colour. Exposes a
matching `text-link` (and `bg-link` / `border-link`) utility via the `--color-link` theme
mapping. Applied to both the React and Angular buttons so they stay in parity.
