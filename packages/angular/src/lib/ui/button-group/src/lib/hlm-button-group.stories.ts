import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCopy,
  phosphorDotsThree,
  phosphorMagnifyingGlass,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { buttonGroupContract } from '@surfnet/curve-contracts';

import { HlmButtonGroup, HlmButtonGroupImports } from '..';
import { HlmButtonImports, HlmInputImports } from '../../../../../public-api';

const meta: Meta<HlmButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: HlmButtonGroup,
  decorators: [
    moduleMetadata({
      imports: [HlmButtonGroupImports, HlmButtonImports, HlmInputImports, NgIcon],
      providers: [provideIcons({ phosphorCopy, phosphorDotsThree, phosphorMagnifyingGlass })],
    }),
  ],
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
};

export default meta;
type Story = StoryObj<HlmButtonGroup>;

/** The default button group — rendered with the default args; tweak `orientation` via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div hlmButtonGroup ${argsToTemplate(args)}>
				<button hlmBtn variant="outline">One</button>
				<button hlmBtn variant="outline">Two</button>
				<button hlmBtn variant="outline">Three</button>
			</div>
		`,
  }),
};

/** Buttons stacked in a column instead of a row. */
export const Vertical: Story = {
  render: () => ({
    template: `
			<div hlmButtonGroup orientation="vertical">
				<button hlmBtn variant="outline">One</button>
				<button hlmBtn variant="outline">Two</button>
				<button hlmBtn variant="outline">Three</button>
			</div>
		`,
  }),
};

/**
 * Nesting groups (with a `hlmButtonGroupSeparator` between them) splits the buttons into
 * logical clusters while keeping the connected-border look within each cluster.
 */
export const WithSeparator: Story = {
  render: () => ({
    template: `
			<div hlmButtonGroup>
				<div hlmButtonGroup>
					<button hlmBtn variant="outline" size="icon" aria-label="Copy">
						<ng-icon name="phosphorCopy" />
					</button>
				</div>
				<div hlmButtonGroupSeparator></div>
				<div hlmButtonGroup>
					<button hlmBtn variant="outline">Cut</button>
					<button hlmBtn variant="outline">Paste</button>
				</div>
			</div>
		`,
  }),
};

/** `hlmButtonGroupText` renders a non-interactive, label-styled slot alongside the buttons. */
export const WithText: Story = {
  render: () => ({
    template: `
			<div hlmButtonGroup>
				<button hlmBtn variant="outline">Previous</button>
				<div hlmButtonGroupText>Page 1 of 10</div>
				<button hlmBtn variant="outline">Next</button>
			</div>
		`,
  }),
};

/**
 * A real-world composed example: a search field grouped with a submit button and an
 * overflow menu trigger. The group's CSS makes the `<input>` flex to fill the space.
 */
export const WithInput: Story = {
  render: () => ({
    template: `
			<div hlmButtonGroup class="w-80">
				<input hlmInput placeholder="Search…" aria-label="Search" />
				<button hlmBtn variant="outline" size="icon" aria-label="Search">
					<ng-icon name="phosphorMagnifyingGlass" />
				</button>
				<button hlmBtn variant="outline" size="icon" aria-label="More options">
					<ng-icon name="phosphorDotsThree" />
				</button>
			</div>
		`,
  }),
};
