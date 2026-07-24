import { defineContract } from './define-contract.js';

export const resizableContract = defineContract({
  props: {
    directions: ['horizontal', 'vertical'],
  },
  defaults: {
    directions: 'horizontal',
  },
  docs: {
    description: 'A resizable panel group with draggable handles between panels.',
    directions: {
      horizontal: 'Panels laid out side by side — the default.',
      vertical: 'Panels stacked top to bottom.',
    },
  },
});

export type ResizableDirectionName = (typeof resizableContract.props.directions)[number];
