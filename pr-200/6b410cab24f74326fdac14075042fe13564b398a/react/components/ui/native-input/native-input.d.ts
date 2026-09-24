import { NativeInputSizeName } from '@surfnet/curve-contracts';
type NativeInputProps = Omit<React.ComponentProps<'input'>, 'size'> & {
    size?: NativeInputSizeName;
};
declare function NativeInput({ className, size, type, ...props }: NativeInputProps): import("react").JSX.Element;
export { NativeInput };
