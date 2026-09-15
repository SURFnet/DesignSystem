'use client';

import * as React from 'react';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import type { ToggleGroupOrientationName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { toggleVariants, type ToggleVariantsOptions } from '@/components/ui/toggle';

import groupStyles from './toggle-group.module.css';

const ToggleGroupContext = React.createContext<
  ToggleVariantsOptions & {
    spacing?: number;
    orientation?: ToggleGroupOrientationName;
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 2,
  orientation: 'horizontal',
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  ToggleVariantsOptions & {
    spacing?: number;
    orientation?: ToggleGroupOrientationName;
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      // `role="group"` doesn't allow `aria-orientation` (ARIA spec); Base UI's composite
      // navigation sets it internally, so unset it here to keep the rendered markup valid.
      aria-orientation={undefined}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(groupStyles.group, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.Props & ToggleVariantsOptions) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        groupStyles.item,
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
