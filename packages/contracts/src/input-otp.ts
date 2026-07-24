import { defineContract } from './define-contract.js';

export const inputOtpContract = defineContract({
  docs: {
    description: 'A one-time-password input split across individual character slots.',
  },
});
