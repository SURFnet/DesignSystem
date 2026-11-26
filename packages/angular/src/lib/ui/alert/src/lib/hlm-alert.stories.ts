import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircle,
  phosphorInfo,
  phosphorWarning,
  phosphorWarningCircle,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { alertContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src/lib/hlm-button';
import { HlmAlert, HlmAlertImports } from '..';

const meta: Meta<HlmAlert> = {
  title: 'Components/Alert',
  component: HlmAlert,
  decorators: [
    moduleMetadata({
      imports: [HlmAlertImports, HlmButton, NgIcon],
      providers: [
        provideIcons({ phosphorCheckCircle, phosphorInfo, phosphorWarning, phosphorWarningCircle }),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: alertContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=21-322&p=f&t=vT3gKkMDSpQaeqci-0',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [...alertContract.props.variants],
      description: 'Visual style of the alert.',
      table: {
        type: {
          summary: alertContract.props.variants.join(' | '),
        },
        defaultValue: { summary: alertContract.defaults.variants },
      },
    },
  },
  args: {
    variant: alertContract.defaults.variants,
  },
};

export default meta;

type Story = StoryObj<HlmAlert>;

/** The default alert — rendered with an icon, title, and description; tweak the variant via controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-alert class="w-96" ${argsToTemplate(args)}>
        <ng-icon name="phosphorCheckCircle" />
        <h5 hlmAlertTitle>Update available</h5>
        <p hlmAlertDescription>A new version is ready to install.</p>
      </hlm-alert>
    `,
  }),
};

/** Info variant with info icon. */
export const Info: Story = {
  render: () => ({
    template: `
      <div hlmAlert variant="info" class="w-96">
        <ng-icon name="phosphorInfo" />
        <h5 hlmAlertTitle>Notification</h5>
        <p hlmAlertDescription>New features are available in your dashboard.</p>
      </div>
    `,
  }),
};

/** Success variant with check icon. */
export const Success: Story = {
  render: () => ({
    template: `
      <div hlmAlert variant="success" class="w-96">
        <ng-icon name="phosphorCheckCircle" />
        <h5 hlmAlertTitle>Changes saved</h5>
        <p hlmAlertDescription>Your preferences have been updated successfully.</p>
      </div>
    `,
  }),
};

/** Warning variant with warning icon. */
export const Warning: Story = {
  render: () => ({
    template: `
      <div hlmAlert variant="warning" class="w-96">
        <ng-icon name="phosphorWarning" />
        <h5 hlmAlertTitle>Session expiring</h5>
        <p hlmAlertDescription>Your session will expire in 5 minutes. Save your work.</p>
      </div>
    `,
  }),
};

/** Danger variant with error icon. */
export const Danger: Story = {
  render: () => ({
    template: `
      <div hlmAlert variant="danger" class="w-96">
        <ng-icon name="phosphorWarningCircle" />
        <h5 hlmAlertTitle>Unable to process payment</h5>
        <p hlmAlertDescription>Please verify your billing details and try again.</p>
      </div>
    `,
  }),
};

/** An action slot (e.g. a button) anchored to the top-right of the alert. */
export const WithAction: Story = {
  render: () => ({
    template: `
      <div hlmAlert class="w-96">
        <ng-icon name="phosphorCheckCircle" />
        <h5 hlmAlertTitle>Update available</h5>
        <p hlmAlertDescription>A new version is ready to install.</p>
        <div hlmAlertAction>
          <button hlmBtn size="sm" variant="outline">Update</button>
        </div>
      </div>
    `,
  }),
};

/** Title only — no icon or description. */
export const TitleOnly: Story = {
  render: () => ({
    template: `
      <div hlmAlert class="w-96">
        <h5 hlmAlertTitle>Heads up, this action can't be undone.</h5>
      </div>
    `,
  }),
};
