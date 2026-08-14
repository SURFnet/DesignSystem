import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { sheetContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmInput } from '../../../input/src';
import { HlmLabel } from '../../../label/src';
import { HlmSheet, HlmSheetImports } from '..';

const meta: Meta<HlmSheet> = {
  title: 'Components/Sheet',
  component: HlmSheet,
  decorators: [
    moduleMetadata({
      imports: [HlmSheetImports, HlmButton, HlmInput, HlmLabel],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: sheetContract.docs.description,
      },
    },
  },
};

export default meta;

type Story = StoryObj<HlmSheet>;

/** A composed sheet with a trigger, a form, and a footer action — slides in from the right. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-sheet side="right">
        <button id="edit-profile" hlmSheetTrigger hlmBtn variant="outline">Edit profile</button>
        <hlm-sheet-content *hlmSheetPortal="let ctx">
          <hlm-sheet-header>
            <h3 hlmSheetTitle>Edit profile</h3>
            <p hlmSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </hlm-sheet-header>
          <div class="grid gap-4 px-4">
            <div class="grid gap-2">
              <label hlmLabel for="sheet-name">Name</label>
              <input hlmInput id="sheet-name" value="Pedro Duarte" />
            </div>
            <div class="grid gap-2">
              <label hlmLabel for="sheet-username">Username</label>
              <input hlmInput id="sheet-username" value="@peduarte" />
            </div>
          </div>
          <hlm-sheet-footer>
            <button hlmBtn type="submit">Save changes</button>
            <button hlmSheetClose hlmBtn variant="outline">Cancel</button>
          </hlm-sheet-footer>
        </hlm-sheet-content>
      </hlm-sheet>
    `,
  }),
};

/**
 * `[showCloseButton]="false"` on `hlm-sheet-content` hides the corner close icon — pair it with
 * an explicit `hlmSheetClose` action in the footer so the user still has a way to dismiss.
 */
export const WithoutCloseButton: Story = {
  render: () => ({
    template: `
      <hlm-sheet side="right">
        <button hlmSheetTrigger hlmBtn variant="outline">Show terms</button>
        <hlm-sheet-content [showCloseButton]="false" *hlmSheetPortal="let ctx">
          <hlm-sheet-header>
            <h3 hlmSheetTitle>Terms of service</h3>
            <p hlmSheetDescription>
              Please read and accept our terms of service before continuing.
            </p>
          </hlm-sheet-header>
          <hlm-sheet-footer>
            <button hlmSheetClose hlmBtn variant="outline">Close</button>
          </hlm-sheet-footer>
        </hlm-sheet-content>
      </hlm-sheet>
    `,
  }),
};

/** Every edge the sheet can slide in from, set via `side` on `hlm-sheet`. */
export const Sides: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <hlm-sheet side="top">
          <button hlmSheetTrigger hlmBtn variant="outline">Top</button>
          <hlm-sheet-content *hlmSheetPortal="let ctx">
            <hlm-sheet-header>
              <h3 hlmSheetTitle>Top sheet</h3>
              <p hlmSheetDescription>Slides in from the top of the screen.</p>
            </hlm-sheet-header>
            <hlm-sheet-footer>
              <button hlmSheetClose hlmBtn variant="outline">Close</button>
            </hlm-sheet-footer>
          </hlm-sheet-content>
        </hlm-sheet>
        <hlm-sheet side="right">
          <button hlmSheetTrigger hlmBtn variant="outline">Right</button>
          <hlm-sheet-content *hlmSheetPortal="let ctx">
            <hlm-sheet-header>
              <h3 hlmSheetTitle>Right sheet</h3>
              <p hlmSheetDescription>Slides in from the right of the screen.</p>
            </hlm-sheet-header>
            <hlm-sheet-footer>
              <button hlmSheetClose hlmBtn variant="outline">Close</button>
            </hlm-sheet-footer>
          </hlm-sheet-content>
        </hlm-sheet>
        <hlm-sheet side="bottom">
          <button hlmSheetTrigger hlmBtn variant="outline">Bottom</button>
          <hlm-sheet-content *hlmSheetPortal="let ctx">
            <hlm-sheet-header>
              <h3 hlmSheetTitle>Bottom sheet</h3>
              <p hlmSheetDescription>Slides in from the bottom of the screen.</p>
            </hlm-sheet-header>
            <hlm-sheet-footer>
              <button hlmSheetClose hlmBtn variant="outline">Close</button>
            </hlm-sheet-footer>
          </hlm-sheet-content>
        </hlm-sheet>
        <hlm-sheet side="left">
          <button hlmSheetTrigger hlmBtn variant="outline">Left</button>
          <hlm-sheet-content *hlmSheetPortal="let ctx">
            <hlm-sheet-header>
              <h3 hlmSheetTitle>Left sheet</h3>
              <p hlmSheetDescription>Slides in from the left of the screen.</p>
            </hlm-sheet-header>
            <hlm-sheet-footer>
              <button hlmSheetClose hlmBtn variant="outline">Close</button>
            </hlm-sheet-footer>
          </hlm-sheet-content>
        </hlm-sheet>
      </div>
    `,
  }),
};
