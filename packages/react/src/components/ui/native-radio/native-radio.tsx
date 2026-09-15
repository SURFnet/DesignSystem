'use client';

import { cn } from '@/lib/utils';

import control from '../native-control/control.module.css';

function NativeRadio({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="radio"
      data-slot="native-radio"
      className={cn(control.radio, className)}
      {...props}
    />
  );
}

export { NativeRadio };
