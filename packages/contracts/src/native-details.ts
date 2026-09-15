import { defineContract } from './define-contract.js';

export const nativeDetailsContract = defineContract({
  docs: {
    description:
      'Expandable sections built with native <details> and <summary>. Prefer the Base UI Accordion when you need single-expand groups or full keyboard roving focus.',
  },
});
