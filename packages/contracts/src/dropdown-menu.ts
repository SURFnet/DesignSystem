export const dropdownMenuContract = {
  variants: ['default', 'destructive'],
  defaultVariant: 'default',
  description: 'A menu of actions or options revealed from a trigger.',
  variantDocs: {
    default: 'Standard menu item.',
    destructive: 'Danger-tinted item for destructive or irreversible actions.',
  },
} as const;

export type DropdownMenuItemVariantName = (typeof dropdownMenuContract.variants)[number];
