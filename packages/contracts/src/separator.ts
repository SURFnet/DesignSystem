import { defineContract } from './define-contract.js';

export const separatorContract = defineContract({
  props: {
    orientations: ['horizontal', 'vertical'],
  },
  defaults: {
    orientations: 'horizontal',
  },
  docs: {
    description: 'A thin rule that visually or semantically divides content.',
    orientations: {
      horizontal: 'A full-width rule between stacked blocks.',
      vertical: 'A full-height rule between inline items.',
    },
  },
});

export type SeparatorOrientationName = (typeof separatorContract.props.orientations)[number];
