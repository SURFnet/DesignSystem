'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@/lib/utils';

import styles from './separator.module.css';

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

export { Separator };
