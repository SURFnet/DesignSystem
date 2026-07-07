import type { Meta, StoryObj } from '@storybook/react-vite';
import { separatorContract } from '@surfnet/curve-contracts';

import { Separator } from './separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: separatorContract.docs.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: separatorContract.props.orientations,
      description: separatorContract.props.orientations
        .map(
          (orientation) =>
            `\`${orientation}\` — ${separatorContract.docs.orientations[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: separatorContract.defaults.orientations },
      },
    },
  },
  args: {
    orientation: separatorContract.defaults.orientations,
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — flip `orientation` in the controls to see both directions. */
export const Default: Story = {
  render: (args) => (
    <div
      className={
        args.orientation === 'vertical'
          ? 'flex h-5 items-center gap-3 text-sm'
          : 'flex w-72 flex-col gap-3 text-sm'
      }
    >
      <span>One</span>
      <Separator {...args} />
      <span>Two</span>
    </div>
  ),
};

/** A horizontal divider between stacked blocks of text. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm">Curve</p>
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
