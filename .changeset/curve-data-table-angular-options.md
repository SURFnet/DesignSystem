---
'@surfnet/curve-angular': major
---

Curve data table: add an `options` argument (`{ sortable, align }`) to the string and action columns, and a `CurveDataTableCustomColumn` that renders your own component in each cell. Breaking: `CurveDataTableStringColumn` no longer takes `sortable` as a boolean 4th argument; pass `{ sortable: true }` instead.
