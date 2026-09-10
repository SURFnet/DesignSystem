import { defineContract } from './define-contract.js';

export const alertContract = defineContract({
  props: {
    variants: ['default', 'info', 'success', 'warning', 'danger'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'Displays a short, prominent message to draw attention to information.',
    variants: {
      default: 'Neutral informational message.',
      info: 'Informational message that does not require immediate action.',
      success: 'Confirms a successful action or state.',
      warning: 'Highlights something that needs attention before it becomes a problem.',
      danger: 'Danger-tinted message for errors or destructive outcomes.',
    },
  },
});

export type AlertVariantName = (typeof alertContract.props.variants)[number];
