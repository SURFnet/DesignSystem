import { Button } from '../button';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Pagination({ className, ...props }: React.ComponentProps<'nav'>): React.JSX.Element;
declare function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>): React.JSX.Element;
declare function PaginationItem({ ...props }: React.ComponentProps<'li'>): React.JSX.Element;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> & React.ComponentProps<'a'>;
declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): React.JSX.Element;
declare function PaginationPrevious({ className, text, iconOnly, 'aria-label': ariaLabel, ...props }: React.ComponentProps<typeof PaginationLink> & {
    text?: string;
    iconOnly?: boolean;
}): React.JSX.Element;
declare function PaginationNext({ className, text, iconOnly, 'aria-label': ariaLabel, ...props }: React.ComponentProps<typeof PaginationLink> & {
    text?: string;
    iconOnly?: boolean;
}): React.JSX.Element;
declare function PaginationEllipsis({ className, srOnlyText, ...props }: React.ComponentProps<'span'> & {
    srOnlyText?: string;
}): React.JSX.Element;
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, };
