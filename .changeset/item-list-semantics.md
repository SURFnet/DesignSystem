---
'@surfnet/curve-react': patch
---

`Item` now renders an `<li>` by default when placed inside an `ItemGroup`, fixing the axe `list` violation (`<ul>` with `<div>` children). Outside a group it still renders a `<div>`, and an explicit `render` prop still wins.
