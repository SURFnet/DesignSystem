import type { Meta, StoryObj } from '@storybook/react-vite';
import { progressContract } from '@surfnet/curve-contracts';

import { Progress, ProgressLabel, ProgressValue } from './progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: progressContract.docs.description,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description:
        'The current value, from `0` to `max`. `null` renders an indeterminate progress bar.',
    },
  },
  args: {
    value: 50,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default progress bar — tweak `value` via the controls. */
export const Default: Story = {
  render: (args) => <Progress {...args} className="w-72" />,
};

/** A labelled progress bar — `ProgressLabel` and `ProgressValue` alongside the track. */
export const WithLabel: Story = {
  render: (args) => (
    <Progress {...args} className="w-72">
      <div className="flex justify-between">
        <ProgressLabel>Uploading file…</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
};

/** Indeterminate state — `value` is `null` while the task's completion is unknown. */
export const Indeterminate: Story = {
  args: { value: null },
  render: (args) => (
    <Progress {...args} className="w-72">
      <ProgressLabel>Loading…</ProgressLabel>
    </Progress>
  ),
};

/** Several tasks at different points of completion, each labelled with its percentage. */
export const Values: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      {[10, 40, 75, 100].map((value) => (
        <Progress key={value} value={value}>
          <div className="flex justify-between">
            <ProgressLabel>Task {value}</ProgressLabel>
            <ProgressValue />
          </div>
        </Progress>
      ))}
    </div>
  ),
};
