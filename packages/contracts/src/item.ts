import { defineContract } from './define-contract.js';

export const itemContract = defineContract({
  props: {
    variants: ['default', 'outline', 'muted'],
    sizes: ['default', 'sm', 'xs'],
    mediaVariants: ['default', 'icon', 'image'],
  },
  defaults: {
    variants: 'default',
    sizes: 'default',
    mediaVariants: 'default',
  },
  docs: {
    description:
      'A flexible row for lists of actions, settings, or content — media, title, description, and actions.',
    variants: {
      default: 'No border, transparent background.',
      outline: 'Bordered container.',
      muted: 'Subtle muted background, no border.',
    },
    sizes: {
      default: 'Standard padding and gaps.',
      sm: 'Compact padding and gaps.',
      xs: 'Extra compact — dense lists such as menus.',
    },
    mediaVariants: {
      default: 'No styling — media renders as-is.',
      icon: 'Rounded icon badge background.',
      image: 'Fixed square image thumbnail.',
    },
  },
});

export type ItemVariantName = (typeof itemContract.props.variants)[number];
export type ItemSizeName = (typeof itemContract.props.sizes)[number];
export type ItemMediaVariantName = (typeof itemContract.props.mediaVariants)[number];
