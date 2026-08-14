import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorBookmarkSimple,
  phosphorTextB,
  phosphorTextItalic,
  phosphorTextUnderline,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { toggleContract } from '@surfnet/curve-contracts';

import { HlmToggle, HlmToggleImports } from '..';

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

@Component({
  selector: 'toggle-variants',
  imports: [HlmToggleImports],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      @for (variant of toggleContract.props.variants; track variant) {
        <button hlmToggle [variant]="variant" [title]="toggleContract.docs.variants[variant]">
          {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
        </button>
      }
    </div>
  `,
})
class ToggleVariants {
  @Input() toggleContract!: typeof toggleContract;
}

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ToggleVariants],
    },
    props: { toggleContract: toggleContract },
    template: '<toggle-variants [toggleContract]="toggleContract"></toggle-variants>',
  }),
};

@Component({
  selector: 'toggle-sizes',
  imports: [HlmToggleImports],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      @for (size of toggleContract.props.sizes; track size) {
        <button hlmToggle [size]="size" [title]="toggleContract.docs.sizes[size]">
          {{ size.charAt(0).toUpperCase() + size.slice(1) }}
        </button>
      }
    </div>
  `,
})
class ToggleSizes {
  @Input() toggleContract!: typeof toggleContract;
}

/** Every size side by side. */
export const Sizes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ToggleSizes],
    },
    props: { toggleContract: toggleContract },
    template: '<toggle-sizes [toggleContract]="toggleContract"></toggle-sizes>',
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

/** Disabled state across the main variants. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmToggle disabled>Default</button>
        <button hlmToggle variant="outline" disabled>Outline</button>
      </div>`,
  }),
};
