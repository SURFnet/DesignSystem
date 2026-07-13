import { defineContract } from './define-contract.js';

export const buttonGroupContract = defineContract({
  props: {
    orientations: ['horizontal', 'vertical'],
  },
  defaults: {
    orientations: 'horizontal',
  },
  docs: {
    description: 'Groups related buttons together with connected borders.',
    orientations: {
      horizontal: 'Buttons laid out in a row — the default.',
      vertical: 'Buttons stacked in a column.',
    },
  },
});

export type ButtonGroupOrientationName = (typeof buttonGroupContract.props.orientations)[number];
