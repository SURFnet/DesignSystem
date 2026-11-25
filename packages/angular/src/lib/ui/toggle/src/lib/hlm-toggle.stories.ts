import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorBookmarkSimple,
  phosphorTextB,
  phosphorTextItalic,
  phosphorTextUnderline,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { toggleContract } from '@surfnet/curve-contracts';

import { HlmToggle } from '..';

// `disabled` is contributed by the BrnToggle host directive rather than HlmToggle
// itself, so widen the story args to expose it as a control.
type ToggleArgs = HlmToggle & { disabled: boolean };

const meta: Meta<ToggleArgs> = {
  title: 'Components/Toggle',
  component: HlmToggle,
  decorators: [
    moduleMetadata({
      imports: [HlmToggle, NgIcon],
      providers: [
        provideIcons({
          phosphorBookmarkSimple,
          phosphorTextB,
          phosphorTextItalic,
          phosphorTextUnderline,
        }),
      ],
    }),
  ],
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
      options: [...toggleContract.props.variants],
      description: 'Visual style of the toggle.',
      table: {
        type: {
          summary: toggleContract.props.variants.join(' | '),
        },
        defaultValue: { summary: toggleContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: [...toggleContract.props.sizes],
      description: 'Size of the toggle.',
      table: {
        type: {
          summary: toggleContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: toggleContract.defaults.sizes },
      },
    },
  },
  args: {
    variant: toggleContract.defaults.variants,
    size: toggleContract.defaults.sizes,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<ToggleArgs>;

/** The default toggle — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  args: { disabled: false },
  render: (args) => ({
    props: args,
    template: `<button hlmToggle ${argsToTemplate(args)}>Toggle</button>`,
  }),
};

/** Outline variant — bordered, transparent fill. */
export const Outline: Story = {
  render: () => ({
    template: `
      <button hlmToggle variant="outline" title="${toggleContract.docs.variants.outline}">
        Outline
      </button>
    `,
  }),
};

/** Small size — compact toggle for toolbars. */
export const Sm: Story = {
  render: () => ({
    template: `
      <button hlmToggle size="sm" title="${toggleContract.docs.sizes.sm}" state="on">
        Small
      </button>
    `,
  }),
};

/** Large size — prominent controls. */
export const Lg: Story = {
  render: () => ({
    template: `
      <button hlmToggle size="lg" title="${toggleContract.docs.sizes.lg}" state="on">
        Large
      </button>
    `,
  }),
};

/**
 * Icon alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the toggle tightens the padding on that side.
 */
export const WithIcon: Story = {
  render: () => ({
    template: `
      <button hlmToggle variant="outline" aria-label="Toggle bookmark">
        <ng-icon name="phosphorBookmarkSimple" data-icon="inline-start" />
        Bookmark
      </button>`,
  }),
};

/**
 * A realistic composed usage: a formatting toolbar built from standalone,
 * independently pressed toggles — each one tracks its own on/off state.
 */
export const FormattingToolbar: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-1 rounded-md border border-input p-1">
        <button hlmToggle aria-label="Toggle bold" state="on">
          <ng-icon name="phosphorTextB" />
        </button>
        <button hlmToggle aria-label="Toggle italic">
          <ng-icon name="phosphorTextItalic" />
        </button>
        <button hlmToggle aria-label="Toggle underline">
          <ng-icon name="phosphorTextUnderline" />
        </button>
      </div>`,
  }),
};

/** Disabled default variant. */
export const DisabledDefault: Story = {
  render: () => ({
    template: `
      <button hlmToggle disabled>Default</button>
    `,
  }),
};

/** Disabled outline variant. */
export const DisabledOutline: Story = {
  render: () => ({
    template: `
      <button hlmToggle variant="outline" disabled>Outline</button>
    `,
  }),
};
