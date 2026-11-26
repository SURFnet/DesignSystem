import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { tooltipContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

/**
 * Story-only args, in parity with the Angular stories: `content` is the tooltip text,
 * `position` drives `TooltipContent`'s `side`, `tooltipDisabled` drives `Tooltip`'s `disabled`.
 */
type TooltipArgs = ComponentProps<typeof Tooltip> & {
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  tooltipDisabled: boolean;
};

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
      description: 'Tooltip text, rendered inside `TooltipContent`.',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description:
        'Preferred side of the trigger the tooltip opens on (`TooltipContent` `side`; flips to stay in view).',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    tooltipDisabled: {
      control: 'boolean',
      description: 'Disables showing the tooltip (`Tooltip` `disabled`).',
    },
  },
  args: {
    content: 'Add to library',
    position: 'top',
    tooltipDisabled: false,
  },
} satisfies Meta<TooltipArgs>;

export default meta;

type Story = StoryObj<TooltipArgs>;

/** `extra` is appended after the `content` text (e.g. a `Kbd`). */
const renderTooltip =
  (
    trigger: ReactElement,
    { delay, extra }: { delay?: number; extra?: ReactNode } = {},
  ): Story['render'] =>
  ({ content, position, tooltipDisabled }) => (
    <TooltipProvider delay={delay}>
      <Tooltip disabled={tooltipDisabled}>
        <TooltipTrigger render={trigger} />
        <TooltipContent side={position}>
          {content}
          {extra}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

/** A button trigger with a short informative label. Wrap the tree in `TooltipProvider` once. */
export const Default: Story = {
  render: renderTooltip(<Button variant="outline">Hover me</Button>),
};

/** The tooltip opens above the trigger. */
export const Top: Story = {
  args: { content: 'Positioned on the top.', position: 'top' },
  render: renderTooltip(<Button variant="outline">Top</Button>),
};

/** The tooltip opens to the right of the trigger. */
export const Right: Story = {
  args: { content: 'Positioned on the right.', position: 'right' },
  render: renderTooltip(<Button variant="outline">Right</Button>),
};

/** The tooltip opens below the trigger. */
export const Bottom: Story = {
  args: { content: 'Positioned on the bottom.', position: 'bottom' },
  render: renderTooltip(<Button variant="outline">Bottom</Button>),
};

/** The tooltip opens to the left of the trigger. */
export const Left: Story = {
  args: { content: 'Positioned on the left.', position: 'left' },
  render: renderTooltip(<Button variant="outline">Left</Button>),
};

/** An icon-only action still needs an accessible name — the tooltip surfaces it visually too. */
export const IconTrigger: Story = {
  args: { content: 'Add item' },
  render: renderTooltip(
    <Button variant="outline" size="icon" aria-label="Add item">
      <PlusIcon />
    </Button>,
  ),
};

/** A `Kbd` inside the content renders with matching contrast against the tooltip background. */
export const WithShortcut: Story = {
  args: { content: 'Save changes' },
  render: renderTooltip(<Button variant="outline">Save</Button>, { extra: <Kbd>⌘S</Kbd> }),
};

/**
 * `TooltipProvider`'s `delay` (milliseconds before the first tooltip in a group opens)
 * defaults to `0` in this package, unlike upstream Base UI. Raise it to require a
 * deliberate hover before the popup appears.
 */
export const DelayedOpen: Story = {
  args: { content: 'Appears after ~700ms' },
  render: renderTooltip(<Button variant="outline">Hover and hold</Button>, { delay: 700 }),
};
