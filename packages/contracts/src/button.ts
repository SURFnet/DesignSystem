import { defineContract } from './define-contract.js';

export const buttonContract = defineContract({
  props: {
    variants: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    sizes: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
  },
  defaults: {
    variants: 'default',
    sizes: 'default',
  },
  docs: {
    description: 'Triggers an action or navigation. Renders as a native button element.',
    variants: {
      default: 'Primary brand fill — use for the single most important action on a page.',
      outline: 'Bordered, transparent fill — secondary actions beside a primary button.',
      secondary: 'Muted fill — general-purpose secondary action.',
      ghost: 'No background or border — tertiary actions and icon toolbars.',
      destructive: 'Danger tint — destructive or irreversible actions.',
      link: 'Looks like a hyperlink — inline or contextual navigation actions.',
    },
    sizes: {
      default: 'Standard height for most UI contexts.',
      xs: 'Extra-small — dense UIs, compact toolbars.',
      sm: 'Small — secondary controls, filter bars.',
      lg: 'Large — prominent calls to action.',
      icon: 'Square icon-only button at the default size.',
      'icon-xs': 'Square icon-only button at extra-small size.',
      'icon-sm': 'Square icon-only button at small size.',
      'icon-lg': 'Square icon-only button at large size.',
    },
  },
});

export type ButtonVariantName = (typeof buttonContract.props.variants)[number];
export type ButtonSizeName = (typeof buttonContract.props.sizes)[number];
