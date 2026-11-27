'use client';

import * as React from 'react';
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import styles from './pagination.module.css';
import { useMicrocopy } from '@/lib/microcopy';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  const texts = useMicrocopy();
  return (
    <nav
      role="navigation"
      aria-label={texts['pagination.label']}
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
  text: textProp,
  iconOnly = false,
  'aria-label': ariaLabelProp,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string; iconOnly?: boolean }) {
  const texts = useMicrocopy();
  const text = textProp ?? texts['pagination.previous'];
  const ariaLabel = ariaLabelProp ?? texts['pagination.previous.label'];
  return (
    <PaginationLink
      aria-label={ariaLabel}
      size={iconOnly ? 'icon' : 'default'}
      className={cn(!iconOnly && styles.linkPaddingStart, className)}
      {...props}
    >
      <CaretLeftIcon data-icon="inline-start" />
      <span className={iconOnly ? styles.srOnly : styles.hideSm}>{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text: textProp,
  iconOnly = false,
  'aria-label': ariaLabelProp,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string; iconOnly?: boolean }) {
  const texts = useMicrocopy();
  const text = textProp ?? texts['pagination.next'];
  const ariaLabel = ariaLabelProp ?? texts['pagination.next.label'];
  return (
    <PaginationLink
      aria-label={ariaLabel}
      size={iconOnly ? 'icon' : 'default'}
      className={cn(!iconOnly && styles.linkPaddingEnd, className)}
      {...props}
    >
      <span className={iconOnly ? styles.srOnly : styles.hideSm}>{text}</span>
      <CaretRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  srOnlyText: srOnlyTextProp,
  ...props
}: React.ComponentProps<'span'> & { srOnlyText?: string }) {
  const texts = useMicrocopy();
  const srOnlyText = srOnlyTextProp ?? texts['pagination.ellipsis'];
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
