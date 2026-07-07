import { defineContract } from './define-contract.js';

export const selectContract = defineContract({
  props: {
    sizes: ['sm', 'default'],
  },
  defaults: {
    sizes: 'default',
  },
  docs: {
    description: 'A control for picking a single value from a list shown in a popup.',
    sizes: {
      sm: 'Compact trigger for dense toolbars and filter bars.',
      default: 'Standard trigger height.',
    },
  },
});

export type SelectTriggerSizeName = (typeof selectContract.props.sizes)[number];
