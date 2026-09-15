'use client';

import { SpinnerIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

import styles from './spinner.module.css';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <SpinnerIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(styles.spinner, className)}
      {...props}
    />
  );
}

export { Spinner };
