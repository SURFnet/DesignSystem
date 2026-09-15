---
'@surfnet/curve-react': minor
---

Stop shipping Tailwind in `styles.css`. Published CSS now includes tokens, minimal base styles, semantic color utility classes (`text-primary`, `bg-muted`, etc.), and CSS Modules. Storybook uses plain `.storybook/story-chrome.css` for demo layout. Removed `class-variance-authority` and Tailwind devDependencies from the React package.
