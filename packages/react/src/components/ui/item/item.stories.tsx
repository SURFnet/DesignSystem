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

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      {itemContract.props.variants.map((variant) => (
        <Item key={variant} variant={variant} title={itemContract.docs.variants[variant]}>
          <ItemMedia variant="icon">
            <GearSixIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</ItemTitle>
            <ItemDescription>{itemContract.docs.variants[variant]}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

/** Every size, from extra-compact to standard. */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      {itemContract.props.sizes.map((size) => (
        <Item key={size} variant="outline" size={size} title={itemContract.docs.sizes[size]}>
          <ItemMedia variant="icon">
            <UserIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{size.charAt(0).toUpperCase() + size.slice(1)}</ItemTitle>
            <ItemDescription>{itemContract.docs.sizes[size]}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

/**
 * `ItemMedia`'s own `variant` — a distinct axis from `Item`'s. `icon` badges an icon,
 * `image` fixes a square thumbnail, `default` renders the media as-is.
 */
export const MediaVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item variant="outline">
        <ItemMedia variant="default" title={itemContract.docs.mediaVariants.default}>
          <UserIcon className="size-8" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>{itemContract.docs.mediaVariants.default}</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon" title={itemContract.docs.mediaVariants.icon}>
          <CreditCardIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Icon</ItemTitle>
          <ItemDescription>{itemContract.docs.mediaVariants.icon}</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="image" title={itemContract.docs.mediaVariants.image}>
          <img src="https://github.com/shadcn.png" alt="" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Image</ItemTitle>
          <ItemDescription>{itemContract.docs.mediaVariants.image}</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

/** A grouped list of items with a separator, e.g. an account settings page. */
export const Group: Story = {
  render: () => (
    <ItemGroup className="w-full max-w-md">
      <Item>
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
      <Item>
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
      <Item>
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
  render: () => (
    <Item variant="outline" className="w-full max-w-md">
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
