import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorInfo, phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { tooltipContract } from '@surfnet/curve-contracts';
import { HlmButtonImports } from '../../../../../public-api';
import { HlmTooltip, HlmTooltipImports } from '..';

// `position`, `tooltipDisabled` (and the tooltip text itself, aliased to `hlmTooltip`) are
// contributed by the `BrnTooltip` host directive rather than `HlmTooltip` itself, so widen
// the story args to expose them as controls.
type TooltipArgs = HlmTooltip & {
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  tooltipDisabled: boolean;
};

const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  component: HlmTooltip,
  decorators: [
    moduleMetadata({
      imports: [HlmTooltipImports, HlmButtonImports, NgIcon],
      providers: [provideIcons({ phosphorInfo, phosphorPlus })],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: tooltipContract.docs.description,
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip text, bound via `[hlmTooltip]`.',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred side of the trigger the tooltip opens on (flips to stay in view).',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    tooltipDisabled: {
      control: 'boolean',
      description: 'Disables showing the tooltip.',
    },
  },
  args: {
    content: 'Add to library',
    position: 'top',
    tooltipDisabled: false,
  },
};

export default meta;

type Story = StoryObj<TooltipArgs>;

/** A button trigger with a short informative label — tweak it via the controls. */
export const Default: Story = {
  render: ({ content, ...args }) => ({
    props: { content, ...args },
    template: `<button hlmBtn variant="outline" [hlmTooltip]="content" ${argsToTemplate(args)}>Hover me</button>`,
  }),
};

@Component({
  selector: 'tooltip-placement',
  imports: [HlmTooltipImports, HlmButtonImports],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-8 p-12">
      @for (position of positions; track position) {
        <button
          hlmBtn
          variant="outline"
          [hlmTooltip]="'Positioned on the ' + position + '.'"
          [position]="position"
        >
          {{ position }}
        </button>
      }
    </div>
  `,
})
class TooltipPlacement {
  readonly positions = ['top', 'right', 'bottom', 'left'] as const;
}

/** The popup can open on any side of the trigger, flipping to stay in view. */
export const Placement: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [TooltipPlacement],
    },
    template: '<tooltip-placement></tooltip-placement>',
  }),
};

/** An icon-only action still needs an accessible name — the tooltip surfaces it visually too. */
export const IconTrigger: Story = {
  render: () => ({
    template: `
      <button hlmBtn variant="outline" size="icon" aria-label="Add item" [hlmTooltip]="'Add item'">
        <ng-icon name="phosphorPlus" />
      </button>
    `,
  }),
};

/** `hlmTooltip` also accepts a `TemplateRef`, so richer markup than plain text is possible. */
export const RichContent: Story = {
  render: () => ({
    template: `
      <ng-template #richContent>
        <div class="flex items-center gap-1.5">
          <ng-icon name="phosphorInfo" />
          <span>Syncs with your <strong>SURFdrive</strong> account.</span>
        </div>
      </ng-template>
      <button hlmBtn variant="outline" [hlmTooltip]="richContent">Storage</button>
    `,
  }),
};

/** Custom `showDelay` / `hideDelay` (in ms) require a deliberate hover before the popup appears. */
export const DelayedOpen: Story = {
  render: () => ({
    template: `
      <button hlmBtn variant="outline" [hlmTooltip]="'Appears after ~700ms'" [showDelay]="700" [hideDelay]="0">
        Hover and hold
      </button>
    `,
  }),
};
