import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBell,
  tablerCheck,
  tablerDownload,
  tablerHeart,
  tablerPlus,
  tablerSearch,
  tablerSettings,
  tablerTrash,
  tablerUser,
} from '@ng-icons/tabler-icons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { HlmIcon } from './hlm-icon';

/**
 * Icons come from [`@ng-icons/tabler-icons`](https://ng-icons.github.io/ng-icons/), the
 * Tabler set for ng-icons. Both `@ng-icons/core` and `@ng-icons/tabler-icons` are exposed
 * as **optional peer dependencies** of `@surfnet/angular`:
 *
 * ```bash
 * pnpm add @surfnet/angular @ng-icons/core @ng-icons/tabler-icons
 * ```
 *
 * Register the glyphs you need with `provideIcons` (import the named export, e.g.
 * `tablerPlus`), then render them through the vendored `hlm` directive:
 *
 * ```ts
 * import { NgIcon, provideIcons } from '@ng-icons/core';
 * import { tablerPlus } from '@ng-icons/tabler-icons';
 * import { HlmIcon } from '@surfnet/angular';
 *
 * @Component({
 *   imports: [NgIcon, HlmIcon],
 *   providers: [provideIcons({ tablerPlus })],
 *   template: `<ng-icon hlm name="tablerPlus" size="base" />`,
 * })
 * ```
 *
 * The `size` input accepts `xs | sm | base | lg | xl` (or any CSS length). Inside a
 * `<button hlmBtn>` you can omit `size` — the button auto-sizes the icon per button size.
 */
const meta: Meta<HlmIcon> = {
  title: 'Foundations/Icons',
  component: HlmIcon,
  decorators: [
    moduleMetadata({
      imports: [NgIcon, HlmIcon],
      providers: [
        provideIcons({
          tablerPlus,
          tablerArrowRight,
          tablerCheck,
          tablerSearch,
          tablerSettings,
          tablerUser,
          tablerBell,
          tablerHeart,
          tablerDownload,
          tablerTrash,
        }),
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<HlmIcon>;

/** The five named sizes, from `xs` to `xl`. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-end gap-4">
        <ng-icon hlm name="tablerHeart" size="xs" />
        <ng-icon hlm name="tablerHeart" size="sm" />
        <ng-icon hlm name="tablerHeart" size="base" />
        <ng-icon hlm name="tablerHeart" size="lg" />
        <ng-icon hlm name="tablerHeart" size="xl" />
      </div>`,
  }),
};

/** A sample of Tabler glyphs rendered at the default (`base`) size. */
export const Gallery: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4">
        <ng-icon hlm name="tablerPlus" />
        <ng-icon hlm name="tablerArrowRight" />
        <ng-icon hlm name="tablerCheck" />
        <ng-icon hlm name="tablerSearch" />
        <ng-icon hlm name="tablerSettings" />
        <ng-icon hlm name="tablerUser" />
        <ng-icon hlm name="tablerBell" />
        <ng-icon hlm name="tablerHeart" />
        <ng-icon hlm name="tablerDownload" />
        <ng-icon hlm name="tablerTrash" />
      </div>`,
  }),
};
