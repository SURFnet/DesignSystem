import { CopyIcon, DotsThreeIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { buttonGroupContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component: buttonGroupContract.docs.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: buttonGroupContract.props.orientations,
      description: buttonGroupContract.props.orientations
        .map(
          (orientation) =>
            `\`${orientation}\` — ${buttonGroupContract.docs.orientations[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: buttonGroupContract.defaults.orientations },
      },
    },
  },
  args: {
    orientation: buttonGroupContract.defaults.orientations,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default button group — rendered with the default args; tweak `orientation` via the controls. */
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
  ),
};

/** Buttons stacked in a column instead of a row. */
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
  ),
};

/**
 * Nesting groups (with a `ButtonGroupSeparator` between them) splits the buttons into
 * logical clusters while keeping the connected-border look within each cluster.
 */
export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Copy">
          <CopyIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroupSeparator />
      <ButtonGroup>
        <Button variant="outline">Cut</Button>
        <Button variant="outline">Paste</Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

/** `ButtonGroupText` renders a non-interactive, label-styled slot alongside the buttons. */
export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <ButtonGroupText>Page 1 of 10</ButtonGroupText>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
};

/**
 * A real-world composed example: a search field grouped with a submit button and an
 * overflow menu trigger. The group's CSS makes the `<Input>` flex to fill the space.
 */
export const WithInput: Story = {
  render: () => (
    <ButtonGroup className="w-80">
      <Input placeholder="Search…" aria-label="Search" />
      <Button variant="outline" size="icon" aria-label="Search">
        <MagnifyingGlassIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="More options">
        <DotsThreeIcon />
      </Button>
    </ButtonGroup>
  ),
};
