import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorBell,
  phosphorCreditCard,
  phosphorGearSix,
  phosphorUser,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { itemContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmItem, HlmItemImports } from '..';

const meta: Meta<HlmItem> = {
  title: 'Components/Item',
  component: HlmItem,
  decorators: [
    moduleMetadata({
      imports: [HlmItemImports, HlmButton, NgIcon],
      providers: [
        provideIcons({ phosphorBell, phosphorCreditCard, phosphorGearSix, phosphorUser }),
      ],
    }),
  ],
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
      options: [...itemContract.props.variants],
      description: itemContract.props.variants
        .map((variant) => `\`${variant}\` — ${itemContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: itemContract.props.variants.join(' | '),
        },
        defaultValue: { summary: itemContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: [...itemContract.props.sizes],
      description: itemContract.props.sizes
        .map((size) => `\`${size}\` — ${itemContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: itemContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: itemContract.defaults.sizes },
      },
    },
  },
  args: {
    variant: itemContract.defaults.variants,
    size: itemContract.defaults.sizes,
  },
};

export default meta;

type Story = StoryObj<HlmItem>;

/** The default item — media, title, description, and an action; tweak variant/size via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div hlmItem ${argsToTemplate(args)} class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorBell" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Notifications</div>
          <div hlmItemDescription>Receive alerts about account activity.</div>
        </div>
        <div hlmItemActions>
          <button hlmBtn variant="outline" size="sm">Enable</button>
        </div>
      </div>
    `,
  }),
};

@Component({
  selector: 'item-variants',
  imports: [HlmItemImports, NgIcon],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      @for (variant of itemContract.props.variants; track variant) {
        <div hlmItem [variant]="variant" [title]="itemContract.docs.variants[variant]">
          <div hlmItemMedia variant="icon">
            <ng-icon name="phosphorGearSix" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>{{ variant.charAt(0).toUpperCase() + variant.slice(1) }}</div>
            <div hlmItemDescription>{{ itemContract.docs.variants[variant] }}</div>
          </div>
        </div>
      }
    </div>
  `,
})
class ItemVariants {
  @Input() itemContract!: typeof itemContract;
}

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ItemVariants],
    },
    props: { itemContract },
    template: '<item-variants [itemContract]="itemContract"></item-variants>',
  }),
};

@Component({
  selector: 'item-sizes',
  imports: [HlmItemImports, NgIcon],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      @for (size of itemContract.props.sizes; track size) {
        <div hlmItem variant="outline" [size]="size" [title]="itemContract.docs.sizes[size]">
          <div hlmItemMedia variant="icon">
            <ng-icon name="phosphorUser" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>{{ size.charAt(0).toUpperCase() + size.slice(1) }}</div>
            <div hlmItemDescription>{{ itemContract.docs.sizes[size] }}</div>
          </div>
        </div>
      }
    </div>
  `,
})
class ItemSizes {
  @Input() itemContract!: typeof itemContract;
}

/** Every size, from extra-compact to standard. */
export const Sizes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ItemSizes],
    },
    props: { itemContract },
    template: '<item-sizes [itemContract]="itemContract"></item-sizes>',
  }),
};

/**
 * `hlmItemMedia`'s own `variant` — a distinct axis from `hlmItem`'s. `icon` badges an icon,
 * `image` fixes a square thumbnail, `default` renders the media as-is.
 */
export const MediaVariants: Story = {
  render: () => ({
    template: `
      <div class="flex w-full max-w-md flex-col gap-3">
        <div hlmItem variant="outline">
          <div hlmItemMedia variant="default" title="${itemContract.docs.mediaVariants.default}">
            <ng-icon name="phosphorUser" size="2rem" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>Default</div>
            <div hlmItemDescription>${itemContract.docs.mediaVariants.default}</div>
          </div>
        </div>
        <div hlmItem variant="outline">
          <div hlmItemMedia variant="icon" title="${itemContract.docs.mediaVariants.icon}">
            <ng-icon name="phosphorCreditCard" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>Icon</div>
            <div hlmItemDescription>${itemContract.docs.mediaVariants.icon}</div>
          </div>
        </div>
        <div hlmItem variant="outline">
          <div hlmItemMedia variant="image" title="${itemContract.docs.mediaVariants.image}">
            <img src="https://github.com/shadcn.png" alt="" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>Image</div>
            <div hlmItemDescription>${itemContract.docs.mediaVariants.image}</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** A grouped list of items with a separator, e.g. an account settings page. */
export const Group: Story = {
  render: () => ({
    template: `
      <div hlmItemGroup class="w-full max-w-md">
        <div hlmItem>
          <div hlmItemMedia variant="icon">
            <ng-icon name="phosphorUser" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>Profile</div>
            <div hlmItemDescription>Update your name, photo, and bio.</div>
          </div>
          <div hlmItemActions>
            <button hlmBtn variant="outline" size="sm">Edit</button>
          </div>
        </div>
        <hlm-item-separator />
        <div hlmItem>
          <div hlmItemMedia variant="icon">
            <ng-icon name="phosphorCreditCard" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>Billing</div>
            <div hlmItemDescription>Manage your plan and payment methods.</div>
          </div>
          <div hlmItemActions>
            <button hlmBtn variant="outline" size="sm">Manage</button>
          </div>
        </div>
        <hlm-item-separator />
        <div hlmItem>
          <div hlmItemMedia variant="icon">
            <ng-icon name="phosphorBell" />
          </div>
          <div hlmItemContent>
            <div hlmItemTitle>Notifications</div>
            <div hlmItemDescription>Choose what you want to be notified about.</div>
          </div>
          <div hlmItemActions>
            <button hlmBtn variant="outline" size="sm">Configure</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/** `hlmItemHeader` and `hlmItemFooter` wrap content that spans the full width of the item, below the main row. */
export const WithHeaderAndFooter: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" class="w-full max-w-md">
        <div hlmItemHeader>
          <div hlmItemTitle>Storage plan</div>
          <span class="text-sm text-muted-foreground">80% used</span>
        </div>
        <div hlmItemContent>
          <div hlmItemDescription>You're approaching your storage limit.</div>
        </div>
        <div hlmItemFooter>
          <button hlmBtn variant="outline" size="sm">Manage storage</button>
          <button hlmBtn size="sm">Upgrade plan</button>
        </div>
      </div>
    `,
  }),
};
