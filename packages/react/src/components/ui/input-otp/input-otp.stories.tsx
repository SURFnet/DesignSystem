import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { inputOtpContract } from '@surfnet/curve-contracts';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';

const meta = {
  title: 'Components/InputOTP',
  component: InputOTP,
  parameters: {
    docs: {
      description: {
        component: inputOtpContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default 6-digit OTP input. `maxLength`/`disabled` aren't exposed as live
 * controls — the underlying `input-otp` library also defines its own `render` prop,
 * which collides with Storybook's own `render` story field when spread through
 * `{...args}`, so this story hardcodes its props instead.
 */
export const Default: Story = {
  args: { maxLength: 6, children: null },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
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
  args: { maxLength: 6, children: null },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/** Disabled state, pre-filled with a value. */
export const Disabled: Story = {
  args: { maxLength: 6, children: null },
  render: () => (
    <InputOTP maxLength={6} disabled defaultValue="123456">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
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
  args: { maxLength: 6, children: null },
  render: () => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');

    return (
      <Field className="w-72">
        <FieldLabel htmlFor="otp">Verification code</FieldLabel>
        <InputOTP
          id="otp"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
          onComplete={setSubmitted}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          {submitted ? `Code ${submitted} verified.` : 'Enter the 6-digit code sent to your email.'}
        </FieldDescription>
        <Button disabled={value.length < 6}>Verify</Button>
      </Field>
    );
  },
};
