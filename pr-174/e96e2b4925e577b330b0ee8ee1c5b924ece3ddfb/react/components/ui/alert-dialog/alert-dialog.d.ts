import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { AlertDialogSizeName } from '@surfnet/curve-contracts';
import { Button } from '../button';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props): React.JSX.Element;
declare function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props): React.JSX.Element;
declare function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props): React.JSX.Element;
declare function AlertDialogOverlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props): React.JSX.Element;
declare function AlertDialogContent({ className, size, ...props }: AlertDialogPrimitive.Popup.Props & {
    size?: AlertDialogSizeName;
}): React.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDialogMedia({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>): React.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>): React.JSX.Element;
declare function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof Button>): React.JSX.Element;
declare function AlertDialogCancel({ className, variant, size, ...props }: AlertDialogPrimitive.Close.Props & Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'>): React.JSX.Element;
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, };
