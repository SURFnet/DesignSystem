import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare const NativeDialog: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>, "ref"> & React.RefAttributes<HTMLDialogElement>>;
declare function NativeDialogHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function NativeDialogTitle({ className, ...props }: React.ComponentProps<'h2'>): React.JSX.Element;
declare function NativeDialogDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element;
declare function NativeDialogFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
type NativeDialogCloseProps = React.ComponentProps<'button'> & {
    dialogRef?: React.RefObject<HTMLDialogElement | null>;
};
declare function NativeDialogClose({ className, dialogRef, onClick, ...props }: NativeDialogCloseProps): React.JSX.Element;
export { NativeDialog, NativeDialogClose, NativeDialogDescription, NativeDialogFooter, NativeDialogHeader, NativeDialogTitle, };
