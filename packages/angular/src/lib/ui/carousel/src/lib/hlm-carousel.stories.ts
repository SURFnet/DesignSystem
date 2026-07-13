import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { carouselContract } from '@surfnet/curve-contracts';

import { HlmCarousel, HlmCarouselImports } from '..';
import { HlmCardImports } from '../../../card/src';

const meta: Meta<HlmCarousel> = {
  title: 'Components/Carousel',
  component: HlmCarousel,
  decorators: [
    moduleMetadata({
      imports: [HlmCarouselImports, HlmCardImports],
    }),
  ],
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
};

export default meta;
type Story = StoryObj<HlmCarousel>;

/** Interactive playground — flip `orientation` in the controls to see both directions. */
export const Default: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
			<hlm-carousel
				${argsToTemplate(args)}
				class="{{orientation === 'vertical' ? 'h-72 w-full max-w-xs' : 'w-full max-w-xs'}}"
			>
				<hlm-carousel-content class="{{orientation === 'vertical' ? 'h-72' : ''}}">
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">1</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">2</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">3</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">4</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">5</span>
							</div>
						</div>
					</hlm-carousel-item>
				</hlm-carousel-content>
				<button hlm-carousel-previous></button>
				<button hlm-carousel-next></button>
			</hlm-carousel>
		`,
  }),
};

/** `orientation="horizontal"` — slides pan left/right (the default). */
export const Horizontal: Story = {
  render: () => ({
    template: `
			<hlm-carousel orientation="horizontal" class="w-full max-w-xs">
				<hlm-carousel-content>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">1</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">2</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">3</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">4</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex aspect-square items-center justify-center">
								<span class="text-4xl font-semibold">5</span>
							</div>
						</div>
					</hlm-carousel-item>
				</hlm-carousel-content>
				<button hlm-carousel-previous></button>
				<button hlm-carousel-next></button>
			</hlm-carousel>
		`,
  }),
};

/** `orientation="vertical"` — slides pan up/down. */
export const Vertical: Story = {
  render: () => ({
    template: `
			<hlm-carousel orientation="vertical" class="h-72 w-full max-w-xs">
				<hlm-carousel-content class="h-72">
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex items-center justify-center p-6">
								<span class="text-4xl font-semibold">1</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex items-center justify-center p-6">
								<span class="text-4xl font-semibold">2</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex items-center justify-center p-6">
								<span class="text-4xl font-semibold">3</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex items-center justify-center p-6">
								<span class="text-4xl font-semibold">4</span>
							</div>
						</div>
					</hlm-carousel-item>
					<hlm-carousel-item>
						<div hlmCard>
							<div hlmCardContent class="flex items-center justify-center p-6">
								<span class="text-4xl font-semibold">5</span>
							</div>
						</div>
					</hlm-carousel-item>
				</hlm-carousel-content>
				<button hlm-carousel-previous></button>
				<button hlm-carousel-next></button>
			</hlm-carousel>
		`,
  }),
};
