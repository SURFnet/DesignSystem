import { defineContract } from './define-contract.js';

export const contextMenuContract = defineContract({
  props: {
    variants: ['default', 'destructive'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'A menu of actions revealed by right-clicking (or long-pressing) a trigger area.',
    variants: {
      default: 'Standard menu item.',
      destructive: 'Danger-tinted item for destructive or irreversible actions.',
    },
  },
});

export type ContextMenuItemVariantName = (typeof contextMenuContract.props.variants)[number];
