import { defineContract } from './define-contract.js';

export const fieldContract = defineContract({
  props: {
    orientations: ['vertical', 'horizontal', 'responsive'],
    necessities: ['required', 'optional'],
  },
  defaults: {
    orientations: 'vertical',
    necessities: 'required',
  },
  docs: {
    description:
      'A form-field wrapper that lays out a label, control, description, and error message. Fields are required by default; mark the exceptions with `optional`.',
    orientations: {
      vertical: 'Label stacked above the control — the default.',
      horizontal: 'Label beside the control — e.g. a checkbox row.',
      responsive: 'Stacks on narrow containers, switches to horizontal when space allows.',
    },
    necessities: {
      required: 'The default. The control gets `aria-required="true"`; the label shows no marker.',
      optional:
        'The label gets an "(optioneel)" suffix and the control no `aria-required`. Validation stays with the app.',
    },
  },
});

export type FieldOrientationName = (typeof fieldContract.props.orientations)[number];
export type FieldNecessityName = (typeof fieldContract.props.necessities)[number];
