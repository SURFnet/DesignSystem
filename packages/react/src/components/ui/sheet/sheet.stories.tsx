import type { Meta, StoryObj } from '@storybook/react-vite';
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

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: sheetContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A composed sheet with a trigger, a form, and a footer action — slides in from the right. */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Edit profile</Button>} />
      <SheetContent>
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
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Show terms</Button>} />
      <SheetContent showCloseButton={false}>
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

/** Every edge the sheet can slide in from, set via `side` on `SheetContent`. */
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(
        [
          { side: 'top', label: 'Top' },
          { side: 'right', label: 'Right' },
          { side: 'bottom', label: 'Bottom' },
          { side: 'left', label: 'Left' },
        ] as const
      ).map(({ side, label }) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline">{label}</Button>} />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{label} sheet</SheetTitle>
              <SheetDescription>
                Slides in from the {label.toLowerCase()} of the screen.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button variant="outline">Close</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
