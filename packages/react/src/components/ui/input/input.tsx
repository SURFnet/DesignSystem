'use client';

import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field';

import styles from './input.module.css';

function Input({
  className,
  type,
  optional,
  ...props
}: React.ComponentProps<'input'> & {
  /**
   * Mark this control optional, e.g. when it isn't inside a `Field`. Inside a Field, prefer
   * `<Field optional>` so the label gets its "(optioneel)" suffix too.
   */
  optional?: boolean;
}) {
  // CURVE: required by default unless `optional` or inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required'], props.required, optional);
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
