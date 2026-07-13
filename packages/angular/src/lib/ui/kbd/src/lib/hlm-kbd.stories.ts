import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { kbdContract } from '@surfnet/curve-contracts';
import { HlmKbd, HlmKbdImports } from '..';
import { HlmButtonImports, HlmInputGroupImports } from '../../../../../public-api';

const meta: Meta<HlmKbd> = {
  title: 'Components/Kbd',
  component: HlmKbd,
  decorators: [
    moduleMetadata({
      imports: [HlmKbdImports, HlmButtonImports, HlmInputGroupImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: kbdContract.docs.description,
      },
    },
  },
  args: {
    children: '⌘',
  },
};

export default meta;
type Story = StoryObj<HlmKbd>;

/** A single key — tweak the label via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<kbd hlmKbd ${argsToTemplate(args)}>{{ children }}</kbd>
		`,
  }),
};

/** Modifier keys grouped together, and a combination spelled out with a `+`. */
export const Groups: Story = {
  render: () => ({
    template: `
			<div class="flex flex-col items-center gap-4">
				<kbd hlmKbdGroup>
					<kbd hlmKbd>⌘</kbd>
					<kbd hlmKbd>⇧</kbd>
					<kbd hlmKbd>⌥</kbd>
					<kbd hlmKbd>⌃</kbd>
				</kbd>
				<kbd hlmKbdGroup>
					<kbd hlmKbd>Ctrl</kbd>
					<span>+</span>
					<kbd hlmKbd>B</kbd>
				</kbd>
			</div>
		`,
  }),
};

/** Referencing a shortcut inline in body copy. */
export const InText: Story = {
  render: () => ({
    template: `
			<p class="max-w-xs text-sm text-muted-foreground">
				Use
				<kbd hlmKbdGroup>
					<kbd hlmKbd>Ctrl + B</kbd>
					<kbd hlmKbd>Ctrl + K</kbd>
				</kbd>
				to open the command palette.
			</p>
		`,
  }),
};

/** Hinting a button's shortcut key. */
export const InButton: Story = {
  render: () => ({
    template: `
			<div class="flex flex-wrap items-center gap-4">
				<button hlmBtn variant="outline" size="sm" class="pr-2">
					Accept <kbd hlmKbd>⏎</kbd>
				</button>
				<button hlmBtn variant="outline" size="sm" class="pr-2">
					Cancel <kbd hlmKbd>Esc</kbd>
				</button>
			</div>
		`,
  }),
};

/** Surfacing a search shortcut inside an input's trailing addon. */
export const InInputGroup: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-xs">
				<div hlmInputGroup>
					<input hlmInputGroupInput placeholder="Search…" />
					<div hlmInputGroupAddon align="inline-end">
						<kbd hlmKbd>⌘</kbd>
						<kbd hlmKbd>K</kbd>
					</div>
				</div>
			</div>
		`,
  }),
};
