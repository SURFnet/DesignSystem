import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { contextMenuContract } from '@surfnet/curve-contracts';
import { HlmContextMenuImports, HlmContextMenuTrigger } from '..';
import { HlmDropdownMenuImports } from '../../../dropdown-menu/src';

const meta: Meta<HlmContextMenuTrigger> = {
  title: 'Components/ContextMenu',
  component: HlmContextMenuTrigger,
  decorators: [
    moduleMetadata({
      imports: [HlmContextMenuImports, HlmDropdownMenuImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: contextMenuContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmContextMenuTrigger>;

const triggerAreaClass =
  'flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none';

/** Right-click the area to reveal a menu with a label, grouped items, and a destructive action. */
export const Default: Story = {
  render: () => ({
    template: `
			<div [hlmContextMenuTrigger]="menu" align="start" side="right" class="${triggerAreaClass}">
				Right click here
			</div>
			<ng-template #menu>
				<hlm-dropdown-menu class="w-48">
					<hlm-dropdown-menu-group>
						<hlm-dropdown-menu-label>My Account</hlm-dropdown-menu-label>
						<button hlmDropdownMenuItem>
							<span>Profile</span>
							<hlm-dropdown-menu-shortcut>⇧⌘P</hlm-dropdown-menu-shortcut>
						</button>
						<button hlmDropdownMenuItem>Settings</button>
					</hlm-dropdown-menu-group>
					<hlm-dropdown-menu-separator />
					<button hlmDropdownMenuItem variant="destructive">Delete</button>
				</hlm-dropdown-menu>
			</ng-template>
		`,
  }),
};

/** Checkbox items for toggling options. */
export const WithCheckboxItems: Story = {
  render: () => ({
    template: `
			<div [hlmContextMenuTrigger]="menu" align="start" side="right" class="${triggerAreaClass}">
				Right click here
			</div>
			<ng-template #menu>
				<hlm-dropdown-menu class="w-44">
					<hlm-dropdown-menu-label>Toggle columns</hlm-dropdown-menu-label>
					<button hlmDropdownMenuCheckbox [checked]="true">
						Name
						<hlm-dropdown-menu-checkbox-indicator />
					</button>
					<button hlmDropdownMenuCheckbox [checked]="true">
						Category
						<hlm-dropdown-menu-checkbox-indicator />
					</button>
					<button hlmDropdownMenuCheckbox>
						Status
						<hlm-dropdown-menu-checkbox-indicator />
					</button>
				</hlm-dropdown-menu>
			</ng-template>
		`,
  }),
};

/** Radio items for choosing a single option from a set. */
export const WithRadioItems: Story = {
  render: () => ({
    template: `
			<div [hlmContextMenuTrigger]="menu" align="start" side="right" class="${triggerAreaClass}">
				Right click here
			</div>
			<ng-template #menu>
				<hlm-dropdown-menu class="w-44">
					<hlm-dropdown-menu-label>View</hlm-dropdown-menu-label>
					<button hlmDropdownMenuRadio [checked]="true">
						<hlm-dropdown-menu-radio-indicator />
						List
					</button>
					<button hlmDropdownMenuRadio>
						<hlm-dropdown-menu-radio-indicator />
						Grid
					</button>
					<button hlmDropdownMenuRadio>
						<hlm-dropdown-menu-radio-indicator />
						Board
					</button>
				</hlm-dropdown-menu>
			</ng-template>
		`,
  }),
};

/** A submenu nested inside the main menu, opened via a nested trigger item. */
export const WithSubmenu: Story = {
  render: () => ({
    template: `
			<div [hlmContextMenuTrigger]="menu" align="start" side="right" class="${triggerAreaClass}">
				Right click here
			</div>
			<ng-template #menu>
				<hlm-dropdown-menu class="w-48">
					<button hlmDropdownMenuItem>Back</button>
					<button hlmDropdownMenuItem>Forward</button>
					<hlm-dropdown-menu-separator />
					<button hlmDropdownMenuItem [hlmDropdownMenuTrigger]="moreTools">
						More tools
						<hlm-dropdown-menu-item-sub-indicator />
					</button>
				</hlm-dropdown-menu>
			</ng-template>
			<ng-template #moreTools>
				<hlm-dropdown-menu-sub class="w-44">
					<button hlmDropdownMenuItem>Save page as…</button>
					<button hlmDropdownMenuItem>Create shortcut…</button>
					<button hlmDropdownMenuItem>Developer tools</button>
				</hlm-dropdown-menu-sub>
			</ng-template>
		`,
  }),
};
