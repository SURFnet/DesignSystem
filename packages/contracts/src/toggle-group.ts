import { defineContract } from './define-contract.js';

export const toggleGroupContract = defineContract({
  docs: {
    description:
      'A set of two-state toggle buttons where one or more can be pressed, sharing a common variant and size.',
  },
});
