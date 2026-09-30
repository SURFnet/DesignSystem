import { EmptyMediaVariantName } from '@surfnet/curve-contracts';
declare function Empty({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
declare function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
declare function EmptyMedia({ className, variant, ...props }: React.ComponentProps<'div'> & {
    variant?: EmptyMediaVariantName;
}): import("react").JSX.Element;
declare function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
declare function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>): import("react").JSX.Element;
declare function EmptyContent({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
