'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import type { SwitchSizeName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import styles from './switch.module.css';

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: SwitchSizeName;
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(styles.switch, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
