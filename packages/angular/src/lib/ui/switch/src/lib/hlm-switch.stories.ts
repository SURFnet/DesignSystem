import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { switchContract } from '@surfnet/curve-contracts';

import { HlmSwitch, HlmSwitchImports } from '..';
import { HlmLabel } from '../../../label/src/lib/hlm-label';

const meta: Meta<HlmSwitch> = {
  title: 'Components/Switch',
  component: HlmSwitch,
  decorators: [
    moduleMetadata({
      imports: [HlmSwitchImports, HlmLabel],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: switchContract.docs.description,
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: [...switchContract.props.sizes],
      description: switchContract.props.sizes
        .map((size) => `\`${size}\` — ${switchContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: switchContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: switchContract.defaults.sizes },
      },
    },
  },
  args: {
    size: switchContract.defaults.sizes,
  },
};

export default meta;
type Story = StoryObj<HlmSwitch>;

/** A controlled switch driven by component state — the typical usage pattern. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<hlm-switch checked ${argsToTemplate(args)} />`,
  }),
};

/** A switch paired with a clickable label. */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch checked />
        Enable notifications
      </label>
    `,
  }),
};

/** Every size declared in the contract. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-6">
        ${switchContract.props.sizes
          .map(
            (size) => `
              <label class="gap-2" hlmLabel>
                <hlm-switch size="${size}" checked title="${switchContract.docs.sizes[size]}" />
                ${size}
              </label>
            `,
          )
          .join('')}
      </div>
    `,
  }),
};

/** Every state side by side. */
export const States: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-3">
        <label class="gap-2" hlmLabel>
          <hlm-switch />
          Unchecked
        </label>
        <label class="gap-2" hlmLabel>
          <hlm-switch checked />
          Checked
        </label>
        <label class="gap-2" hlmLabel>
          <hlm-switch disabled />
          Disabled
        </label>
        <label class="gap-2" hlmLabel>
          <hlm-switch checked disabled />
          Disabled checked
        </label>
      </div>
    `,
  }),
};
