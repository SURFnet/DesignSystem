'use client';

import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { ItemMediaVariantName, ItemSizeName, ItemVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

import itemStyles from './item.module.css';

type ItemModuleClasses = {
  item: string;
  variantDefault: string;
  variantOutline: string;
  variantMuted: string;
  sizeDefault: string;
  sizeSm: string;
  sizeXs: string;
  itemGroup: string;
  itemSeparator: string;
  media: string;
  content: string;
  title: string;
  description: string;
  actions: string;
  header: string;
  footer: string;
};

const styles = itemStyles as ItemModuleClasses;

const variantClass: Record<ItemVariantName, string> = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  muted: styles.variantMuted,
};

const sizeClass: Record<ItemSizeName, string> = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  xs: styles.sizeXs,
};

export type ItemVariantsOptions = {
  variant?: ItemVariantName;
  size?: ItemSizeName;
  className?: string;
};

function itemVariants({
  variant = 'default',
  size = 'default',
  className,
}: ItemVariantsOptions = {}) {
  return cn(styles.item, variantClass[variant], sizeClass[size], className);
}

function ItemGroup({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="item-group"
      className={cn(styles.itemGroup, className)}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <li aria-hidden="true">
      <Separator
        data-slot="item-separator"
        orientation="horizontal"
        className={cn(styles.itemSeparator, className)}
        {...props}
      />
    </li>
  );
}

function Item({
  className,
  variant = 'default',
  size = 'default',
  render,
  ...props
}: useRender.ComponentProps<'div'> & ItemVariantsOptions) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: itemVariants({ variant, size, className }),
      },
      props,
    ),
    render,
    state: {
      slot: 'item',
      variant,
      size,
    },
  });
}

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: ItemMediaVariantName }) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(styles.media, className)}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-content" className={cn(styles.content, className)} {...props} />;
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-title" className={cn(styles.title, className)} {...props} />;
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="item-description" className={cn(styles.description, className)} {...props} />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-actions" className={cn(styles.actions, className)} {...props} />;
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-header" className={cn(styles.header, className)} {...props} />;
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-footer" className={cn(styles.footer, className)} {...props} />;
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
  itemVariants,
};
