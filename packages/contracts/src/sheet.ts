import { defineContract } from './define-contract.js';

export const sheetContract = defineContract({
  props: {
    sides: ['top', 'right', 'bottom', 'left'],
  },
  defaults: {
    sides: 'right',
  },
  docs: {
    description:
      'A panel that slides in from an edge of the screen, layered above the page content.',
    sides: {
      top: 'Slides down from the top edge.',
      right: 'Slides in from the right edge.',
      bottom: 'Slides up from the bottom edge.',
      left: 'Slides in from the left edge.',
    },
  },
});

export type SheetSideName = (typeof sheetContract.props.sides)[number];
