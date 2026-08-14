import {
  BookmarkSimpleIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { toggleContract } from '@surfnet/curve-contracts';

import { Toggle } from './toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: toggleContract.docs.description,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: toggleContract.props.variants,
      description: 'Visual style of the toggle.',
      table: {
        defaultValue: { summary: toggleContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: toggleContract.props.sizes,
      description: 'Size of the toggle.',
      table: {
        defaultValue: { summary: toggleContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Toggle',
    variant: toggleContract.defaults.variants,
    size: toggleContract.defaults.sizes,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default toggle — rendered with the default args; tweak them via the controls. */
export const Default: Story = {};

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {toggleContract.props.variants.map((variant) => (
        <Toggle key={variant} variant={variant} title={toggleContract.docs.variants[variant]}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Toggle>
      ))}
    </div>
  ),
};

/** Every size side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {toggleContract.props.sizes.map((size) => (
        <Toggle key={size} size={size} title={toggleContract.docs.sizes[size]}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Toggle>
      ))}
    </div>
  ),
};

/**
 * Icon alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the toggle tightens the padding on that side.
 */
export const WithIcon: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle bookmark">
      <BookmarkSimpleIcon data-icon="inline-start" />
      Bookmark
    </Toggle>
  ),
};

/**
 * A realistic composed usage: a formatting toolbar built from standalone,
 * independently pressed toggles — each one tracks its own on/off state.
 */
export const FormattingToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 rounded-md border border-input p-1">
      <Toggle aria-label="Toggle bold" defaultPressed>
        <TextBIcon />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <TextItalicIcon />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <TextUnderlineIcon />
      </Toggle>
    </div>
  ),
};

/** Disabled state across the main variants. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle disabled>Default</Toggle>
      <Toggle variant="outline" disabled>
        Outline
      </Toggle>
    </div>
  ),
};
