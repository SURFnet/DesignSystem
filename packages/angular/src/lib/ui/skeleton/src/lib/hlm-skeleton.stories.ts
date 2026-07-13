import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { skeletonContract } from '@surfnet/curve-contracts';
import { HlmSkeleton, HlmSkeletonImports } from '..';

const meta: Meta<HlmSkeleton> = {
  title: 'Components/Skeleton',
  component: HlmSkeleton,
  decorators: [
    moduleMetadata({
      imports: [HlmSkeletonImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: skeletonContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmSkeleton>;

/** A profile row loading — a circular avatar placeholder beside two stacked text lines. */
export const Default: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <hlm-skeleton class="size-12 rounded-full" />
        <div class="flex flex-col gap-2">
          <hlm-skeleton class="h-4 w-[250px]" />
          <hlm-skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    `,
  }),
};

/** Common shapes: a circular avatar, a text line, and a rounded media block. */
export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-6">
        <hlm-skeleton class="size-12 rounded-full" />
        <hlm-skeleton class="h-4 w-32" />
        <hlm-skeleton class="h-24 w-40 rounded-lg" />
      </div>
    `,
  }),
};

/** A card's loading state: media block, title and description lines, and footer actions. */
export const CardLoading: Story = {
  render: () => ({
    template: `
      <div class="flex w-80 flex-col gap-4 rounded-xl p-6 shadow-xs ring-1 ring-foreground/10">
        <hlm-skeleton class="h-32 w-full rounded-lg" />
        <div class="flex flex-col gap-2">
          <hlm-skeleton class="h-4 w-3/4" />
          <hlm-skeleton class="h-3 w-full" />
          <hlm-skeleton class="h-3 w-5/6" />
        </div>
        <div class="flex justify-end gap-2">
          <hlm-skeleton class="h-8 w-16 rounded-md" />
          <hlm-skeleton class="h-8 w-16 rounded-md" />
        </div>
      </div>
    `,
  }),
};

/** A list of menu-style rows — an icon placeholder beside a label of varying width per row. */
export const MenuList: Story = {
  render: () => ({
    template: `
      <div class="flex w-56 flex-col gap-1">
        <div class="flex h-8 items-center gap-2 rounded-md px-2">
          <hlm-skeleton class="size-4 rounded-md" />
          <hlm-skeleton class="h-4 w-full" />
        </div>
        <div class="flex h-8 items-center gap-2 rounded-md px-2">
          <hlm-skeleton class="size-4 rounded-md" />
          <hlm-skeleton class="h-4 w-4/5" />
        </div>
        <div class="flex h-8 items-center gap-2 rounded-md px-2">
          <hlm-skeleton class="size-4 rounded-md" />
          <hlm-skeleton class="h-4 w-3/5" />
        </div>
      </div>
    `,
  }),
};
