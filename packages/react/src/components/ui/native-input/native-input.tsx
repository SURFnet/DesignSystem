'use client';

import type { NativeInputSizeName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import control from '../native-control/control.module.css';

type NativeInputProps = Omit<React.ComponentProps<'input'>, 'size'> & {
  size?: NativeInputSizeName;
};

function NativeInput({ className, size = 'default', type = 'text', ...props }: NativeInputProps) {
  return (
    <input
      type={type}
      data-slot="native-input"
      data-size={size}
      className={cn(control.textField, control.input, className)}
      {...props}
    />
  );
}

export { NativeInput };
