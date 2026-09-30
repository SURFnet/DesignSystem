import { useRender } from '@base-ui/react/use-render';
import { BadgeVariantName } from '@surfnet/curve-contracts';
type BadgeVariantsOptions = {
    variant?: BadgeVariantName;
    className?: string;
};
declare function badgeVariants({ variant, className }?: BadgeVariantsOptions): string;
declare function Badge({ className, variant, render, ...props }: useRender.ComponentProps<'span'> & BadgeVariantsOptions): import('../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react').ReactElement<unknown, string | import('../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react').JSXElementConstructor<any>>;
export { Badge, badgeVariants };
