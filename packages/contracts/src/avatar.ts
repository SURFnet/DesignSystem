import { defineContract } from './define-contract.js';

export const avatarContract = defineContract({
  props: {
    sizes: ['sm', 'default', 'lg'],
  },
  defaults: {
    sizes: 'default',
  },
  docs: {
    description:
      'A small image representing a user or entity, with a text fallback when the image is unavailable.',
    sizes: {
      sm: 'Compact — dense lists and inline mentions.',
      default: 'Standard size for most contexts.',
      lg: 'Large — profile headers and prominent placements.',
    },
  },
});

export type AvatarSizeName = (typeof avatarContract.props.sizes)[number];
