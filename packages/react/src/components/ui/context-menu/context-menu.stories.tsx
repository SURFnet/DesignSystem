import type { Meta, StoryObj } from '@storybook/react-vite';
import { contextMenuContract } from '@surfnet/curve-contracts';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component: contextMenuContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const triggerAreaClassName =
  'flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none';

/** Right-click the area to reveal a menu with a label, grouped items, and a destructive action. */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={triggerAreaClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuLabel>My account</ContextMenuLabel>
          <ContextMenuItem>
            Profile
            <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Settings</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/** Checkbox items for toggling options. */
export const WithCheckboxItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={triggerAreaClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent className="w-44">
        <ContextMenuLabel>Toggle columns</ContextMenuLabel>
        <ContextMenuCheckboxItem checked>Name</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked>Category</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Status</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/** Radio items for choosing a single option from a set. */
export const WithRadioItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={triggerAreaClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent className="w-44">
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuRadioGroup defaultValue="list">
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
          <ContextMenuRadioItem value="board">Board</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/** A submenu nested inside the main menu, opened via a sub-trigger item. */
export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={triggerAreaClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page as…</ContextMenuItem>
            <ContextMenuItem>Create shortcut…</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
