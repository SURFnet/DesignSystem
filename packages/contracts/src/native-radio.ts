import { defineContract } from './define-contract.js';

export const nativeRadioContract = defineContract({
  docs: {
    description:
      'A styled native <input type="radio">. Use inside NativeFieldset or with a shared name; prefer Radio Group for roving focus and keyboard UX.',
  },
});
