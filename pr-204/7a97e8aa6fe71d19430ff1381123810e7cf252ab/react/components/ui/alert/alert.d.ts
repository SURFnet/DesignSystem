import { AlertVariantName } from '@surfnet/curve-contracts';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
type AlertProps = React.ComponentProps<'div'> & {
    variant?: AlertVariantName;
};
declare function Alert({ className, variant, ...props }: AlertProps): React.JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export { Alert, AlertTitle, AlertDescription, AlertAction };
