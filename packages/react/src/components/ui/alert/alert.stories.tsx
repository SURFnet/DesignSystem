import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';
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

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      {alertContract.props.variants.map((variant) => (
        <Alert key={variant} variant={variant} title={alertContract.docs.variants[variant]}>
          {variant === 'destructive' ? <WarningCircleIcon /> : <CheckCircleIcon />}
          <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</AlertTitle>
          <AlertDescription>{alertContract.docs.variants[variant]}</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

/** Destructive alert used to surface an error, with title and description. */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
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
