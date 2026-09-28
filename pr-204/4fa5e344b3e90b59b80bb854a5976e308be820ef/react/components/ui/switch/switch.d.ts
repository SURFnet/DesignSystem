import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { SwitchSizeName } from '@surfnet/curve-contracts';
declare function Switch({ className, size, ...props }: SwitchPrimitive.Root.Props & {
    size?: SwitchSizeName;
}): import("react").JSX.Element;
export { Switch };
