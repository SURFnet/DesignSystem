'use client';

import * as React from 'react';
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import styles from './pagination.module.css';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(styles.root, className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="pagination-content" className={cn(styles.content, className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? 'page' : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

function PaginationPrevious({
  className,
  text = 'Previous',
  iconOnly = false,
  'aria-label': ariaLabel = 'Go to previous page',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string; iconOnly?: boolean }) {
  return (
    <PaginationLink
      aria-label={ariaLabel}
      size={iconOnly ? 'icon' : 'default'}
      className={cn(!iconOnly && styles.linkPaddingStart, className)}
      {...props}
    >
      <CaretLeftIcon data-icon="inline-start" className={styles.rtlFlip} />
      <span className={iconOnly ? styles.srOnly : styles.hideSm}>{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = 'Next',
  iconOnly = false,
  'aria-label': ariaLabel = 'Go to next page',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string; iconOnly?: boolean }) {
  return (
    <PaginationLink
      aria-label={ariaLabel}
      size={iconOnly ? 'icon' : 'default'}
      className={cn(!iconOnly && styles.linkPaddingEnd, className)}
      {...props}
    >
      <span className={iconOnly ? styles.srOnly : styles.hideSm}>{text}</span>
      <CaretRightIcon data-icon="inline-end" className={styles.rtlFlip} />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  srOnlyText = 'More pages',
  ...props
}: React.ComponentProps<'span'> & { srOnlyText?: string }) {
  return (
    <span data-slot="pagination-ellipsis" className={cn(styles.ellipsis, className)} {...props}>
      <DotsThreeIcon aria-hidden />
      <span className={styles.srOnly}>{srOnlyText}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
