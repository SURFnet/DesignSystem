'use client';

import type { EmptyMediaVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import styles from './empty.module.css';

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty" className={cn(styles.empty, className)} {...props} />;
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-header" className={cn(styles.header, className)} {...props} />;
}

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: EmptyMediaVariantName }) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(styles.media, className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-title" className={cn(styles.title, className)} {...props} />;
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div data-slot="empty-description" className={cn(styles.description, className)} {...props} />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-content" className={cn(styles.content, className)} {...props} />;
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
