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

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: tabsContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A realistic composed example — a settings panel switching between two forms. */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
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

/** The `TabsList` variants declared in the contract. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {tabsContract.props.variants.map((variant) => (
        <Tabs key={variant} defaultValue="tab-1" className="w-96">
          <TabsList variant={variant} title={tabsContract.docs.variants[variant]}>
            <TabsTrigger value="tab-1">First tab</TabsTrigger>
            <TabsTrigger value="tab-2">Second tab</TabsTrigger>
            <TabsTrigger value="tab-3">Third tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1" className="text-muted-foreground">
            {tabsContract.docs.variants[variant]}
          </TabsContent>
        </Tabs>
      ))}
    </div>
  ),
};

/** Vertical orientation moves roving focus to the up/down arrow keys. */
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" orientation="vertical" className="w-96">
      <TabsList>
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
  render: () => (
    <Tabs defaultValue="tab-1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2" disabled>
          Disabled tab
        </TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content for the first tab.</TabsContent>
      <TabsContent value="tab-3">Content for the third tab.</TabsContent>
    </Tabs>
  ),
};
