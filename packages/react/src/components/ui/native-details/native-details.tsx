'use client';

import { cn } from '@/lib/utils';

import styles from './native-details.module.css';

function NativeDetails({ className, ...props }: React.ComponentProps<'details'>) {
  return (
    <details data-slot="native-details" className={cn(styles.details, className)} {...props} />
  );
}

function NativeSummary({ className, ...props }: React.ComponentProps<'summary'>) {
  return (
    <summary data-slot="native-summary" className={cn(styles.summary, className)} {...props} />
  );
}

function NativeDetailsContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="native-details-content" className={cn(styles.content, className)} {...props} />
  );
}

export { NativeDetails, NativeDetailsContent, NativeSummary };
