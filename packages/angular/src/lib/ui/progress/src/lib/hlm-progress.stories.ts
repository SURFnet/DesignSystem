import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { progressContract } from '@surfnet/curve-contracts';

import { HlmProgress, HlmProgressImports } from '..';

// `value` is contributed by the BrnProgress host directive rather than HlmProgress
// itself, so widen the story args to expose it as a control.
type ProgressArgs = HlmProgress & { value?: number | null; label: string };

const labelArgType = {
  control: 'text' as const,
  description:
    'Accessible name for the progress bar. Use `aria-label` when the name is not shown visually, or visible text linked with `aria-labelledby`.',
};

const meta: Meta<ProgressArgs> = {
  title: 'Components/Progress',
  component: HlmProgress,
  decorators: [
    moduleMetadata({
      imports: [HlmProgressImports],
    }),
  ],
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
        'The current value, from `0` to `max`. `undefined` renders an indeterminate progress bar.',
    },
  },
  args: {
    value: 50,
    label: 'Progress',
  },
};

export default meta;
type Story = StoryObj<ProgressArgs>;

/** The default progress bar — tweak `value` via the controls. */
export const Default: Story = {
  render: ({ label, ...args }) => ({
    props: { label, ...args },
    template: `
      <hlm-progress class="w-72" [aria-label]="label" ${argsToTemplate(args)}>
        <hlm-progress-indicator />
      </hlm-progress>
    `,
  }),
};

/** A labelled progress bar — a text row with the percentage alongside the track. */
export const WithLabel: Story = {
  args: {
    label: 'Uploading file…',
  },
  render: ({ label, ...args }) => ({
    props: { label, ...args },
    template: `
      <div class="flex w-72 flex-col gap-1.5">
        <div class="flex justify-between text-sm">
          <span id="upload-label">{{ label }}</span>
          <span>{{ value }}%</span>
        </div>
        <hlm-progress aria-labelledby="upload-label" ${argsToTemplate(args)}>
          <hlm-progress-indicator />
        </hlm-progress>
      </div>
    `,
  }),
};

/** Indeterminate state — `value` is left unbound while the task's completion is unknown. */
export const Indeterminate: Story = {
  args: {
    label: 'Loading…',
  },
  render: ({ label }) => ({
    props: { label },
    template: `
      <hlm-progress class="w-72" [aria-label]="label">
        <hlm-progress-indicator />
      </hlm-progress>
    `,
  }),
};

/** Several tasks at different points of completion, each labelled with its percentage. */
export const Values: Story = {
  args: {
    label: 'Task',
  },
  render: ({ label }) => ({
    props: { label },
    template: `
      <div class="flex w-72 flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span id="task-10-label">{{ label }} 10</span>
            <span>10%</span>
          </div>
          <hlm-progress aria-labelledby="task-10-label" [value]="10">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span id="task-40-label">{{ label }} 40</span>
            <span>40%</span>
          </div>
          <hlm-progress aria-labelledby="task-40-label" [value]="40">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span id="task-75-label">{{ label }} 75</span>
            <span>75%</span>
          </div>
          <hlm-progress aria-labelledby="task-75-label" [value]="75">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span id="task-100-label">{{ label }} 100</span>
            <span>100%</span>
          </div>
          <hlm-progress aria-labelledby="task-100-label" [value]="100">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
      </div>
    `,
  }),
};
