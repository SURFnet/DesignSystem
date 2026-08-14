import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { sliderContract, type SliderOrientationName } from '@surfnet/curve-contracts';

import { HlmFieldImports } from '../../../../../public-api';
import { HlmSlider, HlmSliderImports } from '..';

// `orientation` and `disabled` are contributed by the BrnSlider host directive rather
// than HlmSlider itself, so widen the story args to expose them as controls.
type SliderArgs = HlmSlider & {
  orientation: SliderOrientationName;
  disabled: boolean;
};

const meta: Meta<SliderArgs> = {
  title: 'Components/Slider',
  component: HlmSlider,
  decorators: [
    moduleMetadata({
      imports: [HlmSliderImports, HlmFieldImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: sliderContract.docs.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: sliderContract.props.orientations,
      description: sliderContract.props.orientations
        .map(
          (orientation) => `\`${orientation}\` — ${sliderContract.docs.orientations[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: sliderContract.defaults.orientations },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    orientation: sliderContract.defaults.orientations,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SliderArgs>;

/** Interactive playground — tweak the controls to see the slider react. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div class="{{orientation === 'vertical' ? 'flex h-40 items-center' : 'w-72'}}">
				<hlm-slider [value]="[50]" ${argsToTemplate(args)} />
			</div>
		`,
  }),
};

/** A track running left to right — the default orientation. */
export const Horizontal: Story = {
  render: () => ({
    template: `
			<div class="w-72">
				<hlm-slider [value]="[50]" orientation="horizontal" />
			</div>
		`,
  }),
};

/** A track running bottom to top. */
export const Vertical: Story = {
  render: () => ({
    template: `
			<div class="flex h-40 items-center">
				<hlm-slider [value]="[50]" orientation="vertical" />
			</div>
		`,
  }),
};

/** A range slider with two thumbs, dragging independently between `min` and `max`. */
export const Range: Story = {
  render: () => ({
    template: `
			<div class="w-72">
				<hlm-slider [value]="[25, 75]" />
			</div>
		`,
  }),
};

/** Disabled state — the slider ignores pointer and keyboard interaction. */
export const Disabled: Story = {
  render: () => ({
    template: `
			<div class="w-72">
				<hlm-slider [value]="[50]" [disabled]="true" />
			</div>
		`,
  }),
};

/** A slider composed with a field label and description, the typical form usage. */
export const WithField: Story = {
  render: () => ({
    template: `
			<div hlmField class="w-72">
				<label hlmFieldLabel for="volume">Volume</label>
				<hlm-slider id="volume" [value]="[60]" />
				<p hlmFieldDescription>Drag the thumb or use the arrow keys to adjust.</p>
			</div>
		`,
  }),
};
