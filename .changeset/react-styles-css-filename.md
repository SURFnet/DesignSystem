---
'@surfnet/curve-react': patch
---

Rename the compiled stylesheet from `curve-react.css` to `styles.css` in `dist`, matching
`@surfnet/curve-angular`. The public `./styles.css` export path is unchanged, so consumers
importing it as documented are unaffected; only code importing the internal filename
directly needs to switch to the `styles.css` export.
