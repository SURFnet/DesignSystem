import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { TabsVariantName } from '@surfnet/curve-contracts';
export type TabsListVariantsOptions = {
    variant?: TabsVariantName;
    className?: string;
};
declare function tabsListVariants({ variant, className }?: TabsListVariantsOptions): string;
declare function Tabs({ className, orientation, ...props }: TabsPrimitive.Root.Props): import("react").JSX.Element;
declare function TabsList({ className, variant, ...props }: TabsPrimitive.List.Props & TabsListVariantsOptions): import("react").JSX.Element;
declare function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props): import("react").JSX.Element;
declare function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props): import("react").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
