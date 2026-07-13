import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { aspectRatioContract } from '@surfnet/curve-contracts';
import { HlmAspectRatio, HlmAspectRatioImports } from '..';
import { HlmCardImports } from '../../../card/src';

const meta: Meta<HlmAspectRatio> = {
  title: 'Components/AspectRatio',
  component: HlmAspectRatio,
  decorators: [
    moduleMetadata({
      imports: [HlmAspectRatioImports, HlmCardImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: aspectRatioContract.docs.description,
      },
    },
  },
  argTypes: {
    ratio: {
      control: 'text',
      description:
        'Width / height ratio the content is constrained to — a number or a `"w/h"` string.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    ratio: '16/9',
  },
};

export default meta;
type Story = StoryObj<HlmAspectRatio>;

/** The default aspect ratio — tweak the ratio via the controls. */
export const Default: Story = {
  render: ({ ratio }) => ({
    props: { ratio },
    template: `
			<div [hlmAspectRatio]="ratio" class="w-80 overflow-hidden rounded-lg bg-muted">
				<img
					src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
					alt="Mountain landscape"
					class="size-full object-cover"
				/>
			</div>
		`,
  }),
};

/** Common ratios side by side, each constraining the same photo. */
export const Ratios: Story = {
  render: () => ({
    template: `
			<div class="flex flex-wrap gap-4">
				<figure class="w-40">
					<div hlmAspectRatio="1" class="overflow-hidden rounded-lg bg-muted">
						<img
							src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
							alt="Square — 1/1"
							class="size-full object-cover"
						/>
					</div>
					<figcaption class="mt-1 text-center text-xs text-muted-foreground">Square — 1/1</figcaption>
				</figure>
				<figure class="w-40">
					<div hlmAspectRatio="4/3" class="overflow-hidden rounded-lg bg-muted">
						<img
							src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
							alt="Standard — 4/3"
							class="size-full object-cover"
						/>
					</div>
					<figcaption class="mt-1 text-center text-xs text-muted-foreground">Standard — 4/3</figcaption>
				</figure>
				<figure class="w-40">
					<div hlmAspectRatio="16/9" class="overflow-hidden rounded-lg bg-muted">
						<img
							src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
							alt="Widescreen — 16/9"
							class="size-full object-cover"
						/>
					</div>
					<figcaption class="mt-1 text-center text-xs text-muted-foreground">Widescreen — 16/9</figcaption>
				</figure>
				<figure class="w-40">
					<div hlmAspectRatio="21/9" class="overflow-hidden rounded-lg bg-muted">
						<img
							src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
							alt="Ultrawide — 21/9"
							class="size-full object-cover"
						/>
					</div>
					<figcaption class="mt-1 text-center text-xs text-muted-foreground">Ultrawide — 21/9</figcaption>
				</figure>
			</div>
		`,
  }),
};

/** Composed inside `hlm-card` — a media block constrained to 16/9 above the copy. */
export const InCard: Story = {
  render: () => ({
    template: `
			<section hlmCard class="w-80">
				<div hlmCardHeader>
					<h3 hlmCardTitle>Mountain sunrise</h3>
					<p hlmCardDescription>A 16/9 image constrained by AspectRatio.</p>
				</div>
				<div hlmCardContent>
					<div hlmAspectRatio="16/9" class="overflow-hidden rounded-lg bg-muted">
						<img
							src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
							alt="Mountain range at sunrise"
							class="size-full object-cover"
						/>
					</div>
				</div>
			</section>
		`,
  }),
};
