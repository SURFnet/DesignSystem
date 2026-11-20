import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight, phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { buttonContract } from '@surfnet/curve-contracts';

import { HlmButton } from '..';

// `disabled` is contributed by the BrnButton host directive rather than HlmButton
// itself, so widen the story args to expose it as a control.
type ButtonArgs = HlmButton & { disabled: boolean };

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: HlmButton,
  decorators: [
    moduleMetadata({
      imports: [HlmButton, NgIcon],
      providers: [provideIcons({ phosphorPlus, phosphorArrowRight })],
    }),
  ],
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
      options: [...buttonContract.props.variants],
      description: 'Visual style of the button.',
      table: {
        type: {
          summary: buttonContract.props.variants.join(' | '),
        },
        defaultValue: { summary: buttonContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: [...buttonContract.props.sizes],
      description: 'Size of the button.',
      table: {
        type: {
          summary: buttonContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: buttonContract.defaults.sizes },
      },
    },
  },
  args: {
    variant: buttonContract.defaults.variants,
    size: buttonContract.defaults.sizes,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

/** The default button — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  args: { disabled: false },
  render: (args) => ({
    props: args,
    template: `<button hlmBtn ${argsToTemplate(args)}>Button</button>`,
  }),
};

/** Primary brand fill — use for the single most important action on a page. */
export const DefaultVariant: Story = {
  render: () => ({
    template: `<button hlmBtn variant="default" title="${buttonContract.docs.variants['default']}">Default</button>`,
  }),
};

/** Bordered, transparent fill — secondary actions beside a primary button. */
export const Outline: Story = {
  render: () => ({
    template: `<button hlmBtn variant="outline" title="${buttonContract.docs.variants['outline']}">Outline</button>`,
  }),
};

/** Muted fill — general-purpose secondary action. */
export const Secondary: Story = {
  render: () => ({
    template: `<button hlmBtn variant="secondary" title="${buttonContract.docs.variants['secondary']}">Secondary</button>`,
  }),
};

/** No background or border — tertiary actions and icon toolbars. */
export const Ghost: Story = {
  render: () => ({
    template: `<button hlmBtn variant="ghost" title="${buttonContract.docs.variants['ghost']}">Ghost</button>`,
  }),
};

/** Solid danger fill — destructive or irreversible actions. */
export const Destructive: Story = {
  render: () => ({
    template: `<button hlmBtn variant="destructive" title="${buttonContract.docs.variants['destructive']}">Destructive</button>`,
  }),
};

/** Looks like a hyperlink — inline or contextual navigation actions. */
export const Link: Story = {
  render: () => ({
    template: `<button hlmBtn variant="link" title="${buttonContract.docs.variants['link']}">Link</button>`,
  }),
};

/** Small — secondary controls, filter bars. */
export const Sm: Story = {
  render: () => ({
    template: `<button hlmBtn size="sm" title="${buttonContract.docs.sizes['sm']}">Small</button>`,
  }),
};

/** Large — prominent calls to action. */
export const Lg: Story = {
  render: () => ({
    template: `<button hlmBtn size="lg" title="${buttonContract.docs.sizes['lg']}">Large</button>`,
  }),
};

/** Square icon-only button at extra-small size. */
export const IconXs: Story = {
  render: () => ({
    template: `<button hlmBtn size="icon-xs" aria-label="Add" title="${buttonContract.docs.sizes['icon-xs']}"><ng-icon name="phosphorPlus" /></button>`,
  }),
};

/** Square icon-only button at small size. */
export const IconSm: Story = {
  render: () => ({
    template: `<button hlmBtn size="icon-sm" aria-label="Add" title="${buttonContract.docs.sizes['icon-sm']}"><ng-icon name="phosphorPlus" /></button>`,
  }),
};

/** Square icon-only button at large size. */
export const IconLg: Story = {
  render: () => ({
    template: `<button hlmBtn size="icon-lg" aria-label="Add" title="${buttonContract.docs.sizes['icon-lg']}"><ng-icon name="phosphorPlus" /></button>`,
  }),
};

/**
 * Icon alongside text. Use `data-icon="inline-start"` for left alignment.
 */
export const IconLeft: Story = {
  render: () => ({
    template: `
        <button hlmBtn>
          <ng-icon name="phosphorPlus" data-icon="inline-start" />
          Add item
        </button>`,
  }),
};

/**
 * Icon alongside text. Use `data-icon="inline-end"` for right alignment.
 */
export const IconRight: Story = {
  render: () => ({
    template: `
        <button hlmBtn variant="secondary">
          Continue
          <ng-icon name="phosphorArrowRight" data-icon="inline-end" />
        </button> `,
  }),
};

/** Disabled default variant. */
export const DisabledDefault: Story = {
  render: () => ({
    template: `<button hlmBtn disabled>Default</button>`,
  }),
};

/** Disabled outline variant. */
export const DisabledOutline: Story = {
  render: () => ({
    template: `<button hlmBtn variant="outline" disabled>Outline</button>`,
  }),
};

/** Disabled secondary variant. */
export const DisabledSecondary: Story = {
  render: () => ({
    template: `<button hlmBtn variant="secondary" disabled>Secondary</button>`,
  }),
};

/** Disabled ghost variant. */
export const DisabledGhost: Story = {
  render: () => ({
    template: `<button hlmBtn variant="ghost" disabled>Ghost</button>`,
  }),
};

/** Disabled destructive variant. */
export const DisabledDestructive: Story = {
  render: () => ({
    template: `<button hlmBtn variant="destructive" disabled>Destructive</button>`,
  }),
};

/** Disabled link variant. */
export const DisabledLink: Story = {
  render: () => ({
    template: `<button hlmBtn variant="link" disabled>Link</button>`,
  }),
};

/**
 * Base UI's polymorphic `render` prop swaps the underlying element while keeping
 * the button styling — here the button renders as an anchor.
 */
export const AsLink: Story = {
  render: () => ({
    template: `<a hlmBtn variant="link" href="https://www.surf.nl">Visit SURF</a>`,
  }),
};
