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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=28934-79420',
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
    optional: {
      control: 'boolean',
      description: fieldContract.props.necessities
        .map((necessity) => `\`${necessity}\` — ${fieldContract.docs.necessities[necessity]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    orientation: fieldContract.defaults.orientations,
    optional: false,
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

/**
 * Fields are required by default. Mark the exception with `optional`: the label gets an
 * "(optioneel)" suffix and the control loses `aria-required`.
 */
export const Optional: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-md">
				<div hlmField optional class="w-72">
					<label hlmFieldLabel for="phone">Telefoonnummer</label>
					<input hlmInput id="phone" type="tel" autocomplete="tel" />
				</div>
			</div>
		`,
  }),
};

/**
 * Required and optional fields side by side. Only the optional ones are marked; `optionalText`
 * swaps the suffix for an English form. A consent checkbox stays required, a newsletter one is optional.
 */
export const MixedForm: Story = {
  render: () => ({
    template: `
			<div hlmFieldGroup class="w-72">
				<div hlmField>
					<label hlmFieldLabel for="mixed-name">Full name</label>
					<input hlmInput id="mixed-name" autocomplete="name" />
				</div>
				<div hlmField>
					<label hlmFieldLabel for="mixed-email">Email</label>
					<input hlmInput id="mixed-email" type="email" autocomplete="email" />
				</div>
				<div hlmField optional>
					<label hlmFieldLabel for="mixed-phone" optionalText="(optional)">Phone number</label>
					<input hlmInput id="mixed-phone" type="tel" autocomplete="tel" />
					<p hlmFieldDescription>Only used if we can't reach you by email.</p>
				</div>
				<div hlmField orientation="horizontal" optional>
					<hlm-checkbox inputId="mixed-newsletter" />
					<label hlmFieldLabel for="mixed-newsletter" optionalText="(optional)">Send me the newsletter</label>
				</div>
				<div hlmField orientation="horizontal">
					<hlm-checkbox inputId="mixed-terms" />
					<label hlmFieldLabel for="mixed-terms">I accept the terms of use</label>
				</div>
			</div>
		`,
  }),
};
