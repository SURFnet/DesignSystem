import { CalendarBlankIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { hoverCardContract } from '@surfnet/curve-contracts';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

/** `side` is a story arg for the `HoverCardContent`: where the card opens relative to the trigger. */
type HoverCardArgs = ComponentProps<typeof HoverCard> & { side?: (typeof SIDES)[number] };

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
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
      options: SIDES,
      description: 'Which side of the trigger the card opens on.',
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
  },
  args: {
    side: 'bottom',
  },
} satisfies Meta<HoverCardArgs>;

export default meta;

type Story = StoryObj<HoverCardArgs>;

/** A profile preview shown when hovering (or focusing) the trigger. */
export const Default: Story = {
  render: ({ side }) => (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Button variant="link" className="px-0">
            @surfnet
          </Button>
        }
      />
      <HoverCardContent side={side}>
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

/** HoverCard opens above the trigger. */
export const SideTop: Story = {
  args: { side: 'top' },
  render: ({ side }) => (
    <div className="flex items-center justify-center p-12">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Top</Button>} />
        <HoverCardContent side={side} className="w-48">
          <p className="text-sm">Positioned on the top.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/** HoverCard opens to the right of the trigger. */
export const SideRight: Story = {
  args: { side: 'right' },
  render: ({ side }) => (
    <div className="flex items-center justify-center p-12">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Right</Button>} />
        <HoverCardContent side={side} className="w-48">
          <p className="text-sm">Positioned on the right.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/** HoverCard opens below the trigger. */
export const SideBottom: Story = {
  args: { side: 'bottom' },
  render: ({ side }) => (
    <div className="flex items-center justify-center p-12">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Bottom</Button>} />
        <HoverCardContent side={side} className="w-48">
          <p className="text-sm">Positioned on the bottom.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/** HoverCard opens to the left of the trigger. */
export const SideLeft: Story = {
  args: { side: 'left' },
  render: ({ side }) => (
    <div className="flex items-center justify-center p-12">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Left</Button>} />
        <HoverCardContent side={side} className="w-48">
          <p className="text-sm">Positioned on the left.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/** The trigger renders an anchor by default, so inline text links work without extra markup. */
export const TextTrigger: Story = {
  render: ({ side }) => (
    <p className="max-w-sm text-sm">
      Curve is maintained by{' '}
      <HoverCard>
        <HoverCardTrigger href="#" className="font-medium underline underline-offset-4">
          SURF
        </HoverCardTrigger>
        <HoverCardContent side={side}>
          <p className="text-sm">
            SURF is the collaborative organisation for IT in Dutch education and research.
          </p>
        </HoverCardContent>
      </HoverCard>
      , providing a shared design system for React and Angular.
    </p>
  ),
};
