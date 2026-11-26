import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorWarning } from '@ng-icons/phosphor-icons/regular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { alertDialogContract, type AlertDialogSizeName } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmAlertDialog, HlmAlertDialogImports } from '..';

// `size` lives on `hlm-alert-dialog-content`, not the root, so widen the story args to expose it.
type AlertDialogArgs = HlmAlertDialog & { size: AlertDialogSizeName };

const meta: Meta<AlertDialogArgs> = {
  title: 'Components/AlertDialog',
  component: HlmAlertDialog,
  decorators: [
    moduleMetadata({
      imports: [HlmAlertDialogImports, HlmButton, NgIcon],
      providers: [provideIcons({ phosphorWarning })],
    }),
  ],
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
      options: [...alertDialogContract.props.sizes],
      description: alertDialogContract.props.sizes
        .map((size) => `\`${size}\` — ${alertDialogContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: alertDialogContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: alertDialogContract.defaults.sizes },
      },
    },
  },
  args: {
    size: alertDialogContract.defaults.sizes,
  },
};

export default meta;

type Story = StoryObj<AlertDialogArgs>;

/** The confirm/cancel pattern — interrupts the user before an irreversible action. */
export const Default: Story = {
  render: ({ size }) => ({
    props: { size },
    template: `
      <hlm-alert-dialog>
        <button hlmAlertDialogTrigger hlmBtn variant="outline">Show dialog</button>
        <hlm-alert-dialog-content [size]="size" *hlmAlertDialogPortal="let ctx">
          <hlm-alert-dialog-header>
            <h2 hlmAlertDialogTitle>Are you absolutely sure?</h2>
            <p hlmAlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </p>
          </hlm-alert-dialog-header>
          <hlm-alert-dialog-footer>
            <button hlmAlertDialogCancel>Cancel</button>
            <button hlmAlertDialogAction>Continue</button>
          </hlm-alert-dialog-footer>
        </hlm-alert-dialog-content>
      </hlm-alert-dialog>
    `,
  }),
};

/** A destructive confirmation, using an icon in the media slot and a destructive action button. */
export const WithMedia: Story = {
  render: ({ size }) => ({
    props: { size },
    template: `
      <hlm-alert-dialog>
        <button hlmAlertDialogTrigger hlmBtn variant="destructive">Delete account</button>
        <hlm-alert-dialog-content [size]="size" *hlmAlertDialogPortal="let ctx">
          <hlm-alert-dialog-header>
            <div hlmAlertDialogMedia>
              <ng-icon name="phosphorWarning" />
            </div>
            <h2 hlmAlertDialogTitle>Delete account?</h2>
            <p hlmAlertDialogDescription>
              This will permanently delete your account and all associated data. This action
              cannot be undone.
            </p>
          </hlm-alert-dialog-header>
          <hlm-alert-dialog-footer>
            <button hlmAlertDialogCancel>Cancel</button>
            <button hlmAlertDialogAction variant="destructive">Delete account</button>
          </hlm-alert-dialog-footer>
        </hlm-alert-dialog-content>
      </hlm-alert-dialog>
    `,
  }),
};

/** The compact (`sm`) content size — footer buttons switch to a two-column grid. */
export const Small: Story = {
  args: { size: 'sm' },
  render: ({ size }) => ({
    props: { size },
    template: `
      <hlm-alert-dialog>
        <button hlmAlertDialogTrigger hlmBtn variant="outline">Leave page</button>
        <hlm-alert-dialog-content [size]="size" *hlmAlertDialogPortal="let ctx">
          <hlm-alert-dialog-header>
            <h2 hlmAlertDialogTitle>Leave without saving?</h2>
            <p hlmAlertDialogDescription>Your changes will be lost.</p>
          </hlm-alert-dialog-header>
          <hlm-alert-dialog-footer>
            <button hlmAlertDialogCancel>Stay</button>
            <button hlmAlertDialogAction>Leave</button>
          </hlm-alert-dialog-footer>
        </hlm-alert-dialog-content>
      </hlm-alert-dialog>
    `,
  }),
};
