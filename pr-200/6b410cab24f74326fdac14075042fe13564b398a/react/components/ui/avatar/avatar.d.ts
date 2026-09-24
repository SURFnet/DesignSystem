import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { AvatarSizeName } from '@surfnet/curve-contracts';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Avatar({ className, size, ...props }: AvatarPrimitive.Root.Props & {
    size?: AvatarSizeName;
}): React.JSX.Element;
declare function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props): React.JSX.Element;
declare function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props): React.JSX.Element;
declare function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
declare function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
