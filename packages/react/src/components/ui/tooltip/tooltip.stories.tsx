import { PlusIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { tooltipContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

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
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A button trigger with a short informative label. Wrap the tree in `TooltipProvider` once. */
export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** The tooltip opens above the trigger. */
export const Top: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Top</Button>} />
        <TooltipContent side="top">Positioned on the top.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** The tooltip opens to the right of the trigger. */
export const Right: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Right</Button>} />
        <TooltipContent side="right">Positioned on the right.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** The tooltip opens below the trigger. */
export const Bottom: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Bottom</Button>} />
        <TooltipContent side="bottom">Positioned on the bottom.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** The tooltip opens to the left of the trigger. */
export const Left: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Left</Button>} />
        <TooltipContent side="left">Positioned on the left.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** An icon-only action still needs an accessible name — the tooltip surfaces it visually too. */
export const IconTrigger: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Add item">
              <PlusIcon />
            </Button>
          }
        />
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** A `Kbd` inside the content renders with matching contrast against the tooltip background. */
export const WithShortcut: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Save</Button>} />
        <TooltipContent>
          Save changes
          <Kbd>⌘S</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * `TooltipProvider`'s `delay` (milliseconds before the first tooltip in a group opens)
 * defaults to `0` in this package, unlike upstream Base UI. Raise it to require a
 * deliberate hover before the popup appears.
 */
export const DelayedOpen: Story = {
  render: () => (
    <TooltipProvider delay={700}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover and hold</Button>} />
        <TooltipContent>Appears after ~700ms</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
