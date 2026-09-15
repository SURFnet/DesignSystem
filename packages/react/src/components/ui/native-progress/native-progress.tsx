'use client';

import { cn } from '@/lib/utils';

import styles from './native-progress.module.css';

function NativeProgress({ className, ...props }: React.ComponentProps<'progress'>) {
  return (
    <progress data-slot="native-progress" className={cn(styles.progress, className)} {...props} />
  );
}

export { NativeProgress };
