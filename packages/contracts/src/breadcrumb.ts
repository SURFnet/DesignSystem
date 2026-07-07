import { defineContract } from './define-contract.js';

export const breadcrumbContract = defineContract({
  docs: {
    description: 'Shows the path to the current page within a hierarchy, with chevron separators.',
  },
});
