'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

import styles from './input-otp.module.css';

function InputOTP({
  className,
  containerClassName,
  value,
  defaultValue,
  onChange,
  maxLength,
  completeAnnouncement = 'Verification code complete',
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  /** Screen-reader announcement when every slot is filled, including after paste. */
  completeAnnouncement?: string;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    typeof defaultValue === 'string' ? defaultValue : '',
  );
  const currentValue = value !== undefined ? value : uncontrolledValue;

  return (
    <>
      <OTPInput
        data-slot="input-otp"
        containerClassName={cn(styles.container, containerClassName)}
        spellCheck={false}
        className={cn(styles.input, className)}
        {...props}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={(next) => {
          if (value === undefined) {
            setUncontrolledValue(next);
          }
          onChange?.(next);
        }}
      />
      <div
        data-slot="input-otp-status"
        role="status"
        aria-live="polite"
        aria-atomic
        className={styles.srOnly}
      >
        {currentValue.length === maxLength ? completeAnnouncement : ''}
      </div>
    </>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="input-otp-group" className={cn(styles.group, className)} {...props} />;
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(styles.slot, className)}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className={styles.caretWrap}>
          <div className={styles.caret} />
        </div>
      ) : null}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" className={styles.separator} role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
