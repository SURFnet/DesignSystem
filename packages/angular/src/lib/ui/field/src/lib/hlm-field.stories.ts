import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { fieldContract } from '@surfnet/curve-contracts';
import { HlmField, HlmFieldImports } from '..';
import { HlmCheckbox, HlmInputImports } from '../../../../../public-api';

const meta: Meta<HlmField> = {
  title: 'Components/Field',
  component: HlmField,
  decorators: [
    moduleMetadata({
      imports: [HlmFieldImports, HlmInputImports, HlmCheckbox, ReactiveFormsModule, JsonPipe],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: fieldContract.docs.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: fieldContract.props.orientations,
      description: fieldContract.props.orientations
        .map(
          (orientation) => `\`${orientation}\` — ${fieldContract.docs.orientations[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: fieldContract.defaults.orientations },
      },
    },
  },
  args: {
    orientation: fieldContract.defaults.orientations,
  },
};

export default meta;
type Story = StoryObj<HlmField>;

/** A label, input, and helper description. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div class="w-full max-w-md">
				<div hlmField class="w-72" ${argsToTemplate(args)}>
					<label hlmFieldLabel for="email">Email</label>
					<input hlmInput id="email" type="email" placeholder="you@surf.nl" />
					<p hlmFieldDescription>This is an input description.</p>
				</div>
			</div>
		`,
  }),
};

/** A horizontal field, e.g. a checkbox with its label. */
export const Horizontal: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-md">
				<div hlmField orientation="horizontal" class="w-72">
					<hlm-checkbox inputId="remember" />
					<label hlmFieldLabel for="remember" class="font-normal">Remember me</label>
				</div>
			</div>
		`,
  }),
};

/** An invalid field showing an error message. Touch the field to test the minimum of 8 characters. */
export const WithError: Story = {
  render: () => ({
    props: {
      form: new FormGroup({
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)],
        }),
      }),
    },
    template: `
			<form [formGroup]="form" class="w-full max-w-md">
				<div hlmField class="w-72">
					<label hlmFieldLabel for="password">Password</label>
					<input hlmInput formControlName="password" id="password" type="password" />
					<hlm-field-error validator="required">Password must be at least 8 characters.</hlm-field-error>
          <hlm-field-error validator="minlength">Password must be at least 8 characters.</hlm-field-error>
				</div>
			</form>
		`,
  }),
};

/** Several fields grouped, with a labelled separator. */
export const Group: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-md">
				<fieldset hlmFieldSet class="w-72">
					<div hlmField>
						<label hlmFieldLabel for="g-email">Email</label>
						<input hlmInput id="g-email" type="email" placeholder="you@surf.nl" />
					</div>
					<hlm-field-separator>Or continue with</hlm-field-separator>
					<div hlmField>
						<label hlmFieldLabel for="g-password">Password</label>
						<input hlmInput id="g-password" type="password" />
					</div>
				</fieldset>
			</div>
		`,
  }),
};
