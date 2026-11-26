import { type ComponentType, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { inputOtpContract, type InputOtpVariantName } from '@surfnet/curve-contracts';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';

/**
 * The story args, typed by hand rather than from `InputOTP`'s props: the underlying
 * `input-otp` library defines its own `render` prop, which collides with Storybook's own
 * `render` story field. So never spread all args onto `InputOTP`; pass these on by name.
 * `variant` is a story arg for the `InputOTPGroup`s inside.
 */
type InputOTPArgs = {
  maxLength: number;
  disabled?: boolean;
  completeAnnouncement?: string;
  variant?: InputOtpVariantName;
};

const otpProps = ({ maxLength, disabled, completeAnnouncement }: InputOTPArgs) => ({
  maxLength,
  disabled,
  completeAnnouncement,
});

const meta = {
  title: 'Components/InputOTP',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-gap'],
  // Cast: see `InputOTPArgs` — the props type itself can't serve as the story args.
  component: InputOTP as ComponentType<InputOTPArgs>,
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
      options: inputOtpContract.props.variants,
      description: inputOtpContract.props.variants
        .map((variant) => `\`${variant}\` — ${inputOtpContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: inputOtpContract.defaults.variants },
      },
    },
  },
  args: {
    maxLength: 6,
    disabled: false,
    variant: inputOtpContract.defaults.variants,
  },
} satisfies Meta<InputOTPArgs>;

export default meta;

type Story = StoryObj<InputOTPArgs>;

/** The default 6-digit OTP input — tweak `maxLength`/`disabled`/`variant` via the controls. */
export const Default: Story = {
  render: (args) => (
    <InputOTP {...otpProps(args)} aria-label="One-time password">
      <InputOTPGroup variant={args.variant}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/** Slots split into two groups with a separator, the common six-digit layout. */
export const WithSeparator: Story = {
  render: (args) => (
    <InputOTP {...otpProps(args)} aria-label="One-time password">
      <InputOTPGroup variant={args.variant}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup variant={args.variant}>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * The `with-spacing` variant: set `variant="with-spacing"` on `InputOTPGroup` to give
 * each slot its own rounded border, with a gap between slots.
 */
export const WithSpacing: Story = {
  args: { variant: 'with-spacing' },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <InputOTP {...otpProps(args)} aria-label="One-time password">
        <InputOTPGroup variant={args.variant}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <InputOTP
        {...otpProps(args)}
        disabled
        defaultValue="123456"
        aria-label="One-time password, disabled"
      >
        <InputOTPGroup variant={args.variant}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
};

/** Disabled state, pre-filled with a value. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <InputOTP {...otpProps(args)} defaultValue="123456" aria-label="One-time password">
      <InputOTPGroup variant={args.variant}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup variant={args.variant}>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * A realistic composed example: a labelled, digit-only verification code field that
 * enables its submit button once all slots are filled.
 */
export const VerificationForm: Story = {
  // `disabled` stays off here, matching the Angular story's reactive form.
  argTypes: { disabled: { table: { disable: true } } },
  render: (args) => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');

    return (
      <Field className="w-72">
        <FieldLabel htmlFor="otp">Verification code</FieldLabel>
        <InputOTP
          id="otp"
          maxLength={args.maxLength}
          completeAnnouncement={args.completeAnnouncement}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
          onComplete={setSubmitted}
        >
          <InputOTPGroup variant={args.variant}>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup variant={args.variant}>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          {submitted ? `Code ${submitted} verified.` : 'Enter the 6-digit code sent to your email.'}
        </FieldDescription>
        <Button disabled={value.length < args.maxLength}>Verify</Button>
      </Field>
    );
  },
};
