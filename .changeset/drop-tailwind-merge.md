---
'@surfnet/curve-react': patch
'@surfnet/curve-angular': patch
---

Remove the `tailwind-merge` dependency. `cn()` (React) and `hlm()` (Angular) now only join class names with `clsx`; they no longer drop conflicting Tailwind utilities (e.g. `p-2 p-4` stays as-is). Components don't use Tailwind classes anymore, so component styling is unaffected.
