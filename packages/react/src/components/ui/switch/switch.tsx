'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import type { SwitchSizeName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field';

import styles from './switch.module.css';

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: SwitchSizeName;
}) {
  // CURVE: required by default unless inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required'], props.required);
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      aria-required={ariaRequired}
      data-size={size}
      className={cn(styles.switch, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
