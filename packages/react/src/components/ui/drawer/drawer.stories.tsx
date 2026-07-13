import type { Meta, StoryObj } from '@storybook/react-vite';
import { drawerContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: drawerContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default drawer — slides in from the bottom edge of the screen. */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * A mobile-style action sheet with a drag handle — pass `showSwipeHandle` to reveal it. The
 * drawer can be dismissed by swiping in the direction it slid in from.
 */
export const WithSwipeHandle: Story = {
  render: () => (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline">Open actions</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share this post</DrawerTitle>
          <DrawerDescription>Choose where you&apos;d like to share it.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/** Every swipe direction — the drawer can slide in from any edge of the screen. */
export const Directions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(
        [
          { direction: 'up', label: 'Top' },
          { direction: 'down', label: 'Bottom' },
          { direction: 'left', label: 'Left' },
          { direction: 'right', label: 'Right' },
        ] as const
      ).map(({ direction, label }) => (
        <Drawer key={direction} swipeDirection={direction}>
          <DrawerTrigger render={<Button variant="outline">{label}</Button>} />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label} drawer</DrawerTitle>
              <DrawerDescription>
                Slides in from the {label.toLowerCase()} of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

/**
 * A non-modal drawer — the rest of the page stays interactive, focus isn't trapped, and no
 * overlay dims the background.
 */
export const NonModal: Story = {
  render: () => (
    <Drawer modal={false}>
      <DrawerTrigger render={<Button variant="outline">Open non-modal drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You can still interact with the rest of the page while this is open.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
