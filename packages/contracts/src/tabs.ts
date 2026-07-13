import { defineContract } from './define-contract.js';

export const tabsContract = defineContract({
  props: {
    variants: ['default', 'line'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description:
      'Organizes content into panels shown one at a time, selected via a row of triggers.',
    variants: {
      default: 'Filled pill-style trigger background.',
      line: 'Underlined triggers with no background.',
    },
  },
});

export type TabsVariantName = (typeof tabsContract.props.variants)[number];
