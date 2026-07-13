import type { Meta, StoryObj } from '@storybook/react-vite';
import { carouselContract } from '@surfnet/curve-contracts';

import { Card, CardContent } from '@/components/ui/card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: carouselContract.docs.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: carouselContract.props.orientations,
      description: carouselContract.props.orientations
        .map(
          (orientation) =>
            `\`${orientation}\` — ${carouselContract.docs.orientations[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: carouselContract.defaults.orientations },
      },
    },
  },
  args: {
    orientation: carouselContract.defaults.orientations,
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — flip `orientation` in the controls to see both directions. */
export const Default: Story = {
  render: (args) => (
    <Carousel
      {...args}
      className={args.orientation === 'vertical' ? 'h-72 w-full max-w-xs' : 'w-full max-w-xs'}
    >
      <CarouselContent className={args.orientation === 'vertical' ? 'h-72' : undefined}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

/** `orientation="horizontal"` — slides pan left/right (the default). */
export const Horizontal: Story = {
  render: () => (
    <Carousel orientation="horizontal" className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

/** `orientation="vertical"` — slides pan up/down. */
export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="h-72 w-full max-w-xs">
      <CarouselContent className="h-72">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
