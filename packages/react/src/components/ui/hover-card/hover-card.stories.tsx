import { CalendarBlankIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { hoverCardContract } from '@surfnet/curve-contracts';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    docs: {
      description: {
        component: hoverCardContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A profile preview shown when hovering (or focusing) the trigger. */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Button variant="link" className="px-0">
            @surfnet
          </Button>
        }
      />
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="@surfnet" />
            <AvatarFallback>SF</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">@surfnet</p>
            <p className="text-sm text-muted-foreground">
              Dutch collaborative organisation for IT in education and research.
            </p>
            <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
              <CalendarBlankIcon />
              <span>Joined December 2010</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

/** The popup can open on any side of the trigger, flipping to stay in view. */
export const Placement: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger render={<Button variant="outline">{side}</Button>} />
          <HoverCardContent side={side} className="w-48">
            <p className="text-sm">Positioned on the {side}.</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

/** The trigger renders an anchor by default, so inline text links work without extra markup. */
export const TextTrigger: Story = {
  render: () => (
    <p className="max-w-sm text-sm">
      Curve is maintained by{' '}
      <HoverCard>
        <HoverCardTrigger href="#" className="font-medium underline underline-offset-4">
          SURF
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm">
            SURF is the collaborative organisation for IT in Dutch education and research.
          </p>
        </HoverCardContent>
      </HoverCard>
      , providing a shared design system for React and Angular.
    </p>
  ),
};
