import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorWarning } from '@ng-icons/phosphor-icons/regular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { alertDialogContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmAlertDialog, HlmAlertDialogImports } from '..';

const meta: Meta<HlmAlertDialog> = {
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
  },
};

export default meta;

type Story = StoryObj<HlmAlertDialog>;

/** The confirm/cancel pattern — interrupts the user before an irreversible action. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-alert-dialog>
        <button hlmAlertDialogTrigger hlmBtn variant="outline">Show dialog</button>
        <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx">
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
  render: () => ({
    template: `
      <hlm-alert-dialog>
        <button hlmAlertDialogTrigger hlmBtn variant="destructive">Delete account</button>
        <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx">
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
  render: () => ({
    template: `
      <hlm-alert-dialog>
        <button hlmAlertDialogTrigger hlmBtn variant="outline">Leave page</button>
        <hlm-alert-dialog-content size="sm" *hlmAlertDialogPortal="let ctx">
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
