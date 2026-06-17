import type { Meta, StoryObj } from '@storybook/react-vite';
import { buttonContract } from '@surfnet/contracts';

import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: buttonContract.description,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: buttonContract.variants,
      description: 'Visual style of the button.',
      table: {
        defaultValue: { summary: buttonContract.defaultVariant },
      },
    },
    size: {
      control: 'select',
      options: buttonContract.sizes,
      description: 'Size of the button.',
      table: {
        defaultValue: { summary: buttonContract.defaultSize },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: buttonContract.defaultVariant,
    size: buttonContract.defaultSize,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default button — rendered with the default args; tweak them via the controls. */
export const Default: Story = {};

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {buttonContract.variants.map((variant) => (
        <Button key={variant} variant={variant} title={buttonContract.variantDocs[variant]}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

/** Text sizes from extra-small to large. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Square icon-only sizes. A placeholder glyph stands in for now — wiring up the
 * icon library in stories is handled in a later ticket.
 */
export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs" aria-label="Add">
        +
      </Button>
      <Button size="icon-sm" aria-label="Add">
        +
      </Button>
      <Button size="icon" aria-label="Add">
        +
      </Button>
      <Button size="icon-lg" aria-label="Add">
        +
      </Button>
    </div>
  ),
};

/** Disabled state across the main variants. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Default</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
};

/**
 * Base UI's polymorphic `render` prop swaps the underlying element while keeping
 * the button styling — here the button renders as an anchor.
 */
export const AsLink: Story = {
  render: () => (
    <Button variant="link" render={<a href="https://www.surf.nl" />}>
      Visit SURF
    </Button>
  ),
};
