'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import type { TabsVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import tabStyles from './tabs.module.css';

type TabsModuleClasses = {
  root: string;
  list: string;
  listDefault: string;
  listLine: string;
  trigger: string;
  content: string;
};

const styles = tabStyles as TabsModuleClasses;

const listVariantClass: Record<TabsVariantName, string> = {
  default: styles.listDefault,
  line: styles.listLine,
};

export type TabsListVariantsOptions = {
  variant?: TabsVariantName;
  className?: string;
};

function tabsListVariants({ variant = 'default', className }: TabsListVariantsOptions = {}) {
  return cn(styles.list, listVariantClass[variant], className);
}

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(styles.root, className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsPrimitive.List.Props & TabsListVariantsOptions) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={tabsListVariants({ variant, className })}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
