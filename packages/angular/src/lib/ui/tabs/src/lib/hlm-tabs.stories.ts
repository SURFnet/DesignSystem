import { Component, Input } from '@angular/core';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { tabsContract } from '@surfnet/curve-contracts';

import {
  HlmButtonImports,
  HlmCardImports,
  HlmInputImports,
  HlmLabelImports,
} from '../../../../../public-api';
import { HlmTabs, HlmTabsImports } from '..';

const meta: Meta<HlmTabs> = {
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
  },
};

export default meta;
type Story = StoryObj<HlmTabs>;

/** A realistic composed example — a settings panel switching between two forms. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="account" class="block w-96">
        <hlm-tabs-list aria-label="Settings">
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

@Component({
  selector: 'tabs-variants',
  imports: [HlmTabsImports],
  template: `
    <div class="flex flex-col gap-8">
      @for (variant of tabsContract.props.variants; track variant) {
        <hlm-tabs tab="tab-1" class="block w-96">
          <hlm-tabs-list [variant]="variant" [title]="tabsContract.docs.variants[variant]">
            <button hlmTabsTrigger="tab-1">First tab</button>
            <button hlmTabsTrigger="tab-2">Second tab</button>
            <button hlmTabsTrigger="tab-3">Third tab</button>
          </hlm-tabs-list>
          <div hlmTabsContent="tab-1" class="text-muted-foreground">
            {{ tabsContract.docs.variants[variant] }}
          </div>
        </hlm-tabs>
      }
    </div>
  `,
})
class TabsVariants {
  @Input() tabsContract!: typeof tabsContract;
}

/** The `hlm-tabs-list` variants declared in the contract. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [TabsVariants],
    },
    props: { tabsContract: tabsContract },
    template: '<tabs-variants [tabsContract]="tabsContract"></tabs-variants>',
  }),
};

/** Vertical orientation moves roving focus to the up/down arrow keys. */
export const Vertical: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" orientation="vertical" class="block w-96">
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

/** An individual trigger can be disabled independently of the rest of the tabs. */
export const DisabledTrigger: Story = {
  render: () => ({
    template: `
      <hlm-tabs tab="tab-1" class="block w-96">
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
