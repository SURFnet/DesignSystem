import { defineContract } from './define-contract.js';

export const alertContract = defineContract({
  props: {
    variants: ['default', 'destructive'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'Displays a short, prominent message to draw attention to information.',
    variants: {
      default: 'Neutral informational message.',
      destructive: 'Danger-tinted message for errors or warnings.',
    },
  },
});

export type AlertVariantName = (typeof alertContract.props.variants)[number];
