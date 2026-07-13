import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { dialogContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmInput } from '../../../input/src';
import { HlmLabel } from '../../../label/src';
import { HlmDialog, HlmDialogImports } from '..';

const meta: Meta<HlmDialog> = {
  title: 'Components/Dialog',
  component: HlmDialog,
  decorators: [
    moduleMetadata({
      imports: [HlmDialogImports, HlmButton, HlmInput, HlmLabel],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: dialogContract.docs.description,
      },
    },
  },
};

export default meta;

type Story = StoryObj<HlmDialog>;

/** A composed dialog with a trigger, a form, and a footer action. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-dialog>
        <button hlmDialogTrigger hlmBtn variant="outline">Edit profile</button>
        <hlm-dialog-content *hlmDialogPortal="let ctx">
          <hlm-dialog-header>
            <h2 hlmDialogTitle>Edit profile</h2>
            <p hlmDialogDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </hlm-dialog-header>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <label hlmLabel for="name">Name</label>
              <input hlmInput id="name" value="Pedro Duarte" />
            </div>
            <div class="grid gap-2">
              <label hlmLabel for="username">Username</label>
              <input hlmInput id="username" value="@peduarte" />
            </div>
          </div>
          <hlm-dialog-footer>
            <button hlmDialogClose hlmBtn variant="outline">Cancel</button>
            <button hlmBtn type="submit">Save changes</button>
          </hlm-dialog-footer>
        </hlm-dialog-content>
      </hlm-dialog>
    `,
  }),
};

/**
 * `showCloseButton="false"` on `hlm-dialog-content` hides the corner close icon; pair it
 * with a `hlmDialogClose` button in the footer to give the user a single, explicit way to
 * dismiss.
 */
export const WithoutCloseButton: Story = {
  render: () => ({
    template: `
      <hlm-dialog>
        <button hlmDialogTrigger hlmBtn variant="outline">Show terms</button>
        <hlm-dialog-content [showCloseButton]="false" *hlmDialogPortal="let ctx">
          <hlm-dialog-header>
            <h2 hlmDialogTitle>Terms of service</h2>
            <p hlmDialogDescription>
              Please read and accept our terms of service before continuing.
            </p>
          </hlm-dialog-header>
          <hlm-dialog-footer>
            <button hlmDialogClose hlmBtn>Accept</button>
          </hlm-dialog-footer>
        </hlm-dialog-content>
      </hlm-dialog>
    `,
  }),
};
