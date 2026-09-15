import { defineContract } from './define-contract.js';

export const nativeTextareaContract = defineContract({
  docs: {
    description:
      'A styled native <textarea> for multi-line text. Prefer the Base UI Textarea when composing with Input Group or Field primitives.',
  },
});
