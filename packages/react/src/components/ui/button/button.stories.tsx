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
  tags: ['!autodocs'],
  args: { variant: 'default', children: 'Default', title: buttonContract.docs.variants['default'] },
};

/** Bordered, transparent fill — secondary actions beside a primary button. */
export const Outline: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline', children: 'Outline', title: buttonContract.docs.variants['outline'] },
};

/** Muted fill — general-purpose secondary action. */
export const Secondary: Story = {
  tags: ['!autodocs'],
  args: {
    variant: 'secondary',
    children: 'Secondary',
    title: buttonContract.docs.variants['secondary'],
  },
};

/** No background or border — tertiary actions and icon toolbars. */
export const Ghost: Story = {
  tags: ['!autodocs'],
  args: { variant: 'ghost', children: 'Ghost', title: buttonContract.docs.variants['ghost'] },
};

/** Solid danger fill — destructive or irreversible actions. */
export const Destructive: Story = {
  tags: ['!autodocs'],
  args: {
    variant: 'destructive',
    children: 'Destructive',
    title: buttonContract.docs.variants['destructive'],
  },
};

/** Looks like a hyperlink — inline or contextual navigation actions. */
export const Link: Story = {
  tags: ['!autodocs'],
  args: { variant: 'link', children: 'Link', title: buttonContract.docs.variants['link'] },
};

/** Small — secondary controls, filter bars. */
export const Sm: Story = {
  tags: ['!autodocs'],
  args: { size: 'sm', children: 'Small', title: buttonContract.docs.sizes['sm'] },
};

/** Large — prominent calls to action. */
export const Lg: Story = {
  tags: ['!autodocs'],
  args: { size: 'lg', children: 'Large', title: buttonContract.docs.sizes['lg'] },
};

/** Square icon-only button at extra-small size. */
export const IconXs: Story = {
  tags: ['!autodocs'],
  args: {
    size: 'icon-xs',
    children: <PlusIcon />,
    'aria-label': 'Add',
    title: buttonContract.docs.sizes['icon-xs'],
  },
};

/** Square icon-only button at small size. */
export const IconSm: Story = {
  tags: ['!autodocs'],
  args: {
    size: 'icon-sm',
    children: <PlusIcon />,
    'aria-label': 'Add',
    title: buttonContract.docs.sizes['icon-sm'],
  },
};

/** Square icon-only button at large size. */
export const IconLg: Story = {
  tags: ['!autodocs'],
  args: {
    size: 'icon-lg',
    children: <PlusIcon />,
    'aria-label': 'Add',
    title: buttonContract.docs.sizes['icon-lg'],
  },
};

/**
 * Icon alongside text. Use `data-icon="inline-start"` for left alignment.
 */
export const IconLeft: Story = {
  args: {
    children: (
      <>
        <PlusIcon data-icon="inline-start" />
        Add item
      </>
    ),
  },
};

/**
 * Icon alongside text. Use `data-icon="inline-end"` for right alignment.
 */
export const IconRight: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </>
    ),
  },
};

/** Disabled default variant. */
export const DisabledDefault: Story = {
  tags: ['!autodocs'],
  args: { disabled: true, children: 'Default' },
};

/** Disabled outline variant. */
export const DisabledOutline: Story = {
  tags: ['!autodocs'],
  args: { variant: 'outline', disabled: true, children: 'Outline' },
};

/** Disabled secondary variant. */
export const DisabledSecondary: Story = {
  tags: ['!autodocs'],
  args: { variant: 'secondary', disabled: true, children: 'Secondary' },
};

/** Disabled ghost variant. */
export const DisabledGhost: Story = {
  tags: ['!autodocs'],
  args: { variant: 'ghost', disabled: true, children: 'Ghost' },
};

/** Disabled destructive variant. */
export const DisabledDestructive: Story = {
  tags: ['!autodocs'],
  args: { variant: 'destructive', disabled: true, children: 'Destructive' },
};

/** Disabled link variant. */
export const DisabledLink: Story = {
  tags: ['!autodocs'],
  args: { variant: 'link', disabled: true, children: 'Link' },
};

/**
 * Base UI's polymorphic `render` prop swaps the underlying element while keeping
 * the button styling — here the button renders as an anchor.
 */
export const AsLink: Story = {
  args: { variant: 'link', children: 'Visit SURF', render: <a href="https://www.surf.nl" /> },
  argTypes: { disabled: { table: { disable: true } }, render: { table: { disable: true } } },
};
