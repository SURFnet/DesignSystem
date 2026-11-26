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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=122-10',
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

const renderTooltip =
  (label: string, attrs = ''): Story['render'] =>
  ({ content, ...args }) => ({
    props: { content, ...args },
    template: `
      <button hlmBtn variant="outline"${attrs} [hlmTooltip]="content" ${argsToTemplate(args)}>
        ${label}
      </button>
    `,
  });

/** A button trigger with a short informative label — tweak it via the controls. */
export const Default: Story = {
  render: renderTooltip('Hover me'),
};

/** The tooltip opens above the trigger. */
export const Top: Story = {
  args: { content: 'Positioned on the top.', position: 'top' },
  render: renderTooltip('Top'),
};

/** The tooltip opens to the right of the trigger. */
export const Right: Story = {
  args: { content: 'Positioned on the right.', position: 'right' },
  render: renderTooltip('Right'),
};

/** The tooltip opens below the trigger. */
export const Bottom: Story = {
  args: { content: 'Positioned on the bottom.', position: 'bottom' },
  render: renderTooltip('Bottom'),
};

/** The tooltip opens to the left of the trigger. */
export const Left: Story = {
  args: { content: 'Positioned on the left.', position: 'left' },
  render: renderTooltip('Left'),
};

/** An icon-only action still needs an accessible name — the tooltip surfaces it visually too. */
export const IconTrigger: Story = {
  args: { content: 'Add item' },
  render: renderTooltip('<ng-icon name="phosphorPlus" />', ' size="icon" aria-label="Add item"'),
};

/** `hlmTooltip` also accepts a `TemplateRef`, so richer markup than plain text is possible. */
export const RichContent: Story = {
  // The tooltip content is a template here, so the `content` text control does not apply.
  parameters: { controls: { exclude: ['content'] } },
  render: ({ content: _content, ...args }) => ({
    props: args,
    template: `
      <ng-template #richContent>
        <div class="flex items-center gap-1.5">
          <ng-icon name="phosphorInfo" />
          <span>Syncs with your <strong>SURFdrive</strong> account.</span>
        </div>
      </ng-template>
      <button hlmBtn variant="outline" [hlmTooltip]="richContent" ${argsToTemplate(args)}>Storage</button>
    `,
  }),
};

/** Custom `showDelay` / `hideDelay` (in ms) require a deliberate hover before the popup appears. */
export const DelayedOpen: Story = {
  args: { content: 'Appears after ~700ms' },
  render: renderTooltip('Hover and hold', ' [showDelay]="700" [hideDelay]="0"'),
};
