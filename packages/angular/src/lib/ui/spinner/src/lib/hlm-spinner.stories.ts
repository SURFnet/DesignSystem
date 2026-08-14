import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { spinnerContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmCardImports } from '../../../card/src';
import { HlmEmptyImports } from '../../../empty/src';
import { HlmSpinner, HlmSpinnerImports } from '..';

const meta: Meta<HlmSpinner> = {
  title: 'Components/Spinner',
  component: HlmSpinner,
  decorators: [
    moduleMetadata({
      imports: [HlmSpinnerImports, HlmButton, HlmCardImports, HlmEmptyImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: spinnerContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmSpinner>;

/** The default spinner at its default size. */
export const Default: Story = {
  render: () => ({
    template: `<hlm-spinner />`,
  }),
};

/** Sizes are just utility classes — override the icon's text size to scale it. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <hlm-spinner class="text-[calc(var(--spacing)*4)]" />
        <hlm-spinner class="text-[calc(var(--spacing)*6)]" />
        <hlm-spinner class="text-[calc(var(--spacing)*8)]" />
        <hlm-spinner class="text-[calc(var(--spacing)*10)]" />
      </div>
    `,
  }),
};

/** Paired with text, inline, for a lightweight loading message. */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <hlm-spinner />
        Loading…
      </div>
    `,
  }),
};

/** Inside a disabled button while an action is in flight. */
export const InButton: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn disabled>
          <hlm-spinner data-icon="inline-start" />
          Please wait
        </button>
        <button hlmBtn variant="secondary" size="icon" disabled aria-label="Loading">
          <hlm-spinner />
        </button>
      </div>
    `,
  }),
};

/** As the sole content of a card, centering the spinner while data loads. */
export const CardLoading: Story = {
  render: () => ({
    template: `
      <hlm-card class="w-64">
        <div hlmCardContent class="flex items-center justify-center py-10">
          <hlm-spinner class="text-[calc(var(--spacing)*6)] text-muted-foreground" />
        </div>
      </hlm-card>
    `,
  }),
};

/** As the media of an empty state, e.g. while a list is being fetched. */
export const EmptyLoading: Story = {
  render: () => ({
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia>
            <hlm-spinner class="text-[calc(var(--spacing)*8)]" />
          </div>
          <div hlmEmptyDescription>Fetching your documents…</div>
        </div>
      </div>
    `,
  }),
};
