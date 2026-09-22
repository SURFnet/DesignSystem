'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import type { AvatarSizeName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import styles from './avatar.module.css';

function Avatar({
  className,
  size = 'default',
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSizeName;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(styles.root, className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(styles.image, className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(styles.fallback, className)}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="avatar-badge" className={cn(styles.badge, className)} {...props} />;
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="avatar-group" className={cn(styles.group, className)} {...props} />;
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="avatar-group-count" className={cn(styles.groupCount, className)} {...props} />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
