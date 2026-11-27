'use client';

import { SpinnerIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

import styles from './spinner.module.css';
import { useMicrocopy } from '@/lib/microcopy';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  const texts = useMicrocopy();
  return (
    <SpinnerIcon
      data-slot="spinner"
      role="status"
      aria-label={texts['spinner.label']}
      className={cn(styles.spinner, className)}
      {...props}
    />
  );
}

export { Spinner };
