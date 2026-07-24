import { defineContract } from './define-contract.js';

export const carouselContract = defineContract({
  props: {
    orientations: ['horizontal', 'vertical'],
  },
  defaults: {
    orientations: 'horizontal',
  },
  docs: {
    description: 'A carousel of slides that can be navigated with buttons or gestures.',
    orientations: {
      horizontal: 'Slides pan left/right — the default.',
      vertical: 'Slides pan up/down.',
    },
  },
});

export type CarouselOrientationName = (typeof carouselContract.props.orientations)[number];
