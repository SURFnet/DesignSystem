import { useRender } from '@base-ui/react/use-render';
import { ButtonGroupOrientationName } from '@surfnet/curve-contracts';
import { Separator } from '../separator';
export type ButtonGroupVariantsOptions = {
    orientation?: ButtonGroupOrientationName;
    className?: string;
};
declare function buttonGroupVariants({ className }?: ButtonGroupVariantsOptions): string;
declare function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<'div'> & ButtonGroupVariantsOptions): import("react").JSX.Element;
declare function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<'div'>): import('../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react').ReactElement<unknown, string | import('../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react').JSXElementConstructor<any>>;
declare function ButtonGroupSeparator({ className, orientation, ...props }: React.ComponentProps<typeof Separator>): import("react").JSX.Element;
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
