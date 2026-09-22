import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleSizeName, ToggleVariantName } from '@surfnet/curve-contracts';
export type ToggleVariantsOptions = {
    variant?: ToggleVariantName;
    size?: ToggleSizeName;
    className?: string;
};
declare function toggleVariants({ variant, size, className, }?: ToggleVariantsOptions): string;
type ToggleProps = TogglePrimitive.Props & ToggleVariantsOptions;
declare function Toggle({ className, variant, size, ...props }: ToggleProps): import("react").JSX.Element;
export { Toggle, toggleVariants };
