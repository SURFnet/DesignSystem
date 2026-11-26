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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=123-75',
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
    spacing: {
      control: 'number',
      description: `The spacing between the items. 0 gives the default 'merged' look.`,
    },
  },
  args: {
    variant: toggleContract.defaults.variants,
    size: toggleContract.defaults.sizes,
    orientation: 'horizontal',
    type: 'single',
    disabled: false,
    spacing: 0,
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

/** Outline variant — bordered, transparent fill. */
export const Outline: Story = {
  render: () => ({
    template: `
      <div hlmToggleGroup variant="outline" value="bold">
        <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
        <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
        <button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
      </div>
    `,
  }),
};

/** Small size — compact toggle group for toolbars. */
export const Sm: Story = {
  render: () => ({
    template: `
      <div hlmToggleGroup size="sm" value="bold">
        <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
        <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
        <button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
      </div>
    `,
  }),
};

/** Large size — prominent controls. */
export const Lg: Story = {
  render: () => ({
    template: `
      <div hlmToggleGroup size="lg" value="bold">
        <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
        <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
        <button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
      </div>
    `,
  }),
};

/** You can specify the spacing between the items. 0 gives the default 'merged' look. */
export const WithSpacing: Story = {
  render: () => ({
    template: `
      <div hlmToggleGroup spacing="2" value="bold">
        <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
        <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
        <button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
      </div>
    `,
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

/** Disabling the whole group. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div hlmToggleGroup value="bold" disabled>
        <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
        <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="phosphorTextItalic" /></button>
        <button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
      </div>
    `,
  }),
};

/** Disabling a single item within the group. */
export const DisabledItem: Story = {
  render: () => ({
    template: `
      <div hlmToggleGroup value="bold">
        <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="phosphorTextB" /></button>
        <button hlmToggleGroupItem value="italic" aria-label="Toggle italic" disabled><ng-icon name="phosphorTextItalic" /></button>
        <button hlmToggleGroupItem value="underline" aria-label="Toggle underline"><ng-icon name="phosphorTextUnderline" /></button>
      </div>
    `,
  }),
};
