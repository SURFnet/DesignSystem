# @surfnet/curve-angular

Angular components for Curve, SURF's design system. Built on [Spartan](https://spartan.ng)
(`brain` primitives, `helm` styles), styled with Tailwind CSS v4.

## Installation

```bash
npm install @surfnet/curve-angular
```

Peer dependencies: `@angular/common` ^22, `@angular/core` ^22, `@ng-icons/core` ^33, `rxjs` ^7.8.

## Usage

Import the compiled stylesheet once in your global styles, then import each component where
it's used.

```css
/* styles.css */
@import '@surfnet/curve-angular/styles.css';
```

```ts
import { Component } from '@angular/core';
import { HlmButtonImports } from '@surfnet/curve-angular';

@Component({
  selector: 'app-example',
  imports: [HlmButtonImports],
  template: `<button hlmBtn variant="outline">Save changes</button>`,
})
export class ExampleComponent {}
```

`styles.css` includes the design tokens from `@surfnet/curve-tokens`, the Geist variable font
files, and every component's utility classes. No extra Tailwind setup is needed to use the
components as shipped.

Browse the full set of components, variants, sizes, and states in
[Storybook](https://surfnet.github.io/DesignSystem/angular/).

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
