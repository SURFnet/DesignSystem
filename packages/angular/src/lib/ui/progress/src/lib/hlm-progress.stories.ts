import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { progressContract } from '@surfnet/curve-contracts';

import { HlmProgress, HlmProgressImports } from '..';

// `value` is contributed by the BrnProgress host directive rather than HlmProgress
// itself, so widen the story args to expose it as a control.
type ProgressArgs = HlmProgress & { value?: number | null };

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
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description:
        'The current value, from `0` to `max`. `undefined` renders an indeterminate progress bar.',
    },
  },
  args: {
    value: 50,
  },
};

export default meta;
type Story = StoryObj<ProgressArgs>;

/** The default progress bar — tweak `value` via the controls. */
export const Default: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
      <hlm-progress class="w-72" ${argsToTemplate(args)}>
        <hlm-progress-indicator />
      </hlm-progress>
    `,
  }),
};

/** A labelled progress bar — a text row with the percentage alongside the track. */
export const WithLabel: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
      <div class="flex w-72 flex-col gap-1.5">
        <div class="flex justify-between text-sm">
          <span>Uploading file…</span>
          <span>{{ value }}%</span>
        </div>
        <hlm-progress ${argsToTemplate(args)}>
          <hlm-progress-indicator />
        </hlm-progress>
      </div>
    `,
  }),
};

/** Indeterminate state — `value` is left unbound while the task's completion is unknown. */
export const Indeterminate: Story = {
  render: () => ({
    template: `
      <div class="flex w-72 flex-col gap-1.5">
        <span class="text-sm">Loading…</span>
        <hlm-progress>
          <hlm-progress-indicator />
        </hlm-progress>
      </div>
    `,
  }),
};

/** Several tasks at different points of completion, each labelled with its percentage. */
export const Values: Story = {
  render: () => ({
    template: `
      <div class="flex w-72 flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span>Task 10</span>
            <span>10%</span>
          </div>
          <hlm-progress [value]="10">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span>Task 40</span>
            <span>40%</span>
          </div>
          <hlm-progress [value]="40">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span>Task 75</span>
            <span>75%</span>
          </div>
          <hlm-progress [value]="75">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between text-sm">
            <span>Task 100</span>
            <span>100%</span>
          </div>
          <hlm-progress [value]="100">
            <hlm-progress-indicator />
          </hlm-progress>
        </div>
      </div>
    `,
  }),
};
