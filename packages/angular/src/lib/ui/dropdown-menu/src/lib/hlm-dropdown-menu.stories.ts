import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThreeVertical } from '@ng-icons/phosphor-icons/regular';
import { HlmDropdownMenu, HlmDropdownMenuImports } from '..';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { HlmButton, HlmButtonImports } from '../../../../../public-api';
import { dropdownMenuContract } from '@surfnet/curve-contracts';

const meta: Meta<HlmDropdownMenu> = {
  title: 'Components/Dropdown Menu',
  component: HlmDropdownMenu,
  decorators: [
    moduleMetadata({
      imports: [HlmDropdownMenuImports, HlmButton, NgIcon],
      providers: [provideIcons({ phosphorDotsThreeVertical })],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: dropdownMenuContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmDropdownMenu>;

/** A menu with a label, grouped items, and a destructive action. */
export const Default: Story = {
  render: () => ({
    template: `
    <div class="w-full flex justify-center items-center">
      <button hlmBtn variant="outline" [hlmDropdownMenuTrigger]="menu">Open menu</button>
    </div>
    <ng-template #menu>
      <hlm-dropdown-menu align="start" class="w-48">
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
    </ng-template>`,
  }),
};

/** The "⋯" row-actions pattern from a data table. */
export const RowActions: Story = {
  render: () => ({
    template: `
    <div class="w-full flex justify-center items-center">
      <button hlmBtn variant="ghost" size="icon-sm" align="end" aria-label="Row actions" [hlmDropdownMenuTrigger]="menu">
        <ng-icon name="phosphorDotsThreeVertical" />
      </button>
    </div>
    <ng-template #menu>
      <hlm-dropdown-menu class="w-40">
        <button hlmDropdownMenuItem>View</button>
        <button hlmDropdownMenuItem>Edit</button>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem variant="destructive">Remove</button>
      </hlm-dropdown-menu>
    </ng-template>`,
  }),
};

/** Checkbox items for toggling options. */
export const WithCheckboxItems: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DropdownCheckboxes],
    },
    template: '<stateful-dropdown-story/>',
  }),
};

@Component({
  selector: 'stateful-dropdown-story',
  imports: [HlmDropdownMenuImports, HlmButtonImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="w-full flex justify-center items-center">
      <button
        hlmBtn
        variant="outline"
        aria-label="With Checkbox Items"
        [hlmDropdownMenuTrigger]="menu"
      >
        Columns
      </button>
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
        <button
          hlmDropdownMenuCheckbox
          [checked]="isStatusChecked()"
          (triggered)="isStatusChecked.set(!isStatusChecked())"
        >
          Status
          <hlm-dropdown-menu-checkbox-indicator />
        </button>
      </hlm-dropdown-menu>
    </ng-template>`,
})
class DropdownCheckboxes {
  public readonly isStatusChecked = signal(false);
}
