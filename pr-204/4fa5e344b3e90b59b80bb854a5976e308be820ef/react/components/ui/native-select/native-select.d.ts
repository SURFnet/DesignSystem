import { NativeSelectSizeName } from '@surfnet/curve-contracts';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
    size?: NativeSelectSizeName;
};
declare function NativeSelect({ className, size, ...props }: NativeSelectProps): React.JSX.Element;
declare function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>): React.JSX.Element;
declare function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>): React.JSX.Element;
export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
