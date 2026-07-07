import { defineContract } from './define-contract.js';

export const dropdownMenuContract = defineContract({
  props: {
    variants: ['default', 'destructive'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'A menu of actions or options revealed from a trigger.',
    variants: {
      default: 'Standard menu item.',
      destructive: 'Danger-tinted item for destructive or irreversible actions.',
    },
  },
});

export type DropdownMenuItemVariantName = (typeof dropdownMenuContract.props.variants)[number];
