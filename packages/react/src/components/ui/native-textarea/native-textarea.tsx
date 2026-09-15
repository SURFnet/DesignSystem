'use client';

import { cn } from '@/lib/utils';

import control from '../native-control/control.module.css';

function NativeTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="native-textarea"
      className={cn(control.textField, control.textarea, className)}
      {...props}
    />
  );
}

export { NativeTextarea };
