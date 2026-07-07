import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HlmCheckbox, HlmCheckboxImports } from '..';
import { HlmLabel } from '../../../label/src/lib/hlm-label';
import { checkboxContract } from '@surfnet/curve-contracts';

const meta: Meta<HlmCheckbox> = {
  title: 'Components/Checkbox',
  component: HlmCheckbox,
  decorators: [
    moduleMetadata({
      imports: [HlmCheckboxImports, HlmLabel],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: checkboxContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmCheckbox>;

/** A controlled checkbox driven by React state — the typical usage pattern. */
export const Default: Story = {
  args: { disabled: false },
  render: (args) => ({
    props: args,
    template: `
			<hlm-checkbox inputId="testCheckbox" checked [disabled]="disabled" />
		`,
  }),
};

/** A checkbox paired with a clickable label. */
export const WithLabel: Story = {
  render: () => ({
    template: `
			<label class="gap-2" hlmLabel>
				<hlm-checkbox checked/>
				Accept terms and conditions
			</label>
		`,
  }),
};

/** Every state side by side. */
export const States: Story = {
  render: () => ({
    template: `
			<div class="flex flex-col gap-3">
				<label class="gap-2" hlmLabel>
					<hlm-checkbox/>
					Unchecked
				</label>
				<label class="gap-2" hlmLabel>
					<hlm-checkbox checked/>
					Checked
				</label>
				<label class="gap-2" hlmLabel>
					<hlm-checkbox indeterminate="true"/>
					Indeterminate
				</label>
				<label class="gap-2" hlmLabel>
					<hlm-checkbox disabled/>
					Disabled
				</label>
				<label class="gap-2" hlmLabel>
					<hlm-checkbox checked disabled/>
					Disabled checked
				</label>
			</div>
    `,
  }),
};
