import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { commandContract } from '@surfnet/curve-contracts';
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  GearIcon,
  SmileyIcon,
  UserIcon,
} from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';

const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    docs: {
      description: {
        component: commandContract.docs.description,
      },
    },
  },
  argTypes: {
    loop: {
      control: 'boolean',
      description:
        'Whether arrow-key navigation wraps around from the last item back to the first.',
    },
    shouldFilter: {
      control: 'boolean',
      description: 'Whether items are automatically filtered and sorted based on the search query.',
    },
  },
  args: {
    loop: false,
    shouldFilter: true,
  },
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A command palette with grouped suggestions and settings — tweak `loop` and `shouldFilter` via the controls. */
export const Default: Story = {
  render: (args) => (
    <Command {...args} className="w-[320px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <CalendarIcon />
            Calendar
          </CommandItem>
          <CommandItem value="search-emoji">
            <SmileyIcon />
            Search Emoji
          </CommandItem>
          <CommandItem value="calculator">
            <CalculatorIcon />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <UserIcon />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem value="billing">
            <CreditCardIcon />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem value="settings">
            <GearIcon />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/** When no item matches the search query, `CommandEmpty` renders in its place. */
export const Empty: Story = {
  render: () => (
    <Command className="w-[320px] rounded-lg border shadow-md">
      <CommandInput placeholder="Search for something that doesn't exist…" defaultValue="xyz" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <CalendarIcon />
            Calendar
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/** Individual items can opt out of selection via `disabled`, independent of the rest of the list. */
export const DisabledItem: Story = {
  render: () => (
    <Command className="w-[320px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <UserIcon />
            Profile
          </CommandItem>
          <CommandItem value="billing" disabled>
            <CreditCardIcon />
            Billing
          </CommandItem>
          <CommandItem value="settings">
            <GearIcon />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * `CommandDialog` renders the same palette inside a modal, toggled from a trigger button
 * (or the `⌘K` shortcut) — the pattern most apps use for a global command menu.
 */
export const InDialog: Story = {
  render: function CommandDialogDemo() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          setOpen((value) => !value);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)} className="gap-2">
          Open command menu
          <Kbd>⌘K</Kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">
                <CalendarIcon />
                Calendar
              </CommandItem>
              <CommandItem value="search-emoji">
                <SmileyIcon />
                Search Emoji
              </CommandItem>
              <CommandItem value="calculator">
                <CalculatorIcon />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile" onSelect={() => setOpen(false)}>
                <UserIcon />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="billing" onSelect={() => setOpen(false)}>
                <CreditCardIcon />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="settings" onSelect={() => setOpen(false)}>
                <GearIcon />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};
