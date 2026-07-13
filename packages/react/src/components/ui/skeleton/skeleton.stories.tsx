import type { Meta, StoryObj } from '@storybook/react-vite';
import { skeletonContract } from '@surfnet/curve-contracts';

import { Skeleton } from './skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: skeletonContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A profile row loading — a circular avatar placeholder beside two stacked text lines. */
export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

/** Common shapes: a circular avatar, a text line, and a rounded media block. */
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Skeleton className="size-12 rounded-full" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-24 w-40 rounded-lg" />
    </div>
  ),
};

/** A card's loading state: media block, title and description lines, and footer actions. */
export const CardLoading: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4 rounded-xl p-6 shadow-xs ring-1 ring-foreground/10">
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  ),
};

/** A list of menu-style rows — an icon placeholder beside a label of varying width per row. */
export const MenuList: Story = {
  render: () => (
    <div className="flex w-56 flex-col gap-1">
      <div className="flex h-8 items-center gap-2 rounded-md px-2">
        <Skeleton className="size-4 rounded-md" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex h-8 items-center gap-2 rounded-md px-2">
        <Skeleton className="size-4 rounded-md" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex h-8 items-center gap-2 rounded-md px-2">
        <Skeleton className="size-4 rounded-md" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  ),
};
