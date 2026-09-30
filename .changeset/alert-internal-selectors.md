---
'@surfnet/curve-react': patch
'@surfnet/curve-angular': patch
---

Alert: internal styles now target the component's own classes instead of `data-slot` attributes. The `data-slot` attributes stay on every part as a styling hook for consumers. In React, the title colour on the info/success/warning/danger variants now applies only to a title that is a direct child of the alert, matching Angular.
