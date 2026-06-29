import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonSizeName, ButtonVariantName } from '@surfnet/contracts';

import { cn } from '@/lib/utils';

const buttonVariantClasses = {
  default: 'bg-background-primary text-foreground-primary hover:bg-background-primary-hover',
  outline:
    'border-border-default bg-background-default shadow-xs hover:bg-background-item-hover hover:text-foreground-item-hover aria-expanded:bg-background-item-hover aria-expanded:text-foreground-item-hover',
  secondary:
    'bg-background-secondary text-foreground-secondary hover:bg-background-secondary-hover aria-expanded:bg-background-secondary aria-expanded:text-foreground-secondary',
  ghost:
    'hover:bg-background-item-hover hover:text-foreground-item-hover aria-expanded:bg-background-item-hover aria-expanded:text-foreground-item-hover',
  destructive:
    'bg-background-error-subtle text-foreground-error hover:bg-background-error-subtle-hover focus-visible:border-border-error focus-visible:ring-ring-default-error/20',
  link: 'text-background-primary underline-offset-4 hover:underline',
} satisfies Record<ButtonVariantName, string>;

const buttonSizeClasses = {
  default:
    'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
  xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
  lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
  icon: 'size-9',
  'icon-xs':
    "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
  'icon-sm': 'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
  'icon-lg': 'size-10',
} satisfies Record<ButtonSizeName, string>;

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring-default focus-visible:ring-3 focus-visible:ring-ring-default/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-border-error aria-invalid:ring-3 aria-invalid:ring-ring-default-error/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: buttonVariantClasses,
      size: buttonSizeClasses,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
