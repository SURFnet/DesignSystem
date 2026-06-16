import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { HlmButton } from './hlm-button';

// `disabled` is contributed by the BrnButton host directive rather than HlmButton
// itself, so widen the story args to expose it as a control.
type ButtonArgs = HlmButton & { disabled: boolean };

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: HlmButton,
  decorators: [moduleMetadata({ imports: [HlmButton] })],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
  },
  args: {
    variant: 'default',
    size: 'default',
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

/** The default button — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  args: { disabled: false },
  render: (args) => ({
    props: args,
    template: `<button hlmBtn [variant]="variant" [size]="size" [disabled]="disabled">Button</button>`,
  }),
};

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn variant="default">Default</button>
        <button hlmBtn variant="secondary">Secondary</button>
        <button hlmBtn variant="outline">Outline</button>
        <button hlmBtn variant="ghost">Ghost</button>
        <button hlmBtn variant="destructive">Destructive</button>
        <button hlmBtn variant="link">Link</button>
      </div>`,
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

/** Square icon-only sizes. Provide an `aria-label` for accessibility. */
export const IconSizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button hlmBtn size="icon-xs" aria-label="Add">+</button>
        <button hlmBtn size="icon-sm" aria-label="Add">+</button>
        <button hlmBtn size="icon" aria-label="Add">+</button>
        <button hlmBtn size="icon-lg" aria-label="Add">+</button>
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

/** The directive also styles anchors — handy for links that look like buttons. */
export const AsLink: Story = {
  render: () => ({
    template: `<a hlmBtn variant="link" href="https://www.surf.nl">Visit SURF</a>`,
  }),
};
