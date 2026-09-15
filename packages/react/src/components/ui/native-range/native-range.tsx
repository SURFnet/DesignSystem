'use client';

import { cn } from '@/lib/utils';

import control from '../native-control/control.module.css';

function NativeRange({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="range"
      data-slot="native-range"
      className={cn(control.range, className)}
      {...props}
    />
  );
}

export { NativeRange };
