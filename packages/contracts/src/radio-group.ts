import { defineContract } from './define-contract.js';

export const radioGroupContract = defineContract({
  docs: {
    description: 'A set of mutually exclusive radio options, only one of which can be selected.',
  },
});
