'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
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
      className={cn(!iconOnly && 'ps-2!', className)}
      {...props}
    >
      <CaretLeftIcon data-icon="inline-start" className="rtl:rotate-180" />
      <span className={iconOnly ? 'sr-only' : 'hidden sm:block'}>{text}</span>
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
      className={cn(!iconOnly && 'pe-2!', className)}
      {...props}
    >
      <span className={iconOnly ? 'sr-only' : 'hidden sm:block'}>{text}</span>
      <CaretRightIcon data-icon="inline-end" className="rtl:rotate-180" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  srOnlyText = 'More pages',
  ...props
}: React.ComponentProps<'span'> & { srOnlyText?: string }) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <DotsThreeIcon aria-hidden />
      <span className="sr-only">{srOnlyText}</span>
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
