import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
type NativePopoverProps = React.ComponentProps<'div'> & {
    popover?: 'auto' | 'manual' | '';
};
declare function NativePopover({ className, popover, ...props }: NativePopoverProps): React.JSX.Element;
type NativePopoverTriggerProps = React.ComponentProps<'button'> & {
    popoverTarget: string;
};
declare function NativePopoverTrigger({ className, popoverTarget, type, ...props }: NativePopoverTriggerProps): React.JSX.Element;
declare function NativePopoverHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function NativePopoverTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function NativePopoverDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element;
export { NativePopover, NativePopoverDescription, NativePopoverHeader, NativePopoverTitle, NativePopoverTrigger, };
