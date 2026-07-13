import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorTextAlignCenter,
  phosphorTextAlignLeft,
  phosphorTextAlignRight,
  phosphorTextB,
  phosphorTextItalic,
  phosphorTextUnderline,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { toggleContract, toggleGroupContract } from '@surfnet/curve-contracts';

import { HlmToggleGroup, HlmToggleGroupImports } from '..';

// `disabled` and `type` are contributed by the BrnToggleGroup host directive rather than
// HlmToggleGroup itself, so widen the story args to expose them as controls.
type ToggleGroupArgs = HlmToggleGroup & { disabled: boolean; type: 'single' | 'multiple' };

const meta: Meta<ToggleGroupArgs> = {
  title: 'Components/ToggleGroup',
  component: HlmToggleGroup,
  decorators: [
    moduleMetadata({
      imports: [HlmToggleGroupImports, NgIcon],
      providers: [
        provideIcons({
          phosphorTextB,
          phosphorTextItalic,
          phosphorTextUnderline,
          phosphorTextAlignLeft,
          phosphorTextAlignCenter,
          phosphorTextAlignRight,
        }),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: toggleGroupContract.docs.description,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [...toggleContract.props.variants],
      description: toggleContract.props.variants
        .map((variant) => `\`${variant}\` — ${toggleContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        type: { summary: toggleContract.props.variants.join(' | ') },
        defaultValue: { summary: toggleContract.defaults.variants },
      },
    },
    size: {
      control: 'select',
      options: [...toggleContract.props.sizes],
      description: toggleContract.props.sizes
        .map((size) => `\`${size}\` — ${toggleContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        type: { summary: toggleContract.props.sizes.join(' | ') },
        defaultValue: { summary: toggleContract.defaults.sizes },
      },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Lays items out in a row, or stacks them in a column.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Whether more than one item can be pressed at once.',
      table: { defaultValue: { summary: 'single' } },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: toggleContract.defaults.variants,
    size: toggleContract.defaults.sizes,
    orientation: 'horizontal',
    type: 'single',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<ToggleGroupArgs>;

/** The default toggle group — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div hlmToggleGroup value="bold" ${argsToTemplate(args)}>
				<button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
				<button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
				<button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
			</div>
		`,
  }),
};

@Component({
  selector: 'toggle-group-variants',
  imports: [HlmToggleGroupImports, NgIcon],
  template: `
    <div class="flex flex-col gap-4">
      @for (variant of toggleContract.props.variants; track variant) {
        <div hlmToggleGroup [variant]="variant" value="bold">
          <button hlmToggleGroupItem value="bold" aria-label="Toggle bold">
            <ng-icon name="phosphorTextB" />
          </button>
          <button hlmToggleGroupItem value="italic" aria-label="Toggle italic">
            <ng-icon name="phosphorTextItalic" />
          </button>
          <button hlmToggleGroupItem value="underline" aria-label="Toggle underline">
            <ng-icon name="phosphorTextUnderline" />
          </button>
        </div>
      }
    </div>
  `,
})
class ToggleGroupVariants {
  @Input() toggleContract!: typeof toggleContract;
}

/** Every visual variant, borrowed from `Toggle`, side by side. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: { imports: [ToggleGroupVariants] },
    props: { toggleContract },
    template: '<toggle-group-variants [toggleContract]="toggleContract"></toggle-group-variants>',
  }),
};

@Component({
  selector: 'toggle-group-sizes',
  imports: [HlmToggleGroupImports, NgIcon],
  template: `
    <div class="flex flex-col items-start gap-4">
      @for (size of toggleContract.props.sizes; track size) {
        <div hlmToggleGroup [size]="size" value="bold">
          <button hlmToggleGroupItem value="bold" aria-label="Toggle bold">
            <ng-icon name="phosphorTextB" />
          </button>
          <button hlmToggleGroupItem value="italic" aria-label="Toggle italic">
            <ng-icon name="phosphorTextItalic" />
          </button>
          <button hlmToggleGroupItem value="underline" aria-label="Toggle underline">
            <ng-icon name="phosphorTextUnderline" />
          </button>
        </div>
      }
    </div>
  `,
})
class ToggleGroupSizes {
  @Input() toggleContract!: typeof toggleContract;
}

/** Every size, borrowed from `Toggle`, side by side. */
export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [ToggleGroupSizes] },
    props: { toggleContract },
    template: '<toggle-group-sizes [toggleContract]="toggleContract"></toggle-group-sizes>',
  }),
};

/** Items stacked in a column instead of a row. */
export const Vertical: Story = {
  render: () => ({
    template: `
			<div hlmToggleGroup orientation="vertical" value="bold">
				<button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
				<button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
				<button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
			</div>
		`,
  }),
};

/**
 * A realistic composed example: a text-formatting toolbar where `type="multiple"` lets
 * more than one item stay pressed at once (bold + italic + underline can all be active).
 */
export const TextFormatting: Story = {
  render: () => ({
    template: `
			<div hlmToggleGroup variant="outline" type="multiple" [value]="['bold']">
				<button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
				<button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
				<button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
			</div>
		`,
  }),
};

/**
 * A realistic composed example: a text-alignment toolbar where only one option can be
 * pressed at a time (the default, single-selection behavior).
 */
export const TextAlignment: Story = {
  render: () => ({
    template: `
			<div hlmToggleGroup value="left">
				<button hlmToggleGroupItem value="left" aria-label="Align left"><ng-icon name="phosphorTextAlignLeft" /></button>
				<button hlmToggleGroupItem value="center" aria-label="Align center"><ng-icon name="phosphorTextAlignCenter" /></button>
				<button hlmToggleGroupItem value="right" aria-label="Align right"><ng-icon name="phosphorTextAlignRight" /></button>
			</div>
		`,
  }),
};

/** Disabling the whole group versus disabling a single item within it. */
export const Disabled: Story = {
  render: () => ({
    template: `
			<div class="flex flex-col gap-4">
				<div hlmToggleGroup value="bold" disabled>
					<button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
					<button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
					<button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
				</div>
				<div hlmToggleGroup value="bold">
					<button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
					<button hlmToggleGroupItem value="italic" aria-label="Toggle italic" disabled><ng-icon name="phosphorTextItalic" /></button>
					<button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
				</div>
			</div>
		`,
  }),
};
