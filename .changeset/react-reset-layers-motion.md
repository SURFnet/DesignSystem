---
'@surfnet/curve-react': minor
---

`styles.css` ships Tailwind's preflight reset again (vendored, no Tailwind build needed). All package CSS now sits in cascade layers (`base`, `components`, `utilities`), so your own CSS and Tailwind utilities — including `className` on components — override component styles again. Enter/exit animations for dialogs, sheets, popovers, tooltips, hover cards, menus, selects, comboboxes, the accordion and the navigation menu are back, and only play when the user has no reduced-motion preference. Fixes: Input placeholder colour, Badge link-variant colour and link-badge hover, and Item group spacing when it contains a small Button.
