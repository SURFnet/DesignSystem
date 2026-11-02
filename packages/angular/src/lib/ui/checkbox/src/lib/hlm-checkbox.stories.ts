import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HlmCheckbox, HlmCheckboxImports } from '..';
import { HlmLabel } from '../../../label/src/lib/hlm-label';
import { checkboxContract } from '@surfnet/curve-contracts';
import { HlmFieldImports } from '../../../field/src';

const meta: Meta<HlmCheckbox> = {
  title: 'Components/Checkbox',
  component: HlmCheckbox,
  decorators: [
    moduleMetadata({
      imports: [HlmCheckboxImports, HlmLabel, HlmFieldImports, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: checkboxContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18692-39410&t=vT3gKkMDSpQaeqci-4',
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
			<hlm-checkbox inputId="testCheckbox" checked [disabled]="disabled" aria-label="Checkbox" />
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

/** A required checkbox left unchecked: the field shows its error message. */
export const Invalid: Story = {
  render: () => {
    const form = new FormGroup({
      terms: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });
    form.markAllAsTouched();

    return {
      props: { form },
      template: `
				<form [formGroup]="form">
					<div hlmField orientation="horizontal">
						<hlm-checkbox inputId="invalid-terms" formControlName="terms" />
						<div hlmFieldContent>
							<label hlmFieldLabel for="invalid-terms">I accept the terms</label>
							<hlm-field-error />
						</div>
					</div>
				</form>
			`,
    };
  },
};
