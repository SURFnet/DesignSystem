import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconArrowRight,
  IconBell,
  IconCheck,
  IconDownload,
  IconHeart,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';

/**
 * Icons come from [`@tabler/icons-react`](https://tabler.io/icons), exposed as an
 * **optional peer dependency** of `@surfnet/react`. Install it alongside the package:
 *
 * ```bash
 * pnpm add @surfnet/react @tabler/icons-react
 * ```
 *
 * Each icon is its own tree-shaken component, prefixed `Icon` (e.g. `IconPlus`):
 *
 * ```tsx
 * import { IconPlus } from '@tabler/icons-react';
 *
 * <IconPlus />                 // inherits the surrounding font size (1em)
 * <IconPlus className="size-6" /> // size with a Tailwind `size-*` utility
 * ```
 *
 * Inside a `<Button>` you don't need a size class — the button auto-sizes the SVG per
 * button size. Use `data-icon="inline-start"` / `data-icon="inline-end"` to tighten the
 * padding when an icon sits next to text.
 */
const meta = {
  title: 'Foundations/Icons',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const icons = [
  { name: 'IconPlus', Icon: IconPlus },
  { name: 'IconArrowRight', Icon: IconArrowRight },
  { name: 'IconCheck', Icon: IconCheck },
  { name: 'IconSearch', Icon: IconSearch },
  { name: 'IconSettings', Icon: IconSettings },
  { name: 'IconUser', Icon: IconUser },
  { name: 'IconBell', Icon: IconBell },
  { name: 'IconHeart', Icon: IconHeart },
  { name: 'IconDownload', Icon: IconDownload },
  { name: 'IconTrash', Icon: IconTrash },
] as const;

/** A sample of Tabler glyphs rendered at `size-6`. */
export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {icons.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex w-24 flex-col items-center gap-2 rounded-lg border border-border p-3 text-center"
        >
          <Icon className="size-6" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

/** The same icon scaled with Tailwind `size-*` utilities. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <IconHeart className="size-4" />
      <IconHeart className="size-6" />
      <IconHeart className="size-8" />
      <IconHeart className="size-12" />
    </div>
  ),
};
