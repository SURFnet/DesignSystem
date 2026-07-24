import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { inputOtpContract } from '@surfnet/curve-contracts';
import { BrnInputOtpImports } from '@spartan-ng/brain/input-otp';

import { HlmInputOtp, HlmInputOtpImports } from '..';
import { HlmButton, HlmFieldImports } from '../../../../../public-api';

// `maxLength`/`disabled` are contributed by the BrnInputOtp host directive rather than
// HlmInputOtp itself, so widen the story args to expose them as controls.
type InputOtpArgs = HlmInputOtp & { maxLength: number; disabled: boolean };

const meta: Meta<InputOtpArgs> = {
  title: 'Components/InputOTP',
  component: HlmInputOtp,
  decorators: [
    moduleMetadata({
      imports: [HlmInputOtpImports, BrnInputOtpImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: inputOtpContract.docs.description,
      },
    },
  },
  argTypes: {
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    maxLength: 6,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<InputOtpArgs>;

/** The default OTP input — tweak `maxLength`/`disabled` via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <brn-input-otp hlmInputOtp ${argsToTemplate(args)}>
        <hlm-input-otp-group>
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
  render: () => ({
    template: `
      <brn-input-otp hlmInputOtp maxLength="6">
        <hlm-input-otp-group>
          <hlm-input-otp-slot index="0" />
          <hlm-input-otp-slot index="1" />
          <hlm-input-otp-slot index="2" />
        </hlm-input-otp-group>
        <hlm-input-otp-separator />
        <hlm-input-otp-group>
          <hlm-input-otp-slot index="3" />
          <hlm-input-otp-slot index="4" />
          <hlm-input-otp-slot index="5" />
        </hlm-input-otp-group>
      </brn-input-otp>
    `,
  }),
};

/** Disabled state, pre-filled with a value. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <brn-input-otp hlmInputOtp value="123456" disabled maxLength="6">
        <hlm-input-otp-group>
          <hlm-input-otp-slot index="0" />
          <hlm-input-otp-slot index="1" />
          <hlm-input-otp-slot index="2" />
        </hlm-input-otp-group>
        <hlm-input-otp-separator />
        <hlm-input-otp-group>
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
  render: () => ({
    props: {
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
          <brn-input-otp hlmInputOtp inputId="otp" maxLength="6" formControlName="otp">
            <hlm-input-otp-group>
              <hlm-input-otp-slot index="0" />
              <hlm-input-otp-slot index="1" />
              <hlm-input-otp-slot index="2" />
            </hlm-input-otp-group>
            <hlm-input-otp-separator />
            <hlm-input-otp-group>
              <hlm-input-otp-slot index="3" />
              <hlm-input-otp-slot index="4" />
              <hlm-input-otp-slot index="5" />
            </hlm-input-otp-group>
          </brn-input-otp>
          <p hlmFieldDescription>Enter the 6-digit code sent to your email.</p>
        </div>
        <button hlmBtn type="submit" class="mt-4" [disabled]="(form.value.otp?.length ?? 0) < 6">
          Verify
        </button>
      </form>
    `,
  }),
};
