---
'@surfnet/curve-react': patch
'@surfnet/curve-angular': patch
---

Fix Alert's `info`/`success`/`warning`/`danger` variants: title and description text now use the neutral `foreground`/`muted-foreground` tokens instead of the signal color, per design review. Only the icon and the tinted background carry the signal color now.
