import { OTPInput } from 'input-otp';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function InputOTP({ className, containerClassName, value, defaultValue, onChange, maxLength, completeAnnouncement, ...props }: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
    /** Screen-reader announcement when every slot is filled, including after paste. */
    completeAnnouncement?: string;
}): React.JSX.Element;
declare function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function InputOTPSlot({ index, className, ...props }: React.ComponentProps<'div'> & {
    index: number;
}): React.JSX.Element;
declare function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
