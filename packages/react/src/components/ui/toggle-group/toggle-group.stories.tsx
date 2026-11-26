import { useState, type ComponentProps } from 'react';
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { toggleContract, toggleGroupContract } from '@surfnet/curve-contracts';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component: toggleGroupContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=123-75',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: toggleContract.props.variants,
      description: toggleContract.props.variants
        .map((variant) => `\`${variant}\` — ${toggleContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: toggleContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: toggleContract.props.sizes,
      description: toggleContract.props.sizes
        .map((size) => `\`${size}\` — ${toggleContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: toggleContract.defaults.sizes },
      },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Lays items out in a row, or stacks them in a column.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allows more than one item to be pressed at once.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: { control: 'boolean' },
    spacing: {
      control: 'number',
      description: `The spacing between the items. 0 gives the default 'merged' look.`,
    },
  },
  args: {
    variant: toggleContract.defaults.variants,
    size: toggleContract.defaults.sizes,
    orientation: 'horizontal',
    multiple: false,
    disabled: false,
    spacing: 0,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderFormatGroup =
  ({ disabledItem }: { disabledItem?: 'italic' } = {}): Story['render'] =>
  (args) => (
    <ToggleGroup {...args} defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        disabled={disabledItem === 'italic' || undefined}
      >
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );

/** The default toggle group — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: renderFormatGroup(),
};

/** Outline variant — bordered, transparent fill. */
export const Outline: Story = {
  args: { variant: 'outline' },
  render: renderFormatGroup(),
};

/** Small size — compact toggle group for toolbars. */
export const Sm: Story = {
  args: { size: 'sm' },
  render: renderFormatGroup(),
};

/** Large size — prominent controls. */
export const Lg: Story = {
  args: { size: 'lg' },
  render: renderFormatGroup(),
};

/** You can specify the spacing between the items. 0 gives the default 'merged' look. */
export const WithSpacing: Story = {
  args: { spacing: 2 },
  render: renderFormatGroup(),
};

/** Items stacked in a column instead of a row. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: renderFormatGroup(),
};

/**
 * A realistic composed example: a text-formatting toolbar where `multiple` lets more
 * than one item stay pressed at once (bold + italic + underline can all be active).
 */
function TextFormattingExample(props: ComponentProps<typeof ToggleGroup>) {
  const [value, setValue] = useState<string[]>(['bold']);
  return (
    <ToggleGroup {...props} value={value} onValueChange={setValue}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export const TextFormatting: Story = {
  args: { variant: 'outline', multiple: true },
  render: (args) => <TextFormattingExample {...args} />,
};

/**
 * A realistic composed example: a text-alignment toolbar where only one option can be
 * pressed at a time (the default, single-selection behavior).
 */
function TextAlignmentExample(props: ComponentProps<typeof ToggleGroup>) {
  const [value, setValue] = useState<string[]>(['left']);
  return (
    <ToggleGroup {...props} value={value} onValueChange={setValue}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <TextAlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <TextAlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <TextAlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export const TextAlignment: Story = {
  render: (args) => <TextAlignmentExample {...args} />,
};

/** Disabling the whole group. */
export const Disabled: Story = {
  args: { disabled: true },
  render: renderFormatGroup(),
};

/** Disabling a single item within the group. */
export const DisabledItem: Story = {
  render: renderFormatGroup({ disabledItem: 'italic' }),
};
