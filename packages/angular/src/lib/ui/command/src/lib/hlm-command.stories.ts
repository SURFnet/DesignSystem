import { Component, HostListener, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCalculator,
  phosphorCalendar,
  phosphorCreditCard,
  phosphorGear,
  phosphorSmiley,
  phosphorUser,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { commandContract } from '@surfnet/curve-contracts';
import type { BrnDialogState } from '@spartan-ng/brain/dialog';

import { HlmButton } from '../../../button/src';
import { HlmKbd } from '../../../kbd/src';
import { HlmCommand, HlmCommandImports } from '..';

// `disabled` is contributed by the BrnCommand host directive rather than HlmCommand
// itself, so widen the story args to expose it as a control.
type CommandArgs = HlmCommand & { disabled: boolean };

const meta: Meta<CommandArgs> = {
  title: 'Components/Command',
  component: HlmCommand,
  decorators: [
    moduleMetadata({
      imports: [HlmCommandImports, NgIcon],
      providers: [
        provideIcons({
          phosphorCalculator,
          phosphorCalendar,
          phosphorCreditCard,
          phosphorGear,
          phosphorSmiley,
          phosphorUser,
        }),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: commandContract.docs.description,
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the whole command palette should ignore user interaction.',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<CommandArgs>;

/** A command palette with grouped suggestions and settings — tweak `disabled` via the controls. */
export const Default: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
      <hlm-command ${argsToTemplate(args)} class="w-[320px] rounded-lg border shadow-md">
        <hlm-command-input placeholder="Type a command or search..." />
        <hlm-command-list>
          <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
          <hlm-command-group>
            <hlm-command-group-label>Suggestions</hlm-command-group-label>
            <button hlm-command-item value="calendar">
              <ng-icon name="phosphorCalendar" />
              Calendar
            </button>
            <button hlm-command-item value="search-emoji">
              <ng-icon name="phosphorSmiley" />
              Search Emoji
            </button>
            <button hlm-command-item value="calculator">
              <ng-icon name="phosphorCalculator" />
              Calculator
            </button>
          </hlm-command-group>
          <hlm-command-separator />
          <hlm-command-group>
            <hlm-command-group-label>Settings</hlm-command-group-label>
            <button hlm-command-item value="profile">
              <ng-icon name="phosphorUser" />
              Profile
              <hlm-command-shortcut>⌘P</hlm-command-shortcut>
            </button>
            <button hlm-command-item value="billing">
              <ng-icon name="phosphorCreditCard" />
              Billing
              <hlm-command-shortcut>⌘B</hlm-command-shortcut>
            </button>
            <button hlm-command-item value="settings">
              <ng-icon name="phosphorGear" />
              Settings
              <hlm-command-shortcut>⌘S</hlm-command-shortcut>
            </button>
          </hlm-command-group>
        </hlm-command-list>
      </hlm-command>
    `,
  }),
};

/** When no item matches the search query, the `hlmCommandEmptyState` view renders in its place. */
export const Empty: Story = {
  render: () => ({
    template: `
      <hlm-command [search]="'xyz'" class="w-[320px] rounded-lg border shadow-md">
        <hlm-command-input placeholder="Search for something that doesn't exist..." />
        <hlm-command-list>
          <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
          <hlm-command-group>
            <hlm-command-group-label>Suggestions</hlm-command-group-label>
            <button hlm-command-item value="calendar">
              <ng-icon name="phosphorCalendar" />
              Calendar
            </button>
          </hlm-command-group>
        </hlm-command-list>
      </hlm-command>
    `,
  }),
};

/** Individual items can opt out of selection via `disabled`, independent of the rest of the list. */
export const DisabledItem: Story = {
  render: () => ({
    template: `
      <hlm-command class="w-[320px] rounded-lg border shadow-md">
        <hlm-command-input placeholder="Type a command or search..." />
        <hlm-command-list>
          <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
          <hlm-command-group>
            <hlm-command-group-label>Settings</hlm-command-group-label>
            <button hlm-command-item value="profile">
              <ng-icon name="phosphorUser" />
              Profile
            </button>
            <button hlm-command-item value="billing" disabled>
              <ng-icon name="phosphorCreditCard" />
              Billing
            </button>
            <button hlm-command-item value="settings">
              <ng-icon name="phosphorGear" />
              Settings
            </button>
          </hlm-command-group>
        </hlm-command-list>
      </hlm-command>
    `,
  }),
};

/**
 * `hlm-command-dialog` renders the same palette inside a modal, toggled from a trigger button
 * (or the `⌘K` shortcut) — the pattern most apps use for a global command menu.
 */
@Component({
  selector: 'command-dialog-demo',
  imports: [HlmCommandImports, HlmButton, HlmKbd, NgIcon],
  providers: [
    provideIcons({
      phosphorCalculator,
      phosphorCalendar,
      phosphorCreditCard,
      phosphorGear,
      phosphorSmiley,
      phosphorUser,
    }),
  ],
  template: `
    <button hlmBtn variant="outline" class="gap-2" (click)="state.set('open')">
      Open command menu
      <kbd hlmKbd>⌘K</kbd>
    </button>
    <hlm-command-dialog [state]="state()" (stateChange)="state.set($event)">
      <hlm-command>
        <hlm-command-input placeholder="Type a command or search..." />
        <hlm-command-list>
          <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
          <hlm-command-group>
            <hlm-command-group-label>Suggestions</hlm-command-group-label>
            <button hlm-command-item value="calendar" (selected)="state.set('closed')">
              <ng-icon name="phosphorCalendar" />
              Calendar
            </button>
            <button hlm-command-item value="search-emoji" (selected)="state.set('closed')">
              <ng-icon name="phosphorSmiley" />
              Search Emoji
            </button>
            <button hlm-command-item value="calculator" (selected)="state.set('closed')">
              <ng-icon name="phosphorCalculator" />
              Calculator
            </button>
          </hlm-command-group>
          <hlm-command-separator />
          <hlm-command-group>
            <hlm-command-group-label>Settings</hlm-command-group-label>
            <button hlm-command-item value="profile" (selected)="state.set('closed')">
              <ng-icon name="phosphorUser" />
              Profile
              <hlm-command-shortcut>⌘P</hlm-command-shortcut>
            </button>
            <button hlm-command-item value="billing" (selected)="state.set('closed')">
              <ng-icon name="phosphorCreditCard" />
              Billing
              <hlm-command-shortcut>⌘B</hlm-command-shortcut>
            </button>
            <button hlm-command-item value="settings" (selected)="state.set('closed')">
              <ng-icon name="phosphorGear" />
              Settings
              <hlm-command-shortcut>⌘S</hlm-command-shortcut>
            </button>
          </hlm-command-group>
        </hlm-command-list>
      </hlm-command>
    </hlm-command-dialog>
  `,
})
class CommandDialogDemo {
  protected readonly state = signal<BrnDialogState>('closed');

  @HostListener('document:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent) {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.state.update((current) => (current === 'open' ? 'closed' : 'open'));
    }
  }
}

export const InDialog: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [CommandDialogDemo],
    },
    template: '<command-dialog-demo />',
  }),
};
