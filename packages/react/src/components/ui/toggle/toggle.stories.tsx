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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=132-1671',
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

/** Outline variant — bordered, transparent fill. */
export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" title={toggleContract.docs.variants.outline}>
      Outline
    </Toggle>
  ),
};

/** Small size — compact toggle for toolbars. */
export const Sm: Story = {
  render: () => (
    <Toggle size="sm" title={toggleContract.docs.sizes.sm} defaultPressed>
      Small
    </Toggle>
  ),
};

/** Large size — prominent controls. */
export const Lg: Story = {
  render: () => (
    <Toggle size="lg" title={toggleContract.docs.sizes.lg} defaultPressed>
      Large
    </Toggle>
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

/** Disabled default variant. */
export const DisabledDefault: Story = {
  render: () => <Toggle disabled>Default</Toggle>,
};

/** Disabled outline variant. */
export const DisabledOutline: Story = {
  render: () => (
    <Toggle variant="outline" disabled>
      Outline
    </Toggle>
  ),
};
