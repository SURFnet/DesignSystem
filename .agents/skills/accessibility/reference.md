# Web accessibility reference

Detailed rules for semantic HTML, keyboard access, and accessible names. The agent applies these
when writing or reviewing UI (React, Angular, HTML, CSS).

Prefer native HTML before ARIA. Do not "fix" accessibility with `role="button"` + `tabindex="0"` +
a click handler on a `div` when a native `<button>` or `<a href>` works.

## Baseline workflow

When changing UI, run this in order:

1. **Semantics** — correct HTML element for the job (see Link vs button).
2. **Names** — every control has a visible label or an accessible name.
3. **Structure** — heading outline is a single logical tree (one `h1`, no skipped levels).
4. **Keyboard** — Tab reaches every interactive control; focus is always visible.
5. **Skip links** — repeated chrome can be skipped; targets are focusable.

When reviewing, report findings as:

- **Must fix** — keyboard trap, missing name, wrong element, outline removed, skipped heading level
- **Should fix** — missing hover/focus styles, `cursor: pointer` on a non-control, skip link missing
- **Note** — improvement, not a blocker

## Link vs button

| User intent                                                                             | Element                                                            |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Go to another page, view, or URL (including in-app routes)                              | `<a href="...">`                                                   |
| Do something on this page: open a panel, open a dialog, submit, toggle, delete, capture | `<button type="button">` or `<button type="submit">` inside a form |

Rules:

- In-app navigation is still a link. Calling the router from a `<div onClick>` / `(click)` / `@click` or from a `<button>` is wrong when the destination is a route.
- The router helper must still render a real `<a href>`:
  - **React:** `<Link>` / `<NavLink>` (React Router, Next.js). Do not replace the anchor with a `<span>` or `<div>`.
  - **Angular:** `routerLink` on an `<a>`, not on a `<div>` or `<button>`.
- Mark the current page with `aria-current="page"` on the **link**, not on a wrapper.
- A button that looks like a link is still a `<button>`.
- A link that looks like a button is still an `<a href>`.

## Semantic HTML

Use native elements before ARIA:

- Headings (`h1`–`h6`) for titles, not bold `div`s
- `<button>` / `<a href>` for interaction, not clickable `div`/`span`
- `<label>` + form control, not placeholder-as-label
- `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>` for landmarks
- `<ul>`/`<ol>` for lists of links or findings
- Native `<dialog>`, or the design-system Dialog/Sheet primitive (keep its Title)
- Decorative images: `alt=""` and `aria-hidden="true"`

If you feel you must set `cursor: pointer` on a custom element, stop. Native `<a>` and `<button>` are already interactive. `cursor: pointer` on a `div`/`span`/`li` is a smell that the wrong element was used.

Allowed exceptions: `label` wrapping a control, `summary` in `<details>`, and components whose root is already a native control (design-system Button, etc.).

When the project has a design system (for example Curve), use its components instead of restyling generic elements. They already provide roles, keyboard behaviour, and focus rings.

## Headings

- Exactly one `h1` per view.
- Do not skip levels (`h1` → `h3`).
- Heading level follows **document structure**, not font size. Style with CSS.
- Use a visually hidden heading (`.sr-only` / `sr-only`) when a visual heading is missing but the section needs one (for example a sidebar labelled only by an icon).

Verify in Chrome DevTools: **Elements → Accessibility pane → Headings**. The map must read as a table of contents.

## Labels and accessible names

Every `input`, `select`, `textarea`, `button`, and `a` needs an accessible name.

Preferred order:

1. Visible `<label for="id">` matching the control's `id` (or wrap the control in `<label>`)
2. Visible text inside `<button>` / `<a>`
3. `aria-labelledby` pointing at existing visible text
4. `aria-label` only when a visible label would be redundant (icon-only controls)

Check in DevTools: **Elements → Accessibility pane → Name**. If Name is missing, the control is unnamed.

Do not rely on `placeholder` as the only name. Use a visually hidden label when the design has no visible label.

Translate user-facing strings, including `aria-label` and skip-link text.

## Keyboard

After building a view, walk it with **Tab** (and **Shift+Tab**):

- Every link, button, and input is reachable
- Order matches visual order
- No surprise tab stops on non-interactive text
- Focus is never lost when opening/closing a panel or dialog
- `tabindex` > 0 is forbidden
- `tabindex="-1"` is only for programmatic focus targets (skip-link targets, dialogs)

## Hover and focus

Every interactive element needs a `:hover` style **and** a `:focus` / `:focus-visible` style.

- **Never** remove the outline (`outline: none` / `outline: 0`) unless you replace it with an equally visible focus indicator.
- Prefer `:focus-visible` when the ring should appear for keyboard focus, not mouse clicks.
- `:focus` matches **any** focus (mouse, keyboard, script). `:focus-visible` matches when the browser judges a ring is needed (typically keyboard).
- If you use Curve, keep the component `focus-visible:ring-*` classes. Do not strip them to "clean up" the design.

## Skip links

Skip links are the first focusable links on a page. They let keyboard users jump past repeated chrome (sidebar, nav) to main content.

```html
<a class="skip-link" href="#main">Skip to main content</a>
<!-- site chrome -->
<main id="main" tabindex="-1">
  <!-- page content -->
</main>
```

Rules:

- Put skip links near the start of the document (or the start of the sidebar/nav).
- `href` must point at a real `id`.
- The target must be focusable (`tabindex="-1"` on `<main>` / footer if it is not natively focusable).
- The link is visually hidden until focused — never `display: none` (that removes it from the tab order).

## Live status

Do not fail silently with a visual-only error. Announce status and errors with `aria-live` (or `role="status"` / `role="alert"`), or the design-system equivalent.

## Dialogs

Use a real dialog primitive (native `<dialog>`, or the design-system Dialog/Sheet). Always include a visible title; if the design hides it, keep the title in the DOM and hide it visually. Focus must move into the dialog when it opens and restore when it closes. Escape and a close control are required.
