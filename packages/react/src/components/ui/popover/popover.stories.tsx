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

// `align` and `side` live on PopoverContent (the positioned popup), not on the Popover
// root, so widen the story args to expose them as controls.
type PopoverStoryArgs = React.ComponentProps<typeof Popover> &
  Pick<React.ComponentProps<typeof PopoverContent>, 'align' | 'side'>;

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
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Where the popup is aligned relative to its trigger.',
      table: { defaultValue: { summary: 'center' } },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which side of the trigger the popup opens on.',
      table: { defaultValue: { summary: 'bottom' } },
    },
  },
  args: {
    align: 'center',
    side: 'bottom',
  },
} satisfies Meta<PopoverStoryArgs>;

export default meta;

type Story = StoryObj<PopoverStoryArgs>;

/** A composed popover with a header, description, and a small form. */
export const Default: Story = {
  render: ({ align, side, ...args }) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent align={align} side={side}>
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
  args: { side: 'top' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">Top</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Positioned on the top.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can open to the right of the trigger. */
export const SideRight: Story = {
  args: { side: 'right' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">Right</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Positioned on the right.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can open below the trigger. */
export const SideBottom: Story = {
  args: { side: 'bottom' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">Bottom</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Positioned on the bottom.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can open to the left of the trigger. */
export const SideLeft: Story = {
  args: { side: 'left' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">Left</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Positioned on the left.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can align to the start of the trigger. */
export const AlignStart: Story = {
  args: { align: 'start' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">Start</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Aligned to start.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can align to the center of the trigger. */
export const AlignCenter: Story = {
  args: { align: 'center' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">Center</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Aligned to center.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/** The popup can align to the end of the trigger. */
export const AlignEnd: Story = {
  args: { align: 'end' },
  render: ({ align, side, ...args }) => (
    <div className="flex items-center justify-center p-12">
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="outline">End</Button>} />
        <PopoverContent align={align} side={side} className="w-48">
          <p className="text-sm">Aligned to end.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
