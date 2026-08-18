---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
'@surfnet/curve-contracts': minor
---

Align the Button with the updated Figma design.

**Breaking:** the `xs` size is removed from the Button. Replace `size="xs"` with `size="sm"`. The icon-only `icon-xs` size is unchanged.

The `destructive` variant is now a solid `--destructive` fill with `--destructive-foreground` text instead of a light red tint, and its hover state uses the same `/90` alpha layer as the other filled variants. The `outline` variant loses its `shadow-xs`, and the `default` and `destructive` variants keep a transparent border on hover.

`--destructive-foreground` is now mapped to the `destructive-foreground` Tailwind color in both packages, so `bg-*` / `text-*` utilities can use it.
