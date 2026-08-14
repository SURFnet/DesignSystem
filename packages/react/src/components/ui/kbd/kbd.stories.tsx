import type { Meta, StoryObj } from '@storybook/react-vite';
import { kbdContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

import { Kbd, KbdGroup } from './kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component: kbdContract.docs.description,
      },
    },
  },
  args: {
    children: '⌘',
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A single key — tweak the label via the controls. */
export const Default: Story = {};

/** Modifier keys grouped together, and a combination spelled out with a `+`. */
export const Groups: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  ),
};

/** Referencing a shortcut inline in body copy. */
export const InText: Story = {
  render: () => (
    <p className="max-w-xs text-sm text-muted-foreground">
      Use{' '}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{' '}
      to open the command palette.
    </p>
  ),
};

/** Hinting a button's shortcut key. */
export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  ),
};

/** Surfacing a search shortcut inside an input's trailing addon. */
export const InInputGroup: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
