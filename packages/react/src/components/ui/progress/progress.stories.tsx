import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { progressContract } from '@surfnet/curve-contracts';

import { Progress, ProgressValue } from './progress';

const labelArgType = {
  control: 'text' as const,
  description:
    'Accessible name for the progress bar. Use `aria-label` when the name is not shown visually, or visible text linked with `aria-labelledby`.',
};

type ProgressStoryArgs = ComponentProps<typeof Progress> & { label: string };

const meta: Meta<ProgressStoryArgs> = {
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
    label: labelArgType,
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description:
        'The current value, from `0` to `max`. `null` renders an indeterminate progress bar.',
    },
  },
  args: {
    value: 50,
    label: 'Progress',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** The default progress bar — tweak `value` via the controls. */
export const Default: Story = {
  render: ({ label, ...args }) => <Progress {...args} aria-label={label} className="w-72" />,
};

/** A labelled progress bar — a visible label linked with `aria-labelledby`. */
export const WithLabel: Story = {
  args: {
    label: 'Uploading file…',
  },
  render: ({ label, ...args }) => (
    <Progress {...args} aria-labelledby="upload-label" className="w-72">
      <div className="flex justify-between text-sm">
        <span id="upload-label">{label}</span>
        <ProgressValue />
      </div>
    </Progress>
  ),
};

/** Indeterminate state — `value` is `null` while the task's completion is unknown. */
export const Indeterminate: Story = {
  args: { value: null, label: 'Loading…' },
  render: ({ label, ...args }) => <Progress {...args} aria-label={label} className="w-72" />,
};

/** Several tasks at different points of completion, each labelled with its percentage. */
export const Values: Story = {
  args: {
    label: 'Task',
  },
  render: ({ label }) => (
    <div className="flex w-72 flex-col gap-4">
      {[10, 40, 75, 100].map((value) => (
        <Progress key={value} value={value} aria-labelledby={`task-${value}-label`}>
          <div className="flex justify-between text-sm">
            <span id={`task-${value}-label`}>
              {label} {value}
            </span>
            <ProgressValue />
          </div>
        </Progress>
      ))}
    </div>
  ),
};
