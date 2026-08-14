import { useState } from 'react';
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
  },
  args: {
    variant: toggleContract.defaults.variants,
    size: toggleContract.defaults.sizes,
    orientation: 'horizontal',
    multiple: false,
    disabled: false,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default toggle group — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: (args) => (
    <ToggleGroup {...args} defaultValue={['bold']}>
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
  ),
};

/** Every visual variant, borrowed from `Toggle`, side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {toggleContract.props.variants.map((variant) => (
        <ToggleGroup key={variant} variant={variant} defaultValue={['bold']}>
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
      ))}
    </div>
  ),
};

/** Every size, borrowed from `Toggle`, side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {toggleContract.props.sizes.map((size) => (
        <ToggleGroup key={size} size={size} defaultValue={['bold']}>
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
      ))}
    </div>
  ),
};

/** Items stacked in a column instead of a row. */
export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" defaultValue={['bold']}>
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
  ),
};

/**
 * A realistic composed example: a text-formatting toolbar where `multiple` lets more
 * than one item stay pressed at once (bold + italic + underline can all be active).
 */
function TextFormattingExample() {
  const [value, setValue] = useState<string[]>(['bold']);
  return (
    <ToggleGroup variant="outline" multiple value={value} onValueChange={setValue}>
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
  render: () => <TextFormattingExample />,
};

/**
 * A realistic composed example: a text-alignment toolbar where only one option can be
 * pressed at a time (the default, single-selection behavior).
 */
function TextAlignmentExample() {
  const [value, setValue] = useState<string[]>(['left']);
  return (
    <ToggleGroup value={value} onValueChange={setValue}>
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
  render: () => <TextAlignmentExample />,
};

/** Disabling the whole group versus disabling a single item within it. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue={['bold']} disabled>
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
      <ToggleGroup defaultValue={['bold']}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <TextBIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
          <TextItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <TextUnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
