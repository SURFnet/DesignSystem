import type { Meta, StoryObj } from '@storybook/react-vite';
import { sliderContract } from '@surfnet/curve-contracts';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

import { Slider } from './slider';

const meta = {
  title: 'Components/Slider',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: sliderContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=61-169',
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
      <Slider {...args} aria-label="Volume" />
    </div>
  ),
};

/** A track running left to right — the default orientation. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <div className="w-72">
      <Slider {...args} aria-label="Volume" />
    </div>
  ),
};

/** A track running bottom to top. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className="flex h-40 items-center">
      <Slider {...args} aria-label="Volume" />
    </div>
  ),
};

/** A range slider with two thumbs, dragging independently between `min` and `max`. */
export const Range: Story = {
  args: { defaultValue: [25, 75] },
  render: (args) => (
    <div className="w-72">
      <Slider
        {...args}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
      />
    </div>
  ),
};

/** Disabled state — the slider ignores pointer and keyboard interaction. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-72">
      <Slider {...args} aria-label="Volume" />
    </div>
  ),
};

/** A slider composed with a `Field` label and description, the typical form usage. */
export const WithField: Story = {
  args: { defaultValue: 60 },
  render: (args) => (
    <Field className="w-72">
      <FieldLabel htmlFor="volume">Volume</FieldLabel>
      <Slider {...args} id="volume" aria-label="Volume" />
      <FieldDescription>Drag the thumb or use the arrow keys to adjust.</FieldDescription>
    </Field>
  ),
};
