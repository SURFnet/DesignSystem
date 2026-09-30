import type { Meta, StoryObj } from '@storybook/react-vite';
import { skipLinkContract } from '@surfnet/curve-contracts';

import { SkipLink } from './skip-link';

const meta = {
  title: 'Components/SkipLink',
  component: SkipLink,
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
} satisfies Meta<typeof SkipLink>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A mock page: a header with navigation, then the main content the skip link points at.
 * Plain `div`s rather than `header` / `nav` / `main` so the Docs page, which renders every
 * story at once, doesn't end up with duplicate landmarks. In an app, target your `<main>`.
 */
function Page({
  mainId,
  navId,
  children,
}: {
  mainId: string;
  navId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-96 rounded-lg border">
      {children}
      <div className="border-b p-4">
        <div id={navId} className="flex gap-4 text-sm">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div id={mainId} className="p-4 text-sm">
        <h2 className="text-lg font-semibold">Main content</h2>
        <p>
          Press Tab from the top of the page to reveal the skip link, then Enter to move focus here.
        </p>
      </div>
    </div>
  );
}

/** Hidden until it receives keyboard focus — click the canvas, then press Tab. */
export const Default: Story = {
  render: (args) => (
    <Page mainId="main-content">
      <SkipLink {...args} />
    </Page>
  ),
};

/** The visible state, as shown once the link has keyboard focus. */
export const Focused: Story = {
  args: { href: '#focused-main-content' },
  render: (args) => (
    <Page mainId="focused-main-content">
      <SkipLink {...args} />
    </Page>
  ),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLAnchorElement>('[data-slot="skip-link"]')?.focus();
  },
};

/** Several skip links in a row; each one only shows while it has focus. */
export const MultipleLinks: Story = {
  render: () => (
    <Page mainId="multiple-main-content" navId="multiple-navigation">
      <SkipLink href="#multiple-main-content">Skip to main content</SkipLink>
      <SkipLink href="#multiple-navigation">Skip to navigation</SkipLink>
    </Page>
  ),
};
