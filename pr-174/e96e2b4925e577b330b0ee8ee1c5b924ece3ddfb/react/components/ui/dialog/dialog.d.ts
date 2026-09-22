import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Dialog({ ...props }: DialogPrimitive.Root.Props): React.JSX.Element;
declare function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props): React.JSX.Element;
declare function DialogPortal({ ...props }: DialogPrimitive.Portal.Props): React.JSX.Element;
declare function DialogClose({ ...props }: DialogPrimitive.Close.Props): React.JSX.Element;
declare function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props): React.JSX.Element;
declare function DialogContent({ className, children, showCloseButton, ...props }: DialogPrimitive.Popup.Props & {
    showCloseButton?: boolean;
}): React.JSX.Element;
declare function DialogHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function DialogFooter({ className, showCloseButton, children, ...props }: React.ComponentProps<'div'> & {
    showCloseButton?: boolean;
}): React.JSX.Element;
declare function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props): React.JSX.Element;
declare function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props): React.JSX.Element;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
