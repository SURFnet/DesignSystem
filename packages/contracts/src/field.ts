import { defineContract } from './define-contract.js';

export const fieldContract = defineContract({
  props: {
    orientations: ['vertical', 'horizontal', 'responsive'],
  },
  defaults: {
    orientations: 'vertical',
  },
  docs: {
    description:
      'A form-field wrapper that lays out a label, control, description, and error message.',
    orientations: {
      vertical: 'Label stacked above the control — the default.',
      horizontal: 'Label beside the control — e.g. a checkbox row.',
      responsive: 'Stacks on narrow containers, switches to horizontal when space allows.',
    },
  },
});

export type FieldOrientationName = (typeof fieldContract.props.orientations)[number];
