import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { popoverContract } from '@surfnet/curve-contracts';

import { HlmButtonImports } from '../../../button/src';
import { HlmInputImports } from '../../../input/src';
import { HlmLabelImports } from '../../../label/src';
import { HlmPopover, HlmPopoverImports } from '..';

const meta: Meta<HlmPopover> = {
  title: 'Components/Popover',
  component: HlmPopover,
  decorators: [
    moduleMetadata({
      imports: [HlmPopoverImports, HlmButtonImports, HlmInputImports, HlmLabelImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: popoverContract.docs.description,
      },
    },
  },
};

export default meta;

type Story = StoryObj<HlmPopover>;

/** A composed popover with a heading, description, and a small form. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-popover sideOffset="5">
        <button hlmPopoverTrigger hlmBtn variant="outline">Open popover</button>
        <hlm-popover-content class="grid w-72 gap-4" *hlmPopoverPortal="let ctx">
          <div class="space-y-2">
            <h4 class="leading-none font-medium">Dimensions</h4>
            <p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <label hlmLabel for="width">Width</label>
              <input hlmInput id="width" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label hlmLabel for="maxWidth">Max. width</label>
              <input hlmInput id="maxWidth" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label hlmLabel for="height">Height</label>
              <input hlmInput id="height" value="25px" class="col-span-2 h-8" />
            </div>
          </div>
        </hlm-popover-content>
      </hlm-popover>
    `,
  }),
};

/** The popup can align to the start, center, or end of the trigger. */
export const Align: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center justify-center gap-8 p-12">
        ${(['start', 'center', 'end'] as const)
          .map(
            (align) => `
              <hlm-popover sideOffset="5" align="${align}">
                <button hlmPopoverTrigger hlmBtn variant="outline">${align}</button>
                <hlm-popover-content class="w-48" *hlmPopoverPortal="let ctx">
                  <p class="text-sm">Aligned to ${align}.</p>
                </hlm-popover-content>
              </hlm-popover>
            `,
          )
          .join('')}
      </div>
    `,
  }),
};
