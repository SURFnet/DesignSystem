'use client';

import * as React from 'react';
import { Command as CommandPrimitive, useCommandState } from 'cmdk';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { MagnifyingGlassIcon, CheckIcon } from '@phosphor-icons/react';

import styles from './command.module.css';
import { useMicrocopy } from '@/lib/microcopy';

function Command({
  className,
  label: labelProp,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  const texts = useMicrocopy();
  const label = labelProp ?? texts['command.label'];
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(styles.root, className)}
      label={label}
      {...props}
    />
  );
}

function CommandDialog({
  title: titleProp,
  description: descriptionProp,
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, 'children'> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  const texts = useMicrocopy();
  const title = titleProp ?? texts['command.dialog.title'];
  const description = descriptionProp ?? texts['command.dialog.description'];
  return (
    <Dialog {...props}>
      <DialogHeader className={styles.srOnly}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(styles.dialogContent, className)}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className={styles.inputWrapper}>
      <InputGroup className={styles.inputGroup}>
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(styles.input, className)}
          {...props}
        />
        <InputGroupAddon>
          <MagnifyingGlassIcon className={styles.searchIcon} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(styles.list, className)}
      {...props}
    />
  );
}

function CommandEmpty({ className, children, ...props }: React.ComponentProps<'div'>) {
  const isEmpty = useCommandState((state) => state.filtered.count === 0);

  return (
    <div
      data-slot="command-empty"
      cmdk-empty=""
      hidden={!isEmpty}
      className={cn(styles.empty, className)}
      {...props}
      role="option"
      aria-disabled="true"
      aria-selected="false"
      aria-live="polite"
      aria-atomic
    >
      {isEmpty ? children : null}
    </div>
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(styles.group, className)}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  alwaysRender,
  ...props
}: React.ComponentProps<'div'> & { alwaysRender?: boolean }) {
  const search = useCommandState((state) => state.search);

  if (!alwaysRender && search) {
    return null;
  }

  return (
    <div
      data-slot="command-separator"
      className={cn(styles.separator, className)}
      {...props}
      role="presentation"
      aria-hidden="true"
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(styles.item, className)}
      {...props}
    >
      {children}
      <CheckIcon className={styles.itemCheck} />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="command-shortcut" className={cn(styles.shortcut, className)} {...props} />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
