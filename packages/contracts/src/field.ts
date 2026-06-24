export const fieldContract = {
  orientations: ['vertical', 'horizontal', 'responsive'],
  defaultOrientation: 'vertical',
  description:
    'A form-field wrapper that lays out a label, control, description, and error message.',
  orientationDocs: {
    vertical: 'Label stacked above the control — the default.',
    horizontal: 'Label beside the control — e.g. a checkbox row.',
    responsive: 'Stacks on narrow containers, switches to horizontal when space allows.',
  },
} as const;

export type FieldOrientationName = (typeof fieldContract.orientations)[number];
