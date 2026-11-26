import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCalendarBlank } from '@ng-icons/phosphor-icons/regular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { hoverCardContract } from '@surfnet/curve-contracts';

import { HlmAvatarImports } from '../../../avatar/src';
import { HlmButton } from '../../../button/src';
import { HlmHoverCard, HlmHoverCardImports } from '..';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

/**
 * `side` is a story arg for where the card opens relative to the trigger. Spartan calls this
 * input `align` on `hlmHoverCardTrigger`; the arg keeps React's name for parity.
 */
type HoverCardArgs = HlmHoverCard & { side: (typeof SIDES)[number] };

const meta: Meta<HoverCardArgs> = {
  title: 'Components/HoverCard',
  component: HlmHoverCard,
  decorators: [
    moduleMetadata({
      imports: [HlmHoverCardImports, HlmAvatarImports, HlmButton, NgIcon],
      providers: [provideIcons({ phosphorCalendarBlank })],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: hoverCardContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=216-2886',
    },
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: [...SIDES],
      description: 'Which side of the trigger the card opens on.',
      table: {
        type: { summary: SIDES.join(' | ') },
        defaultValue: { summary: 'bottom' },
      },
    },
  },
  args: {
    side: 'bottom',
  },
};

export default meta;

type Story = StoryObj<HoverCardArgs>;

/** A profile preview shown when hovering (or focusing) the trigger. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-hover-card>
        <button hlmBtn variant="link" class="px-0" hlmHoverCardTrigger [align]="side">&#64;surfnet</button>
        <hlm-hover-card-content *hlmHoverCardPortal>
          <div class="flex gap-3">
            <hlm-avatar>
              <img hlmAvatarImage src="https://i.pravatar.cc/80?img=5" alt="&#64;surfnet">
              <span hlmAvatarFallback>SF</span>
            </hlm-avatar>
            <div class="flex flex-col gap-1">
              <p class="text-sm font-medium">&#64;surfnet</p>
              <p class="text-sm text-muted-foreground">
                Dutch collaborative organisation for IT in education and research.
              </p>
              <div class="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                <ng-icon name="phosphorCalendarBlank" />
                <span>Joined December 2010</span>
              </div>
            </div>
          </div>
        </hlm-hover-card-content>
      </hlm-hover-card>
    `,
  }),
};

/** HoverCard opens above the trigger. */
export const AlignTop: Story = {
  args: { side: 'top' },
  render: (args) => ({
    props: args,
    template: `
      <hlm-hover-card>
        <button hlmHoverCardTrigger hlmBtn variant="outline" [align]="side">Top</button>
        <hlm-hover-card-content *hlmHoverCardPortal class="w-48">
          <p class="text-sm">Positioned on the top.</p>
        </hlm-hover-card-content>
      </hlm-hover-card>
    `,
  }),
};

/** HoverCard opens to the right of the trigger. */
export const AlignRight: Story = {
  args: { side: 'right' },
  render: (args) => ({
    props: args,
    template: `
      <hlm-hover-card>
        <button hlmHoverCardTrigger hlmBtn variant="outline" [align]="side">Right</button>
        <hlm-hover-card-content *hlmHoverCardPortal class="w-48">
          <p class="text-sm">Positioned on the right.</p>
        </hlm-hover-card-content>
      </hlm-hover-card>
    `,
  }),
};

/** HoverCard opens below the trigger. */
export const AlignBottom: Story = {
  args: { side: 'bottom' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center p-12">
        <hlm-hover-card>
          <button hlmHoverCardTrigger hlmBtn variant="outline" [align]="side">Bottom</button>
          <hlm-hover-card-content *hlmHoverCardPortal class="w-48">
            <p class="text-sm">Positioned on the bottom.</p>
          </hlm-hover-card-content>
        </hlm-hover-card>
      </div>
    `,
  }),
};

/** HoverCard opens to the left of the trigger. */
export const AlignLeft: Story = {
  args: { side: 'left' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center p-12">
        <hlm-hover-card>
          <button hlmHoverCardTrigger hlmBtn variant="outline" [align]="side">Left</button>
          <hlm-hover-card-content *hlmHoverCardPortal class="w-48">
            <p class="text-sm">Positioned on the left.</p>
          </hlm-hover-card-content>
        </hlm-hover-card>
      </div>
    `,
  }),
};

/** The trigger renders an anchor by default, so inline text links work without extra markup. */
export const TextTrigger: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p class="max-w-sm text-sm">
        Curve is maintained by
        <hlm-hover-card>
          <a href="#" hlmHoverCardTrigger [align]="side" class="font-medium underline underline-offset-4">SURF</a>
          <hlm-hover-card-content *hlmHoverCardPortal>
            <p class="text-sm">
              SURF is the collaborative organisation for IT in Dutch education and research.
            </p>
          </hlm-hover-card-content>
        </hlm-hover-card>
        , providing a shared design system for React and Angular.
      </p>
    `,
  }),
};
