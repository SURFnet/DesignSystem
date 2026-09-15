'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { ButtonGroupOrientationName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

import styles from './button-group.module.css';

export type ButtonGroupVariantsOptions = {
  orientation?: ButtonGroupOrientationName;
  className?: string;
};

function buttonGroupVariants({ className }: ButtonGroupVariantsOptions = {}) {
  return cn(styles.group, className);
}

function ButtonGroup({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> & ButtonGroupVariantsOptions) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(styles.text, className),
      },
      props,
    ),
    render,
    state: {
      slot: 'button-group-text',
    },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
