import type { Meta, StoryObj } from '@storybook/react-vite';
import { scrollAreaContract } from '@surfnet/curve-contracts';

import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from './scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component: scrollAreaContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

/** A vertical scroll area constraining a long list of tags. */
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/**
 * `ScrollBar orientation="horizontal"` swaps in a horizontal track — pair it with a
 * `whitespace-nowrap` and `flex w-max` content wrapper so the row doesn't collapse.
 */
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {['Ornella Binni', 'Tom Byrom', 'Vladimir Malyavko'].map((artist) => (
          <figure key={artist} className="shrink-0">
            <div className="flex aspect-[3/4] h-40 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              Artwork
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by <span className="font-semibold text-foreground">{artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
