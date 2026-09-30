---
'@surfnet/curve-angular': minor
---

All components are now styled with plain CSS (`curve-*` classes, one stylesheet per component) instead of Tailwind utility classes; they look the same. What changes for apps:

- `@surfnet/curve-angular/styles.css` no longer contains Tailwind. It ships the tokens, a reset (Tailwind's preflight), base styles, the component styles, semantic colour classes (`text-muted-foreground`, `bg-primary`, …) and `.sr-only`. If your templates relied on other Tailwind utilities that happened to be in the package CSS (`flex`, `gap-4`, …), add Tailwind to your app (see `apps/angular-app/src/_globals.css`).
- The CSS uses cascade layers (`theme, base, …, components, utilities`). Your own CSS and Tailwind utilities (imported with `layer(utilities)`, or unlayered) override component styles, e.g. `class="w-56"` on `hlm-dropdown-menu`.
- `class-variance-authority` is no longer a dependency. `buttonVariants()`, `toggleVariants()`, `listVariants()` and `tooltipPositionVariants()` return the `curve-*` classes; `ButtonVariants`, `ToggleVariants`, `BadgeVariants`, `AlertVariants`, `ItemVariants`, `FieldVariants` and similar are now plain `{ variant?, size? }` types.
- Enter/exit animations (dialogs, sheets, popovers, menus, tooltips, hover cards, navigation menu, accordion) only play when the user has no reduced-motion preference. Select and combobox popups now animate too.
