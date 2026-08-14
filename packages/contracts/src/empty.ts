import { defineContract } from './define-contract.js';

export const emptyContract = defineContract({
  props: {
    variants: ['default', 'icon'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'A placeholder for empty states — no data, no results, or an error.',
    variants: {
      default: 'Plain media wrapper with no background — for a custom illustration.',
      icon: 'Rounded icon badge background for an icon or short glyph.',
    },
  },
});

export type EmptyMediaVariantName = (typeof emptyContract.props.variants)[number];
