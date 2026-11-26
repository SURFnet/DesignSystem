import { BellIcon, CreditCardIcon, GearSixIcon, UserIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { itemContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './item';

const meta = {
  title: 'Components/Item',
  component: Item,
  parameters: {
    docs: {
      description: {
        component: itemContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18709-94348&t=e05qWfQcPmc0GJEw-4',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: itemContract.props.variants,
      description: itemContract.props.variants
        .map((variant) => `\`${variant}\` — ${itemContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: itemContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: itemContract.props.sizes,
      description: itemContract.props.sizes
        .map((size) => `\`${size}\` — ${itemContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: itemContract.defaults.sizes },
      },
    },
  },
  args: {
    variant: itemContract.defaults.variants,
    size: itemContract.defaults.sizes,
  },
} satisfies Meta<typeof Item>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default item — media, title, description, and an action; tweak variant/size via the controls. */
export const Default: Story = {
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Receive alerts about account activity.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </ItemActions>
    </Item>
  ),
};

/** No border, transparent background. */
export const DefaultVariant: Story = {
  tags: ['!autodocs'],
  args: { variant: 'default' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <GearSixIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Default</ItemTitle>
        <ItemDescription>{itemContract.docs.variants.default}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Bordered container. */
export const Outline: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <GearSixIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Outline</ItemTitle>
        <ItemDescription>{itemContract.docs.variants.outline}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Subtle muted background, no border. */
export const Muted: Story = {
  tags: ['!autodocs'],
  args: { variant: 'muted' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <GearSixIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Muted</ItemTitle>
        <ItemDescription>{itemContract.docs.variants.muted}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Standard padding and gaps. */
export const SizeDefault: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline', size: 'default' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Default</ItemTitle>
        <ItemDescription>{itemContract.docs.sizes.default}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Compact padding and gaps. */
export const SizeSm: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline', size: 'sm' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Sm</ItemTitle>
        <ItemDescription>{itemContract.docs.sizes.sm}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Extra compact — dense lists such as menus. */
export const SizeXs: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline', size: 'xs' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Xs</ItemTitle>
        <ItemDescription>{itemContract.docs.sizes.xs}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** No styling — media renders as-is. */
export const MediaDefault: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="default" title={itemContract.docs.mediaVariants.default}>
        <UserIcon className="size-8" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Default</ItemTitle>
        <ItemDescription>{itemContract.docs.mediaVariants.default}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Rounded icon badge background. */
export const MediaIcon: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon" title={itemContract.docs.mediaVariants.icon}>
        <CreditCardIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Icon</ItemTitle>
        <ItemDescription>{itemContract.docs.mediaVariants.icon}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** Fixed square image thumbnail. */
export const MediaImage: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="image" title={itemContract.docs.mediaVariants.image}>
        <img src="https://github.com/shadcn.png" alt="" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Image</ItemTitle>
        <ItemDescription>{itemContract.docs.mediaVariants.image}</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/** A grouped list of items with a separator, e.g. an account settings page. */
export const Group: Story = {
  render: (args) => (
    <ItemGroup className="w-full max-w-md">
      <Item {...args}>
        <ItemMedia variant="icon">
          <UserIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Profile</ItemTitle>
          <ItemDescription>Update your name, photo, and bio.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item {...args}>
        <ItemMedia variant="icon">
          <CreditCardIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Billing</ItemTitle>
          <ItemDescription>Manage your plan and payment methods.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item {...args}>
        <ItemMedia variant="icon">
          <BellIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Notifications</ItemTitle>
          <ItemDescription>Choose what you want to be notified about.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
};

/** `ItemHeader` and `ItemFooter` wrap content that spans the full width of the item, below the main row. */
export const WithHeaderAndFooter: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args} className="w-full max-w-md">
      <ItemHeader>
        <ItemTitle>Storage plan</ItemTitle>
        <span className="text-sm text-muted-foreground">80% used</span>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>You&apos;re approaching your storage limit.</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button variant="outline" size="sm">
          Manage storage
        </Button>
        <Button size="sm">Upgrade plan</Button>
      </ItemFooter>
    </Item>
  ),
};
