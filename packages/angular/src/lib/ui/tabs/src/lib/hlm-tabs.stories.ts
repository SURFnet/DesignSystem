import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { tabsContract } from '@surfnet/curve-contracts';

import {
  HlmButtonImports,
  HlmCardImports,
  HlmInputImports,
  HlmLabelImports,
} from '../../../../../public-api';
import { HlmTabs, HlmTabsImports, TabsListVariants } from '..';
import { BrnTabsOrientation } from '@spartan-ng/brain/tabs';

type TabsInputs = { orientation: BrnTabsOrientation } & TabsListVariants;

const meta: Meta<TabsInputs> = {
  title: 'Components/Tabs',
  component: HlmTabs,
  decorators: [
    moduleMetadata({
      imports: [HlmTabsImports, HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports],
    }),
  ],
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
};

export default meta;
type Story = StoryObj<TabsInputs>;

/** A realistic composed example — a settings panel switching between two forms. */
export const Default: Story = {
  render: (args) => ({
    template: `
      <hlm-tabs tab="account" class="w-96" orientation=${args.orientation}>
        <hlm-tabs-list aria-label="Settings" variant=${args.variant}>
          <button hlmTabsTrigger="account">Account</button>
          <button hlmTabsTrigger="password">Password</button>
        </hlm-tabs-list>
        <div hlmTabsContent="account">
          <section hlmCard>
            <div hlmCardHeader>
              <h3 hlmCardTitle>Account</h3>
              <p hlmCardDescription>Make changes to your account here. Click save when you're done.</p>
            </div>
            <div hlmCardContent class="grid gap-4">
              <label class="grid gap-1.5" hlmLabel>
                Name
                <input hlmInput value="Pedro Duarte" />
              </label>
              <label class="grid gap-1.5" hlmLabel>
                Username
                <input hlmInput value="@peduarte" />
              </label>
            </div>
            <div hlmCardFooter>
              <button hlmBtn>Save changes</button>
            </div>
          </section>
        </div>
        <div hlmTabsContent="password">
          <section hlmCard>
            <div hlmCardHeader>
              <h3 hlmCardTitle>Password</h3>
              <p hlmCardDescription>Change your password here. After saving, you'll be logged out.</p>
            </div>
            <div hlmCardContent class="grid gap-4">
              <label class="grid gap-1.5" hlmLabel>
                Current password
                <input hlmInput type="password" />
              </label>
              <label class="grid gap-1.5" hlmLabel>
                New password
                <input hlmInput type="password" />
              </label>
            </div>
            <div hlmCardFooter>
              <button hlmBtn>Save password</button>
            </div>
          </section>
        </div>
      </hlm-tabs>
    `,
  }),
};

/** Default variant — tabs with a bordered background. */
export const DefaultVariant: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" class="w-96">
        <hlm-tabs-list variant="default" title="${tabsContract.docs.variants.default}">
          <button hlmTabsTrigger="tab-1">First tab</button>
          <button hlmTabsTrigger="tab-2">Second tab</button>
          <button hlmTabsTrigger="tab-3">Third tab</button>
        </hlm-tabs-list>
        <div hlmTabsContent="tab-1" class="text-muted-foreground">
          ${tabsContract.docs.variants.default}
        </div>
      </hlm-tabs>
    `,
  }),
};

/** Underlined variant — tabs without a background, just an underline on the active tab. */
export const Line: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" class="w-96">
        <hlm-tabs-list variant="line" title="${tabsContract.docs.variants.line}">
          <button hlmTabsTrigger="tab-1">First tab</button>
          <button hlmTabsTrigger="tab-2">Second tab</button>
          <button hlmTabsTrigger="tab-3">Third tab</button>
        </hlm-tabs-list>
        <div hlmTabsContent="tab-1" class="text-muted-foreground">
          ${tabsContract.docs.variants.line}
        </div>
      </hlm-tabs>
    `,
  }),
};

/** Vertical orientation */
export const Vertical: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" orientation="vertical" class="w-96">
        <hlm-tabs-list>
          <button hlmTabsTrigger="tab-1">First tab</button>
          <button hlmTabsTrigger="tab-2">Second tab</button>
          <button hlmTabsTrigger="tab-3">Third tab</button>
        </hlm-tabs-list>
        <div hlmTabsContent="tab-1">Content for the first tab.</div>
        <div hlmTabsContent="tab-2">Content for the second tab.</div>
        <div hlmTabsContent="tab-3">Content for the third tab.</div>
      </hlm-tabs>
    `,
  }),
};

/** Vertical orientation with line variant. */
export const VerticalLine: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" orientation="vertical" class="w-96">
        <hlm-tabs-list variant="line">
          <button hlmTabsTrigger="tab-1">First tab</button>
          <button hlmTabsTrigger="tab-2">Second tab</button>
          <button hlmTabsTrigger="tab-3">Third tab</button>
        </hlm-tabs-list>
        <div hlmTabsContent="tab-1">Content for the first tab.</div>
        <div hlmTabsContent="tab-2">Content for the second tab.</div>
        <div hlmTabsContent="tab-3">Content for the third tab.</div>
      </hlm-tabs>
    `,
  }),
};

/** An individual trigger can be disabled independently of the rest of the tabs. */
export const DisabledTrigger: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" class="w-96">
        <hlm-tabs-list>
          <button hlmTabsTrigger="tab-1">First tab</button>
          <button hlmTabsTrigger="tab-2" disabled>Disabled tab</button>
          <button hlmTabsTrigger="tab-3">Third tab</button>
        </hlm-tabs-list>
        <div hlmTabsContent="tab-1">Content for the first tab.</div>
        <div hlmTabsContent="tab-3">Content for the third tab.</div>
      </hlm-tabs>
    `,
  }),
};
