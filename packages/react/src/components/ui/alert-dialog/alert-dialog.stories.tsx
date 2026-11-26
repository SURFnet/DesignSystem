import { WarningIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { alertDialogContract, type AlertDialogSizeName } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

// `size` lives on `AlertDialogContent`, not the root, so widen the story args to expose it.
type AlertDialogArgs = ComponentProps<typeof AlertDialog> & { size?: AlertDialogSizeName };

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component: alertDialogContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=22-307&p=f&t=vT3gKkMDSpQaeqci-0',
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: alertDialogContract.props.sizes,
      description: alertDialogContract.props.sizes
        .map((size) => `\`${size}\` — ${alertDialogContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: alertDialogContract.defaults.sizes },
      },
    },
  },
  args: {
    size: alertDialogContract.defaults.sizes,
  },
} satisfies Meta<AlertDialogArgs>;

export default meta;

type Story = StoryObj<AlertDialogArgs>;

/** The confirm/cancel pattern — interrupts the user before an irreversible action. */
export const Default: Story = {
  render: ({ size, ...args }) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline">Show dialog</Button>} />
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/** A destructive confirmation, using an icon in the media slot and a destructive action button. */
export const WithMedia: Story = {
  render: ({ size, ...args }) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="destructive">Delete account</Button>} />
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <WarningIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and all associated data. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/** The compact (`sm`) content size — footer buttons switch to a two-column grid. */
export const Small: Story = {
  args: { size: 'sm' },
  render: ({ size, ...args }) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline">Leave page</Button>} />
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
          <AlertDialogDescription>Your changes will be lost.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
