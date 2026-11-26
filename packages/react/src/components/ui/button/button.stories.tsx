import { ArrowRightIcon, PlusIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { buttonContract } from '@surfnet/curve-contracts';

import { Button } from './button';

const meta = {
  title: 'Components/Button',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: Button,
  parameters: {
    docs: {
      description: {
        component: buttonContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=17085-177606&t=T6LHdnRRLuad5nDS-4',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: buttonContract.props.variants,
      description: 'Visual style of the button.',
      table: {
        defaultValue: { summary: buttonContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: buttonContract.props.sizes,
      description: 'Size of the button.',
      table: {
        defaultValue: { summary: buttonContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: buttonContract.defaults.variants,
    size: buttonContract.defaults.sizes,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default button — rendered with the default args; tweak them via the controls. */
export const Default: Story = {};

/** Primary brand fill — use for the single most important action on a page. */
export const DefaultVariant: Story = {
  render: () => (
    <Button variant="default" title={buttonContract.docs.variants['default']}>
      Default
    </Button>
  ),
};

/** Bordered, transparent fill — secondary actions beside a primary button. */
export const Outline: Story = {
  render: () => (
    <Button variant="outline" title={buttonContract.docs.variants['outline']}>
      Outline
    </Button>
  ),
};

/** Muted fill — general-purpose secondary action. */
export const Secondary: Story = {
  render: () => (
    <Button variant="secondary" title={buttonContract.docs.variants['secondary']}>
      Secondary
    </Button>
  ),
};

/** No background or border — tertiary actions and icon toolbars. */
export const Ghost: Story = {
  render: () => (
    <Button variant="ghost" title={buttonContract.docs.variants['ghost']}>
      Ghost
    </Button>
  ),
};

/** Solid danger fill — destructive or irreversible actions. */
export const Destructive: Story = {
  render: () => (
    <Button variant="destructive" title={buttonContract.docs.variants['destructive']}>
      Destructive
    </Button>
  ),
};

/** Looks like a hyperlink — inline or contextual navigation actions. */
export const Link: Story = {
  render: () => (
    <Button variant="link" title={buttonContract.docs.variants['link']}>
      Link
    </Button>
  ),
};

/** Small — secondary controls, filter bars. */
export const Sm: Story = {
  render: () => (
    <Button size="sm" title={buttonContract.docs.sizes['sm']}>
      Small
    </Button>
  ),
};

/** Large — prominent calls to action. */
export const Lg: Story = {
  render: () => (
    <Button size="lg" title={buttonContract.docs.sizes['lg']}>
      Large
    </Button>
  ),
};

/** Square icon-only button at extra-small size. */
export const IconXs: Story = {
  render: () => (
    <Button size="icon-xs" aria-label="Add" title={buttonContract.docs.sizes['icon-xs']}>
      <PlusIcon />
    </Button>
  ),
};

/** Square icon-only button at small size. */
export const IconSm: Story = {
  render: () => (
    <Button size="icon-sm" aria-label="Add" title={buttonContract.docs.sizes['icon-sm']}>
      <PlusIcon />
    </Button>
  ),
};

/** Square icon-only button at large size. */
export const IconLg: Story = {
  render: () => (
    <Button size="icon-lg" aria-label="Add" title={buttonContract.docs.sizes['icon-lg']}>
      <PlusIcon />
    </Button>
  ),
};

/**
 * Icon alongside text. Use `data-icon="inline-start"` for left alignment.
 */
export const IconLeft: Story = {
  render: () => (
    <Button>
      <PlusIcon data-icon="inline-start" />
      Add item
    </Button>
  ),
};

/**
 * Icon alongside text. Use `data-icon="inline-end"` for right alignment.
 */
export const IconRight: Story = {
  render: () => (
    <Button variant="secondary">
      Continue
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  ),
};

/** Disabled default variant. */
export const DisabledDefault: Story = {
  render: () => <Button disabled>Default</Button>,
};

/** Disabled outline variant. */
export const DisabledOutline: Story = {
  render: () => (
    <Button variant="outline" disabled>
      Outline
    </Button>
  ),
};

/** Disabled secondary variant. */
export const DisabledSecondary: Story = {
  render: () => (
    <Button variant="secondary" disabled>
      Secondary
    </Button>
  ),
};

/** Disabled ghost variant. */
export const DisabledGhost: Story = {
  render: () => (
    <Button variant="ghost" disabled>
      Ghost
    </Button>
  ),
};

/** Disabled destructive variant. */
export const DisabledDestructive: Story = {
  render: () => (
    <Button variant="destructive" disabled>
      Destructive
    </Button>
  ),
};

/** Disabled link variant. */
export const DisabledLink: Story = {
  render: () => (
    <Button variant="link" disabled>
      Link
    </Button>
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
