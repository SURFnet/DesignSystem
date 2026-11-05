'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field/field-context';

import styles from './radio-group.module.css';

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  // CURVE: required by default unless inside <Field optional> or <FieldSet optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required']);
  // CURVE: a11y (issue #289) — Base UI's `required` also marks every option and its native
  // input, so screen readers announce "required" on each radio, not only the group.
  const required = props.required ?? (ariaRequired === true || ariaRequired === 'true');
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      aria-required={ariaRequired}
      className={cn(styles.group, className)}
      {...props}
      required={required}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(styles.item, className)}
      {...props}
    >
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className={styles.indicator}>
        <span className={styles.dot} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
