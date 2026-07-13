import { defineContract } from './define-contract.js';

export const alertDialogContract = defineContract({
  docs: {
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
});
