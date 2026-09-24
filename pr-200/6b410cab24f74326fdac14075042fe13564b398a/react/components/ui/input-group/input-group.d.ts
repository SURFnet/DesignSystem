import { Button } from '../button';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
declare function InputGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function InputGroupAddon({ className, align, ...props }: React.ComponentProps<'div'> & {
    align?: InputGroupAddonAlign;
}): React.JSX.Element;
declare function inputGroupButtonVariants({ size }?: {
    size?: InputGroupButtonSize;
}): string;
declare function InputGroupButton({ className, type, variant, size, ...props }: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> & {
    type?: 'button' | 'submit' | 'reset';
    size?: InputGroupButtonSize;
}): React.JSX.Element;
declare function InputGroupText({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
declare function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>): React.JSX.Element;
declare function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>): React.JSX.Element;
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea, inputGroupButtonVariants, };
