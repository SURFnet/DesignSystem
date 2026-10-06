import { useRender } from '@base-ui/react/use-render';
import { ItemMediaVariantName, ItemSizeName, ItemVariantName } from '@surfnet/curve-contracts';
import { Separator } from '../separator';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
export type ItemVariantsOptions = {
    variant?: ItemVariantName;
    size?: ItemSizeName;
    className?: string;
};
declare function itemVariants({ variant, size, className, }?: ItemVariantsOptions): string;
declare function ItemGroup({ className, ...props }: React.ComponentProps<'ul'>): React.JSX.Element;
declare function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): React.JSX.Element;
declare function Item({ className, variant, size, render, ...props }: useRender.ComponentProps<'div'> & ItemVariantsOptions): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
declare function ItemMedia({ className, variant, ...props }: React.ComponentProps<'div'> & {
    variant?: ItemMediaVariantName;
}): React.JSX.Element;
declare function ItemContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function ItemTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function ItemDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element;
declare function ItemActions({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function ItemHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function ItemFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export { Item, ItemMedia, ItemContent, ItemActions, ItemGroup, ItemSeparator, ItemTitle, ItemDescription, ItemHeader, ItemFooter, itemVariants, };
