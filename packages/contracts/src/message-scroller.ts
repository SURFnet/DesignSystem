import { defineContract } from './define-contract.js';

export const messageScrollerContract = defineContract({
  docs: {
    description:
      'A scrollable conversation viewport that stays pinned to the newest message and shows a jump-to-end button when the reader scrolls away.',
  },
});
