import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { skipLinkContract } from '@surfnet/curve-contracts';
import { HlmSkipLink, HlmSkipLinkImports } from '..';

type SkipLinkArgs = HlmSkipLink & { children: string };

/**
 * A mock page: a header with navigation, then the main content the skip link points at.
 * Plain `div`s rather than `header` / `nav` / `main` so the Docs page, which renders every
 * story at once, doesn't end up with duplicate landmarks. In an app, target your `<main>`.
 */
const page = (links: string, mainId: string, navId = '') => `
	<div class="relative w-96 rounded-lg border">
		${links}
		<div class="border-b p-4">
			<div ${navId ? `id="${navId}"` : ''} class="flex gap-4 text-sm">
				<a href="#">Home</a>
				<a href="#">Services</a>
				<a href="#">About</a>
				<a href="#">Contact</a>
			</div>
		</div>
		<div id="${mainId}" class="p-4 text-sm">
			<h2 class="text-lg font-semibold">Main content</h2>
			<p>
				Press Tab from the top of the page to reveal the skip link, then Enter to move focus here.
			</p>
		</div>
	</div>
`;

const meta: Meta<SkipLinkArgs> = {
  title: 'Components/SkipLink',
  component: HlmSkipLink,
  decorators: [
    moduleMetadata({
      imports: [HlmSkipLinkImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: skipLinkContract.docs.description,
      },
    },
    a11y: {
      options: {
        rules: [
          {
            id: 'target-size',
            enabled: false,
          },
        ],
      },
    },
  },
  args: {
    children: 'Skip to main content',
    href: '#main-content',
  },
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SkipLinkArgs>;

/** Hidden until it receives keyboard focus — click the canvas, then press Tab. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: page(`<a hlmSkipLink [href]="href">{{ children }}</a>`, 'main-content'),
  }),
};

/** The visible state, as shown once the link has keyboard focus. */
export const Focused: Story = {
  args: { href: '#focused-main-content' },
  render: (args) => ({
    props: args,
    template: page(`<a hlmSkipLink [href]="href">{{ children }}</a>`, 'focused-main-content'),
  }),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLAnchorElement>('[data-slot="skip-link"]')?.focus();
  },
};

/** Several skip links in a row; each one only shows while it has focus. */
export const MultipleLinks: Story = {
  render: () => ({
    template: page(
      `
		<a hlmSkipLink href="#multiple-main-content">Skip to main content</a>
		<a hlmSkipLink href="#multiple-navigation">Skip to navigation</a>
		`,
      'multiple-main-content',
      'multiple-navigation',
    ),
  }),
};
