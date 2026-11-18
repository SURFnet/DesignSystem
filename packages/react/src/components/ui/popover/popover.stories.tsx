import type { Meta, StoryObj } from '@storybook/react-vite';
import { popoverContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: popoverContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=193-1388',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A composed popover with a header, description, and a small form. */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/** The popup can open above the trigger. */
export const SideTop: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Top</Button>} />
        <PopoverContent side="top" className="w-48">
          <p className="text-sm">Positioned on the top.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can open to the right of the trigger. */
export const SideRight: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Right</Button>} />
        <PopoverContent side="right" className="w-48">
          <p className="text-sm">Positioned on the right.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can open below the trigger. */
export const SideBottom: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Bottom</Button>} />
        <PopoverContent side="bottom" className="w-48">
          <p className="text-sm">Positioned on the bottom.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can open to the left of the trigger. */
export const SideLeft: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Left</Button>} />
        <PopoverContent side="left" className="w-48">
          <p className="text-sm">Positioned on the left.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can align to the start of the trigger. */
export const AlignStart: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Start</Button>} />
        <PopoverContent align="start" className="w-48">
          <p className="text-sm">Aligned to start.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can align to the center of the trigger. */
export const AlignCenter: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Center</Button>} />
        <PopoverContent align="center" className="w-48">
          <p className="text-sm">Aligned to center.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can align to the end of the trigger. */
export const AlignEnd: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">End</Button>} />
        <PopoverContent align="end" className="w-48">
          <p className="text-sm">Aligned to end.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
