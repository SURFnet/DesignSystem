import { FieldOrientationName } from '@surfnet/curve-contracts';
import { Label } from '../label';
declare function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>): import("react").JSX.Element;
declare function FieldLegend({ className, variant, ...props }: React.ComponentProps<'legend'> & {
    variant?: 'legend' | 'label';
}): import("react").JSX.Element;
declare function FieldGroup({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
export type FieldVariantsOptions = {
    orientation?: FieldOrientationName;
    className?: string;
};
declare function fieldVariants({ className }?: FieldVariantsOptions): string;
declare function Field({ className, orientation, ...props }: React.ComponentProps<'div'> & FieldVariantsOptions): import("react").JSX.Element;
declare function FieldContent({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
declare function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>): import("react").JSX.Element;
declare function FieldTitle({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
declare function FieldDescription({ className, ...props }: React.ComponentProps<'p'>): import("react").JSX.Element;
declare function FieldSeparator({ children, className, ...props }: React.ComponentProps<'div'> & {
    children?: React.ReactNode;
}): import("react").JSX.Element;
declare function FieldError({ className, children, errors, ...props }: React.ComponentProps<'div'> & {
    errors?: Array<{
        message?: string;
    } | undefined>;
}): import("react").JSX.Element | null;
export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle, fieldVariants, };
