import type { Meta, StoryObj } from '@storybook/react-vite';
import { tabsContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Tabs, TabsContent, TabsList, TabsListVariantsOptions, TabsTrigger } from './tabs';
import { TabsRootProps } from '@base-ui/react';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { TabsList },
  parameters: {
    docs: {
      description: {
        component: tabsContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=183-417',
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs.',
      table: {
        category: 'Tabs',
      },
    },
    variant: {
      control: 'radio',
      options: ['default', 'line'],
      description: 'The variant of the tabs list.',
      table: {
        category: 'TabsList',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'default',
  },
} satisfies Meta<TabsRootProps & TabsListVariantsOptions>;

export default meta;

type Story = StoryObj<TabsRootProps & TabsListVariantsOptions>;

/** A realistic composed example — a settings panel switching between two forms. */
export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-96" orientation={args.orientation}>
      <TabsList variant={args.variant}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-account-name">Name</Label>
              <Input id="tabs-account-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-account-username">Username</Label>
              <Input id="tabs-account-username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-password-current">Current password</Label>
              <Input id="tabs-password-current" type="password" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-password-new">New password</Label>
              <Input id="tabs-password-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

/** Default variant — tabs with a bordered background. */
export const DefaultVariant: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <Tabs defaultValue="tab-1" className="w-96" orientation={args.orientation}>
      <TabsList variant={args.variant} title={tabsContract.docs.variants.default}>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2">Second tab</TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="text-muted-foreground">
        {tabsContract.docs.variants.default}
      </TabsContent>
    </Tabs>
  ),
};

/** Underlined variant — tabs without a background, just an underline on the active tab. */
export const Line: Story = {
  args: { variant: 'line' },
  render: (args) => (
    <Tabs defaultValue="tab-1" className="w-96" orientation={args.orientation}>
      <TabsList variant={args.variant} title={tabsContract.docs.variants.line}>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2">Second tab</TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="text-muted-foreground">
        {tabsContract.docs.variants.line}
      </TabsContent>
    </Tabs>
  ),
};

/** Vertical orientation */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Tabs defaultValue="tab-1" orientation={args.orientation} className="w-96">
      <TabsList variant={args.variant}>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2">Second tab</TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content for the first tab.</TabsContent>
      <TabsContent value="tab-2">Content for the second tab.</TabsContent>
      <TabsContent value="tab-3">Content for the third tab.</TabsContent>
    </Tabs>
  ),
};

/** Vertical orientation with line variant. */
export const VerticalLine: Story = {
  args: { orientation: 'vertical', variant: 'line' },
  render: (args) => (
    <Tabs defaultValue="tab-1" orientation={args.orientation} className="w-96">
      <TabsList variant={args.variant}>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2">Second tab</TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content for the first tab.</TabsContent>
      <TabsContent value="tab-2">Content for the second tab.</TabsContent>
      <TabsContent value="tab-3">Content for the third tab.</TabsContent>
    </Tabs>
  ),
};

/** An individual trigger can be disabled independently of the rest of the tabs. */
export const DisabledTrigger: Story = {
  render: (args) => (
    <Tabs defaultValue="tab-1" className="w-96" orientation={args.orientation}>
      <TabsList variant={args.variant}>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2" disabled>
          Disabled tab
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content for the first tab.</TabsContent>
    </Tabs>
  ),
};
