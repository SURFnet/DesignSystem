import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { popoverContract } from '@surfnet/curve-contracts';

import { HlmButtonImports } from '../../../button/src';
import { HlmInputImports } from '../../../input/src';
import { HlmLabelImports } from '../../../label/src';
import { HlmPopover, HlmPopoverImports } from '..';

// `align` is contributed by the BrnPopover host directive rather than HlmPopover itself,
// so widen the story args to expose it as a control.
type PopoverArgs = HlmPopover & { align: 'start' | 'center' | 'end' };

const meta: Meta<PopoverArgs> = {
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=193-1388',
    },
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Where the popup is aligned relative to its trigger.',
      table: { defaultValue: { summary: 'center' } },
    },
  },
  args: {
    align: 'center',
  },
};

export default meta;

type Story = StoryObj<PopoverArgs>;

/** A composed popover with a heading, description, and a small form. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-popover sideOffset="5" [align]="align">
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

/** The popup can align to the start of the trigger. */
export const AlignStart: Story = {
  args: { align: 'start' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center p-12">
        <hlm-popover sideOffset="5" [align]="align">
          <button hlmPopoverTrigger hlmBtn variant="outline">Start</button>
          <hlm-popover-content class="w-48" *hlmPopoverPortal="let ctx">
            <p class="text-sm">Aligned to start.</p>
          </hlm-popover-content>
        </hlm-popover>
      </div>
    `,
  }),
};

/** The popup can align to the center of the trigger. */
export const AlignCenter: Story = {
  args: { align: 'center' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center p-12">
        <hlm-popover sideOffset="5" [align]="align">
          <button hlmPopoverTrigger hlmBtn variant="outline">Center</button>
          <hlm-popover-content class="w-48" *hlmPopoverPortal="let ctx">
            <p class="text-sm">Aligned to center.</p>
          </hlm-popover-content>
        </hlm-popover>
      </div>
    `,
  }),
};

/** The popup can align to the end of the trigger. */
export const AlignEnd: Story = {
  args: { align: 'end' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center p-12">
        <hlm-popover sideOffset="5" [align]="align">
          <button hlmPopoverTrigger hlmBtn variant="outline">End</button>
          <hlm-popover-content class="w-48" *hlmPopoverPortal="let ctx">
            <p class="text-sm">Aligned to end.</p>
          </hlm-popover-content>
        </hlm-popover>
      </div>
    `,
  }),
};
