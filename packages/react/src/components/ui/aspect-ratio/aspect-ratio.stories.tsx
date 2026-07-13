import type { Meta, StoryObj } from '@storybook/react-vite';
import { aspectRatioContract } from '@surfnet/curve-contracts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: aspectRatioContract.docs.description,
      },
    },
  },
  argTypes: {
    ratio: {
      control: 'number',
      description: 'Width / height ratio the content is constrained to.',
    },
  },
  args: {
    ratio: 16 / 9,
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default aspect ratio — tweak `ratio` via the controls. */
export const Default: Story = {
  render: (args) => (
    <AspectRatio {...args} className="w-80 overflow-hidden rounded-lg bg-muted">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="Mountain landscape"
        className="size-full object-cover"
      />
    </AspectRatio>
  ),
};

/** Common ratios side by side, each constraining the same photo. */
export const Ratios: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          { ratio: 1, label: 'Square — 1/1' },
          { ratio: 4 / 3, label: 'Standard — 4/3' },
          { ratio: 16 / 9, label: 'Widescreen — 16/9' },
          { ratio: 21 / 9, label: 'Ultrawide — 21/9' },
        ] as const
      ).map(({ ratio, label }) => (
        <figure key={label} className="w-40">
          <AspectRatio ratio={ratio} className="overflow-hidden rounded-lg bg-muted">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
              alt={label}
              className="size-full object-cover"
            />
          </AspectRatio>
          <figcaption className="mt-1 text-center text-xs text-muted-foreground">
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};

/** Composed inside `Card` — a media block constrained to 16/9 above the copy. */
export const InCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Mountain sunrise</CardTitle>
        <CardDescription>A 16/9 image constrained by AspectRatio.</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
            alt="Mountain range at sunrise"
            className="size-full object-cover"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  ),
};
