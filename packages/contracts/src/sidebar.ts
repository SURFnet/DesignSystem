export const sidebarContract = {
  description:
    'A composable application sidebar: header, scrollable content with grouped menus, and footer.',
} as const;

export const sidebarMenuButtonContract = {
  variants: ['default', 'outline'],
  sizes: ['default', 'sm', 'lg'],
  defaultVariant: 'default',
  defaultSize: 'default',
  description:
    'The interactive item inside a sidebar menu — renders as a button or, polymorphically, a link.',
  variantDocs: {
    default: 'Flat item that tints on hover/active — the standard navigation entry.',
    outline: 'Bordered item with a subtle shadow — stands apart from flat entries.',
  },
  sizeDocs: {
    default: 'Standard height for top-level navigation entries.',
    sm: 'Compact height for dense or nested menus.',
    lg: 'Tall entry for items with a description or two-line label.',
  },
} as const;

export type SidebarMenuButtonVariantName = (typeof sidebarMenuButtonContract.variants)[number];
export type SidebarMenuButtonSizeName = (typeof sidebarMenuButtonContract.sizes)[number];
