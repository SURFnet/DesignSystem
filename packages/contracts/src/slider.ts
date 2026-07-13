import { defineContract } from './define-contract.js';

export const sliderContract = defineContract({
  props: {
    orientations: ['horizontal', 'vertical'],
  },
  defaults: {
    orientations: 'horizontal',
  },
  docs: {
    description:
      'An input for selecting a numeric value (or range) by dragging a thumb along a track.',
    orientations: {
      horizontal: 'Track runs left to right — the default.',
      vertical: 'Track runs bottom to top.',
    },
  },
});

export type SliderOrientationName = (typeof sliderContract.props.orientations)[number];
