import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { ButtonSizeName, ButtonVariantName } from '@surfnet/curve-contracts';
type ButtonVariantsOptions = {
    variant?: ButtonVariantName;
    size?: ButtonSizeName;
    className?: string;
};
declare function buttonVariants({ variant, size, className, }?: ButtonVariantsOptions): string;
type ButtonProps = ButtonPrimitive.Props & ButtonVariantsOptions & {
    variant?: ButtonVariantName;
    size?: ButtonSizeName;
};
declare function Button({ className, variant, size, ...props }: ButtonProps): import("react").JSX.Element;
export { Button, buttonVariants };
