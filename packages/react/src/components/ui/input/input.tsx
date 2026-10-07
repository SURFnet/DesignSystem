'use client';

import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field/field-context';

import styles from './input.module.css';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  // CURVE: required by default unless inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required']);
  return (
    <InputPrimitive
      type={type}
      aria-required={ariaRequired}
      data-slot="input"
      className={cn(styles.input, className)}
      {...props}
    />
  );
}

export { Input };
