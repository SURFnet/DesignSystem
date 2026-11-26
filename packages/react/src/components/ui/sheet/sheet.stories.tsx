import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { sheetContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

// `side` and `showCloseButton` live on `SheetContent`, so widen the story args to expose them.
type SheetStoryArgs = ComponentProps<typeof Sheet> &
  Pick<ComponentProps<typeof SheetContent>, 'side' | 'showCloseButton'>;

const meta: Meta<SheetStoryArgs> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: sheetContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=216-3314',
    },
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: sheetContract.props.sides,
      description: sheetContract.props.sides
        .map((side) => `\`${side}\` — ${sheetContract.docs.sides[side]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: sheetContract.defaults.sides },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show the close icon in the corner of the sheet.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    side: sheetContract.defaults.sides,
    showCloseButton: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** A composed sheet with a trigger, a form, and a footer action — slides in from the right. */
export const Default: Story = {
  render: ({ side, showCloseButton, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Edit profile</Button>} />
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-username">Username</Label>
            <Input id="sheet-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * `showCloseButton={false}` on `SheetContent` hides the corner close icon — pair it with an
 * explicit `SheetClose` action in the footer so the user still has a way to dismiss.
 */
export const WithoutCloseButton: Story = {
  args: { showCloseButton: false },
  render: ({ side, showCloseButton, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Show terms</Button>} />
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Terms of service</SheetTitle>
          <SheetDescription>
            Please read and accept our terms of service before continuing.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** The sheet slides in from the top of the screen. */
export const Top: Story = {
  args: { side: 'top' },
  render: ({ side, showCloseButton, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Top</Button>} />
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Top sheet</SheetTitle>
          <SheetDescription>Slides in from the top of the screen.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** The sheet slides in from the right of the screen. */
export const Right: Story = {
  args: { side: 'right' },
  render: ({ side, showCloseButton, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Right</Button>} />
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Right sheet</SheetTitle>
          <SheetDescription>Slides in from the right of the screen.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** The sheet slides in from the bottom of the screen. */
export const Bottom: Story = {
  args: { side: 'bottom' },
  render: ({ side, showCloseButton, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Bottom</Button>} />
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Bottom sheet</SheetTitle>
          <SheetDescription>Slides in from the bottom of the screen.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** The sheet slides in from the left of the screen. */
export const Left: Story = {
  args: { side: 'left' },
  render: ({ side, showCloseButton, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Left</Button>} />
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Left sheet</SheetTitle>
          <SheetDescription>Slides in from the left of the screen.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
