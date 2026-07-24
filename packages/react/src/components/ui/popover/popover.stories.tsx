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

/** The popup can open on any side of the trigger, flipping to stay in view. */
export const Placement: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
          <PopoverContent side={side} className="w-48">
            <p className="text-sm">Positioned on the {side}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

/** The popup can align to the start, center, or end of the trigger. */
export const Align: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline">{align}</Button>} />
          <PopoverContent align={align} className="w-48">
            <p className="text-sm">Aligned to {align}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
