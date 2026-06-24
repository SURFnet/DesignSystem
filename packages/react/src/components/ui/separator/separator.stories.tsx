import type { Meta, StoryObj } from '@storybook/react-vite';
import { separatorContract } from '@surfnet/contracts';

import { Separator } from './separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: separatorContract.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: separatorContract.orientations,
      table: {
        defaultValue: { summary: separatorContract.defaultOrientation },
      },
    },
  },
  args: {
    orientation: separatorContract.defaultOrientation,
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A horizontal divider between stacked blocks of text. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm">SURF Design System</p>
      <Separator className="my-3" />
      <p className="text-sm text-muted-foreground">Components for React and Angular.</p>
    </div>
  ),
};

/** A vertical divider between inline items. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>Storybook</span>
    </div>
  ),
};
