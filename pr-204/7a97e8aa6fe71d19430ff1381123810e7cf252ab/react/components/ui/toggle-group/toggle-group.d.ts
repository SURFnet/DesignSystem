import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { ToggleGroupOrientationName } from '@surfnet/curve-contracts';
import { ToggleVariantsOptions } from '../toggle';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function ToggleGroup({ className, variant, size, spacing, orientation, children, ...props }: ToggleGroupPrimitive.Props & ToggleVariantsOptions & {
    spacing?: number;
    orientation?: ToggleGroupOrientationName;
}): React.JSX.Element;
declare function ToggleGroupItem({ className, children, variant, size, ...props }: TogglePrimitive.Props & ToggleVariantsOptions): React.JSX.Element;
export { ToggleGroup, ToggleGroupItem };
