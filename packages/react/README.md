# @surfnet/curve-react

React components for Curve, SURF's design system. Built on [shadcn/ui](https://ui.shadcn.com)
with [Base UI](https://base-ui.com) primitives, styled with Tailwind CSS v4.

## Installation

```bash
npm install @surfnet/curve-react
```

Peer dependencies: `react` ^19, `react-dom` ^19, `@phosphor-icons/react` ^2.

## Usage

Import the compiled stylesheet once, then import components from the package root.

```tsx
import '@surfnet/curve-react/styles.css';
import { Button } from '@surfnet/curve-react';

export function Example() {
  return <Button variant="outline">Save changes</Button>;
}
```

`styles.css` includes Tailwind's preflight, the design tokens from `@surfnet/curve-tokens`, and
every component's utility classes. No extra Tailwind setup is needed to use the components as
shipped. If your app also builds its own Tailwind utilities, import Tailwind's `theme` and
`utilities` layers only (skip `preflight`, already covered) to avoid a duplicate base reset.

Browse the full set of components, variants, sizes, and states in
[Storybook](https://surfnet.github.io/DesignSystem/react/).

## Theming

Colors and other design tokens come from `@surfnet/curve-tokens` and are baked into
`styles.css`. Switch theme or color mode by adding a class to `<html>`:

```html
<html class="dark theme-surf-green"></html>
```

`dark` toggles dark mode; `theme-<name>` selects one of the design system's color themes. Omit
both for the default light theme.

## Source

Part of the [Curve](https://github.com/SURFnet/DesignSystem) monorepo, which also holds other
related packages and contribution docs.
