import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCalendarBlank } from '@ng-icons/phosphor-icons/regular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { hoverCardContract } from '@surfnet/curve-contracts';

import { HlmAvatarImports } from '../../../avatar/src';
import { HlmButton } from '../../../button/src';
import { HlmHoverCard, HlmHoverCardImports } from '..';

const meta: Meta<HlmHoverCard> = {
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
  },
};

export default meta;

type Story = StoryObj<HlmHoverCard>;

/** A profile preview shown when hovering (or focusing) the trigger. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-hover-card>
        <button hlmBtn variant="link" class="px-0" hlmHoverCardTrigger>&#64;surfnet</button>
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

/** The popup can open on any side of the trigger. */
export const Placement: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center justify-center gap-8 p-12">
        ${(['top', 'right', 'bottom', 'left'] as const)
          .map(
            (side) => `
              <hlm-hover-card>
                <button hlmBtn variant="outline" hlmHoverCardTrigger align="${side}">${side}</button>
                <hlm-hover-card-content *hlmHoverCardPortal class="w-48">
                  <p class="text-sm">Positioned on the ${side}.</p>
                </hlm-hover-card-content>
              </hlm-hover-card>
            `,
          )
          .join('')}
      </div>
    `,
  }),
};

/** Any focusable element can act as the trigger, e.g. plain text. */
export const TextTrigger: Story = {
  render: () => ({
    template: `
      <p class="max-w-sm text-sm">
        Curve is maintained by
        <hlm-hover-card>
          <a href="#" hlmHoverCardTrigger class="font-medium underline underline-offset-4">SURF</a>
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
