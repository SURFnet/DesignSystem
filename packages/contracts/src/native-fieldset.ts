import { defineContract } from './define-contract.js';

export const nativeFieldsetContract = defineContract({
  docs: {
    description:
      'Groups related form controls with a native <fieldset> and <legend>. Prefer Field when you need label/description/error layout without semantic grouping.',
  },
});
