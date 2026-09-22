import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Popover({ ...props }: PopoverPrimitive.Root.Props): React.JSX.Element;
declare function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props): React.JSX.Element;
declare function PopoverContent({ className, align, alignOffset, side, sideOffset, ...props }: PopoverPrimitive.Popup.Props & Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>): React.JSX.Element;
declare function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props): React.JSX.Element;
declare function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props): React.JSX.Element;
export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
