'use client';

import { cn } from '@/lib/utils';

import control from '../native-control/control.module.css';

function NativeCheckbox({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="checkbox"
      data-slot="native-checkbox"
      className={cn(control.checkbox, className)}
      {...props}
    />
  );
}

export { NativeCheckbox };
