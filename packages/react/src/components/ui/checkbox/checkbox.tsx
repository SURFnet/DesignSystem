'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field';

import styles from './checkbox.module.css';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  // CURVE: required by default unless inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required'], props.required);
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      aria-required={ariaRequired}
      className={cn(styles.checkbox, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={styles.indicator}>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
