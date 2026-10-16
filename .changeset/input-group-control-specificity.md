---
'@surfnet/curve-react': patch
---

Fix `InputGroupInput` / `InputGroupTextarea` showing their own border, radius and focus ring inside an `InputGroup` when the bundler emits the input stylesheet after the input-group one. The control overrides are now scoped under `.group` so they no longer depend on CSS order.
