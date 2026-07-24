import { defineContract } from './define-contract.js';

export const toggleGroupContract = defineContract({
  props: {
    orientations: ['horizontal', 'vertical'],
  },
  defaults: {
    orientations: 'horizontal',
  },
  docs: {
    description:
      'A set of two-state toggle buttons where one or more can be pressed, sharing a common variant and size.',
    orientations: {
      horizontal: 'Buttons laid out in a row.',
      vertical: 'Buttons stacked in a column.',
    },
  },
});

export type ToggleGroupOrientationName = (typeof toggleGroupContract.props.orientations)[number];
