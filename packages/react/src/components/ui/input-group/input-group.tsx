import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import styles from './input-group.module.css';

type InputGroupModuleClasses = {
  group: string;
  addon: string;
  addonInlineStart: string;
  addonInlineEnd: string;
  addonBlockStart: string;
  addonBlockEnd: string;
  addonButton: string;
  addonButtonSizeXs: string;
  addonButtonIconXs: string;
  addonButtonIconSm: string;
  text: string;
  control: string;
  controlTextarea: string;
};

const inputGroupStyles = styles as InputGroupModuleClasses;

type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

const addonAlignClass: Record<InputGroupAddonAlign, string> = {
  'inline-start': inputGroupStyles.addonInlineStart,
  'inline-end': inputGroupStyles.addonInlineEnd,
  'block-start': inputGroupStyles.addonBlockStart,
  'block-end': inputGroupStyles.addonBlockEnd,
};

type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

const inputGroupButtonSizeClass: Record<InputGroupButtonSize, string> = {
  xs: inputGroupStyles.addonButtonSizeXs,
  sm: '',
  'icon-xs': inputGroupStyles.addonButtonIconXs,
  'icon-sm': inputGroupStyles.addonButtonIconSm,
};

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(inputGroupStyles.group, className)}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & {
  align?: InputGroupAddonAlign;
}) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupStyles.addon, addonAlignClass[align], className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}

function inputGroupButtonVariants({ size = 'xs' }: { size?: InputGroupButtonSize } = {}) {
  return cn(inputGroupStyles.addonButton, inputGroupButtonSizeClass[size]);
}

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> & {
  type?: 'button' | 'submit' | 'reset';
  size?: InputGroupButtonSize;
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn(inputGroupStyles.text, className)} {...props} />;
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(inputGroupStyles.control, className)}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(inputGroupStyles.control, inputGroupStyles.controlTextarea, className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupButtonVariants,
};
