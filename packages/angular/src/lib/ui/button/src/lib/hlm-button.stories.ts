import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight, phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { buttonContract } from '@surfnet/curve-contracts';

import { HlmButton, HlmButtonImports } from '..';
import { Component, Input } from '@angular/core';

// `disabled` is contributed by the BrnButton host directive rather than HlmButton
// itself, so widen the story args to expose it as a control.
type ButtonArgs = HlmButton & { disabled: boolean };

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
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
        component: buttonContract.description,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [...buttonContract.variants],
      description: 'Visual style of the button.',
      table: {
        type: {
          summary: buttonContract.variants.join(' | '),
        },
        defaultValue: { summary: buttonContract.defaultVariant },
      },
    },
    size: {
      control: 'select',
      options: [...buttonContract.sizes],
      description: 'Size of the button.',
      table: {
        type: {
          summary: buttonContract.sizes.join(' | '),
        },
        defaultValue: { summary: buttonContract.defaultSize },
      },
    },
  },
  args: {
    variant: buttonContract.defaultVariant,
    size: buttonContract.defaultSize,
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

@Component({
  selector: 'button-variants',
  imports: [HlmButtonImports],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      @for (variant of buttonContract.variants; track variant) {
        <button hlmBtn [variant]="variant" [title]="buttonContract.variantDocs[variant]">
          {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
        </button>
      }
    </div>
  `,
})
class ButtonVariants {
  @Input() buttonContract!: typeof buttonContract;
}

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ButtonVariants],
    },
    props: { buttonContract: buttonContract },
    template: '<button-variants [buttonContract]="buttonContract"></button-variants>',
  }),
};

/** Text sizes from extra-small to large. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn size="xs">Extra small</button>
        <button hlmBtn size="sm">Small</button>
        <button hlmBtn size="default">Default</button>
        <button hlmBtn size="lg">Large</button>
      </div>`,
  }),
};

/**
 * Square icon-only sizes. Drop a Phosphor icon (`@ng-icons/phosphor-icons/regular`) inside the button —
 * the button's CSS auto-sizes the SVG per size, so no `size-*` class is needed.
 */
export const IconSizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn size="icon-xs" aria-label="Add"><ng-icon name="phosphorPlus" /></button>
        <button hlmBtn size="icon-sm" aria-label="Add"><ng-icon name="phosphorPlus" /></button>
        <button hlmBtn size="icon" aria-label="Add"><ng-icon name="phosphorPlus" /></button>
        <button hlmBtn size="icon-lg" aria-label="Add"><ng-icon name="phosphorPlus" /></button>
      </div>`,
  }),
};

/**
 * Icons alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the button tightens the padding on that side.
 */
export const WithIcon: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn>
          <ng-icon name="phosphorPlus" data-icon="inline-start" />
          Add item
        </button>
        <button hlmBtn variant="secondary">
          Continue
          <ng-icon name="phosphorArrowRight" data-icon="inline-end" />
        </button>
      </div>`,
  }),
};

/** Disabled state across the main variants. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn disabled>Default</button>
        <button hlmBtn variant="outline" disabled>Outline</button>
        <button hlmBtn variant="destructive" disabled>Destructive</button>
      </div>`,
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
