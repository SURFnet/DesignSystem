import { defineContract } from './define-contract.js';

export const sidebarContract = defineContract({
  docs: {
    description:
      'A composable application sidebar: header, scrollable content with grouped menus, and footer.',
  },
});

export const sidebarMenuButtonContract = defineContract({
  props: {
    variants: ['default', 'outline'],
    sizes: ['default', 'sm', 'lg'],
  },
  defaults: {
    variants: 'default',
    sizes: 'default',
  },
  docs: {
    description:
      'The interactive item inside a sidebar menu — renders as a button or, polymorphically, a link.',
    variants: {
      default: 'Flat item that tints on hover/active — the standard navigation entry.',
      outline: 'Bordered item with a subtle shadow — stands apart from flat entries.',
    },
    sizes: {
      default: 'Standard height for top-level navigation entries.',
      sm: 'Compact height for dense or nested menus.',
      lg: 'Tall entry for items with a description or two-line label.',
    },
  },
});

export type SidebarMenuButtonVariantName =
  (typeof sidebarMenuButtonContract.props.variants)[number];
export type SidebarMenuButtonSizeName = (typeof sidebarMenuButtonContract.props.sizes)[number];
