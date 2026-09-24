import { Command as CommandPrimitive } from 'cmdk';
import { Dialog } from '../dialog';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Command({ className, label, ...props }: React.ComponentProps<typeof CommandPrimitive>): React.JSX.Element;
declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: Omit<React.ComponentProps<typeof Dialog>, 'children'> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
    children: React.ReactNode;
}): React.JSX.Element;
declare function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>): React.JSX.Element;
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): React.JSX.Element;
declare function CommandEmpty({ className, children, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): React.JSX.Element;
declare function CommandSeparator({ className, alwaysRender, ...props }: React.ComponentProps<'div'> & {
    alwaysRender?: boolean;
}): React.JSX.Element | null;
declare function CommandItem({ className, children, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): React.JSX.Element;
declare function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
