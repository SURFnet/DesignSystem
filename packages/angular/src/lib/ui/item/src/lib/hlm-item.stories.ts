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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18709-94348&t=e05qWfQcPmc0GJEw-4',
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

/** No border, transparent background. */
export const DefaultVariant: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="default" class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorGearSix" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Default</div>
          <div hlmItemDescription>${itemContract.docs.variants.default}</div>
        </div>
      </div>
    `,
  }),
};

/** Bordered container. */
export const Outline: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorGearSix" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Outline</div>
          <div hlmItemDescription>${itemContract.docs.variants.outline}</div>
        </div>
      </div>
    `,
  }),
};

/** Subtle muted background, no border. */
export const Muted: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="muted" class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorGearSix" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Muted</div>
          <div hlmItemDescription>${itemContract.docs.variants.muted}</div>
        </div>
      </div>
    `,
  }),
};

/** Standard padding and gaps. */
export const SizeDefault: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" size="default" class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorUser" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Default</div>
          <div hlmItemDescription>${itemContract.docs.sizes.default}</div>
        </div>
      </div>
    `,
  }),
};

/** Compact padding and gaps. */
export const SizeSm: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" size="sm" class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorUser" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Sm</div>
          <div hlmItemDescription>${itemContract.docs.sizes.sm}</div>
        </div>
      </div>
    `,
  }),
};

/** Extra compact — dense lists such as menus. */
export const SizeXs: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" size="xs" class="w-full max-w-md">
        <div hlmItemMedia variant="icon">
          <ng-icon name="phosphorUser" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Xs</div>
          <div hlmItemDescription>${itemContract.docs.sizes.xs}</div>
        </div>
      </div>
    `,
  }),
};

/** No styling — media renders as-is. */
export const MediaDefault: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" class="w-full max-w-md">
        <div hlmItemMedia variant="default" title="${itemContract.docs.mediaVariants.default}">
          <ng-icon name="phosphorUser" size="2rem" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Default</div>
          <div hlmItemDescription>${itemContract.docs.mediaVariants.default}</div>
        </div>
      </div>
    `,
  }),
};

/** Rounded icon badge background. */
export const MediaIcon: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" class="w-full max-w-md">
        <div hlmItemMedia variant="icon" title="${itemContract.docs.mediaVariants.icon}">
          <ng-icon name="phosphorCreditCard" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Icon</div>
          <div hlmItemDescription>${itemContract.docs.mediaVariants.icon}</div>
        </div>
      </div>
    `,
  }),
};

/** Fixed square image thumbnail. */
export const MediaImage: Story = {
  render: () => ({
    template: `
      <div hlmItem variant="outline" class="w-full max-w-md">
        <div hlmItemMedia variant="image" title="${itemContract.docs.mediaVariants.image}">
          <img src="https://github.com/shadcn.png" alt="" />
        </div>
        <div hlmItemContent>
          <div hlmItemTitle>Image</div>
          <div hlmItemDescription>${itemContract.docs.mediaVariants.image}</div>
        </div>
      </div>
    `,
  }),
};

/** A grouped list of items with a separator, e.g. an account settings page. */
export const Group: Story = {
  render: () => ({
    template: `
      <ul hlmItemGroup class="w-full max-w-md">
        <li hlmItem>
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
        </li>
        <li aria-hidden="true"><hlm-item-separator /></li>
        <li hlmItem>
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
        </li>
        <li aria-hidden="true"><hlm-item-separator /></li>
        <li hlmItem>
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
        </li>
      </ul>
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
