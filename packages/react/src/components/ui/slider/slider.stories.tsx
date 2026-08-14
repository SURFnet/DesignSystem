import type { Meta, StoryObj } from '@storybook/react-vite';
import { sliderContract } from '@surfnet/curve-contracts';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

import { Slider } from './slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
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
    defaultValue: 50,
    disabled: false,
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak the controls to see the slider react. */
export const Default: Story = {
  render: (args) => (
    <div className={args.orientation === 'vertical' ? 'flex h-40 items-center' : 'w-72'}>
      <Slider {...args} />
    </div>
  ),
};

/** A track running left to right — the default orientation. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <Slider orientation="horizontal" defaultValue={50} />
    </div>
  ),
};

/** A track running bottom to top. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-40 items-center">
      <Slider orientation="vertical" defaultValue={50} />
    </div>
  ),
};

/** A range slider with two thumbs, dragging independently between `min` and `max`. */
export const Range: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[25, 75]} />
    </div>
  ),
};

/** Disabled state — the slider ignores pointer and keyboard interaction. */
export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={50} disabled />
    </div>
  ),
};

/** A slider composed with a `Field` label and description, the typical form usage. */
export const WithField: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="volume">Volume</FieldLabel>
      <Slider id="volume" defaultValue={60} />
      <FieldDescription>Drag the thumb or use the arrow keys to adjust.</FieldDescription>
    </Field>
  ),
};
