---
'@surfnet/curve-tokens': minor
---

Initial release of the shared design tokens package.

- DTCG JSON source of truth (`packages/tokens/src/tokens*.json`), built with Style
  Dictionary into `tokens.css` (`:root`/`.dark` custom properties) and a typed TS
  token map (`dist/index.{js,d.ts}`).
- 12 additional themes beyond the default (`groenvermogen-nkph2`, `shadcn-default`,
  `surf-blue-purple`, `surf-blue-turquoise`, `surf-blue-yellow`, `surf-green`,
  `surf-orange`, `surf-orange-turquoise`, `surf-pilot`, `surf-purple`,
  `surf-purple-orange`, `surf-yellow`), each with a light and dark variant, selected
  by adding a `theme-<class>` class alongside `dark` on `<html>`.
- `pnpm sync:figma` keeps the JSON source in sync with the Figma Variables API.
- Consumed by both `@surfnet/curve-react` and `@surfnet/curve-angular`, which import
  this CSS into their own compiled `styles.css`.
