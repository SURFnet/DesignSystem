import { CheckCircleIcon, InfoIcon, WarningCircleIcon, WarningIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { alertContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
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
      options: alertContract.props.variants,
      description: 'Visual style of the alert.',
      table: {
        defaultValue: { summary: alertContract.defaults.variants },
      },
    },
  },
  args: {
    variant: alertContract.defaults.variants,
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default alert — rendered with an icon, title, and description; tweak the variant via controls. */
export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-96">
      <CheckCircleIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
    </Alert>
  ),
};

/** Info variant with info icon. */
export const Info: Story = {
  render: () => (
    <Alert variant="info" className="w-96">
      <InfoIcon />
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>New features are available in your dashboard.</AlertDescription>
    </Alert>
  ),
};

/** Success variant with check icon. */
export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-96">
      <CheckCircleIcon />
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your preferences have been updated successfully.</AlertDescription>
    </Alert>
  ),
};

/** Warning variant with warning icon. */
export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-96">
      <WarningIcon />
      <AlertTitle>Session expiring</AlertTitle>
      <AlertDescription>Your session will expire in 5 minutes. Save your work.</AlertDescription>
    </Alert>
  ),
};

/** Danger variant with error icon. */
export const Danger: Story = {
  render: () => (
    <Alert variant="danger" className="w-96">
      <WarningCircleIcon />
      <AlertTitle>Unable to process payment</AlertTitle>
      <AlertDescription>Please verify your billing details and try again.</AlertDescription>
    </Alert>
  ),
};

/** An action slot (e.g. a button) anchored to the top-right of the alert. */
export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <CheckCircleIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
};

/** Title only — no icon or description. */
export const TitleOnly: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Heads up, this action can&apos;t be undone.</AlertTitle>
    </Alert>
  ),
};
