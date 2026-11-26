import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { inputOtpContract, type InputOtpVariantName } from '@surfnet/curve-contracts';
import { BrnInputOtpImports } from '@spartan-ng/brain/input-otp';

import { HlmInputOtp, HlmInputOtpImports } from '..';
import { HlmButton, HlmFieldImports } from '../../../../../public-api';

// `maxLength`/`disabled` are contributed by the BrnInputOtp host directive rather than
// HlmInputOtp itself, so widen the story args to expose them as controls. `variant` is a
// story arg for the `hlm-input-otp-group`s inside.
type InputOtpArgs = HlmInputOtp & {
  maxLength: number;
  disabled: boolean;
  variant: InputOtpVariantName;
};

const meta: Meta<InputOtpArgs> = {
  title: 'Components/InputOTP',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-gap'],
  component: HlmInputOtp,
  decorators: [
    moduleMetadata({
      imports: [HlmInputOtpImports, BrnInputOtpImports, HlmFieldImports, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: inputOtpContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=430-17451&t=e05qWfQcPmc0GJEw-4',
    },
  },
  argTypes: {
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
    completeAnnouncement: {
      control: 'text',
      description: 'Screen-reader announcement when every slot is filled, including after paste.',
    },
    variant: {
      control: 'inline-radio',
      options: [...inputOtpContract.props.variants],
      description: inputOtpContract.props.variants
        .map((variant) => `\`${variant}\` — ${inputOtpContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: inputOtpContract.props.variants.join(' | '),
        },
        defaultValue: { summary: inputOtpContract.defaults.variants },
      },
    },
  },
  args: {
    maxLength: 6,
    disabled: false,
    variant: inputOtpContract.defaults.variants,
  },
};

export default meta;
type Story = StoryObj<InputOtpArgs>;

/** Bind the args that belong on `brn-input-otp`; `variant` goes on the groups instead. */
const otpBindings = (args: Parameters<typeof argsToTemplate>[0], exclude: string[] = []) =>
  argsToTemplate(args, { exclude: ['variant', ...exclude] });

/** The default OTP input — tweak `maxLength`/`disabled`/`variant` via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <brn-input-otp hlmInputOtp aria-label="One-time password" ${otpBindings(args)}>
        <hlm-input-otp-group [variant]="variant">
          <hlm-input-otp-slot index="0" />
          <hlm-input-otp-slot index="1" />
          <hlm-input-otp-slot index="2" />
          <hlm-input-otp-slot index="3" />
          <hlm-input-otp-slot index="4" />
          <hlm-input-otp-slot index="5" />
        </hlm-input-otp-group>
      </brn-input-otp>
    `,
  }),
};

/** Slots split into two groups with a separator, the common six-digit layout. */
export const WithSeparator: Story = {
  render: (args) => ({
    props: args,
    template: `
      <brn-input-otp hlmInputOtp aria-label="One-time password" ${otpBindings(args)}>
        <hlm-input-otp-group [variant]="variant">
          <hlm-input-otp-slot index="0" />
          <hlm-input-otp-slot index="1" />
          <hlm-input-otp-slot index="2" />
        </hlm-input-otp-group>
        <hlm-input-otp-separator />
        <hlm-input-otp-group [variant]="variant">
          <hlm-input-otp-slot index="3" />
          <hlm-input-otp-slot index="4" />
          <hlm-input-otp-slot index="5" />
        </hlm-input-otp-group>
      </brn-input-otp>
    `,
  }),
};

/**
 * The `with-spacing` variant: set `variant="with-spacing"` on `hlm-input-otp-group` to give
 * each slot its own rounded border, with a gap between slots.
 */
export const WithSpacing: Story = {
  args: { variant: 'with-spacing' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <brn-input-otp hlmInputOtp aria-label="One-time password" ${otpBindings(args)}>
          <hlm-input-otp-group [variant]="variant">
            <hlm-input-otp-slot index="0" />
            <hlm-input-otp-slot index="1" />
            <hlm-input-otp-slot index="2" />
            <hlm-input-otp-slot index="3" />
            <hlm-input-otp-slot index="4" />
            <hlm-input-otp-slot index="5" />
          </hlm-input-otp-group>
        </brn-input-otp>
        <brn-input-otp hlmInputOtp aria-label="One-time password, disabled" value="123456" disabled ${otpBindings(args, ['disabled'])}>
          <hlm-input-otp-group [variant]="variant">
            <hlm-input-otp-slot index="0" />
            <hlm-input-otp-slot index="1" />
            <hlm-input-otp-slot index="2" />
            <hlm-input-otp-slot index="3" />
            <hlm-input-otp-slot index="4" />
            <hlm-input-otp-slot index="5" />
          </hlm-input-otp-group>
        </brn-input-otp>
      </div>
    `,
  }),
};

/** Disabled state, pre-filled with a value. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <brn-input-otp hlmInputOtp aria-label="One-time password" value="123456" ${otpBindings(args)}>
        <hlm-input-otp-group [variant]="variant">
          <hlm-input-otp-slot index="0" />
          <hlm-input-otp-slot index="1" />
          <hlm-input-otp-slot index="2" />
        </hlm-input-otp-group>
        <hlm-input-otp-separator />
        <hlm-input-otp-group [variant]="variant">
          <hlm-input-otp-slot index="3" />
          <hlm-input-otp-slot index="4" />
          <hlm-input-otp-slot index="5" />
        </hlm-input-otp-group>
      </brn-input-otp>
    `,
  }),
};

/**
 * A realistic composed example: a labelled verification code field, wired up to a
 * reactive form, that enables its submit button once all slots are filled.
 */
export const VerificationForm: Story = {
  argTypes: { disabled: { table: { disable: true } } },
  render: (args) => ({
    props: {
      ...args,
      form: new FormGroup({
        otp: new FormControl(''),
      }),
    },
    moduleMetadata: {
      imports: [ReactiveFormsModule, HlmFieldImports, HlmButton],
    },
    template: `
      <form [formGroup]="form" class="w-72">
        <div hlmField>
          <label hlmFieldLabel for="otp">Verification code</label>
          <brn-input-otp hlmInputOtp inputId="otp" ${otpBindings(args, ['disabled'])} formControlName="otp">
            <hlm-input-otp-group [variant]="variant">
              <hlm-input-otp-slot index="0" />
              <hlm-input-otp-slot index="1" />
              <hlm-input-otp-slot index="2" />
            </hlm-input-otp-group>
            <hlm-input-otp-separator />
            <hlm-input-otp-group [variant]="variant">
              <hlm-input-otp-slot index="3" />
              <hlm-input-otp-slot index="4" />
              <hlm-input-otp-slot index="5" />
            </hlm-input-otp-group>
          </brn-input-otp>
          <p hlmFieldDescription>Enter the 6-digit code sent to your email.</p>
        </div>
        <button hlmBtn type="submit" class="mt-4" [disabled]="(form.value.otp?.length ?? 0) < maxLength">
          Verify
        </button>
      </form>
    `,
  }),
};

/** A required code left empty: the field shows its error message. */
export const Invalid: Story = {
  argTypes: { disabled: { table: { disable: true } } },
  render: (args) => {
    const form = new FormGroup({
      code: new FormControl('', { validators: [Validators.required] }),
    });
    form.markAllAsTouched();

    return {
      props: { ...args, form },
      template: `
				<form [formGroup]="form">
					<div hlmField>
						<label hlmFieldLabel>Verification code</label>
						<brn-input-otp hlmInputOtp ${otpBindings(args, ['disabled'])} formControlName="code" aria-label="Verification code">
							<hlm-input-otp-group [variant]="variant">
								<hlm-input-otp-slot index="0" />
								<hlm-input-otp-slot index="1" />
								<hlm-input-otp-slot index="2" />
								<hlm-input-otp-slot index="3" />
								<hlm-input-otp-slot index="4" />
								<hlm-input-otp-slot index="5" />
							</hlm-input-otp-group>
						</brn-input-otp>
						<hlm-field-error />
					</div>
				</form>
			`,
    };
  },
};
