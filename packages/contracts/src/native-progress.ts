import { defineContract } from './define-contract.js';

export const nativeProgressContract = defineContract({
  docs: {
    description:
      'A styled native <progress> element. Prefer this over the Base UI Progress when you only need a simple determinate bar without custom labels.',
  },
});
