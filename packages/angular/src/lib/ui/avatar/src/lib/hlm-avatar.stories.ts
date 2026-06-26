import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { avatarContract } from '@surfnet/contracts';
import { HlmAvatar, HlmAvatarImports } from '..';

const meta: Meta<HlmAvatar> = {
  title: 'Components/Avatar',
  component: HlmAvatar,
  decorators: [
    moduleMetadata({
      imports: [HlmAvatarImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: avatarContract.description,
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: avatarContract.sizes,
      description: avatarContract.sizes
        .map((size) => `\`${size}\` — ${avatarContract.sizeDocs[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: avatarContract.defaultSize },
      },
    },
  },
  args: {
    size: avatarContract.defaultSize,
  },
};

export default meta;
type Story = StoryObj<HlmAvatar>;

/** An avatar with an image and a fallback. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-avatar ${argsToTemplate(args)}>
        <img hlmAvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace">
        <span hlmAvatarFallback>AL</span>
      </hlm-avatar>
    `,
  }),
};

/** When the image fails to load, the initials fallback shows. */
export const Fallback: Story = {
  render: () => ({
    template: `
      <hlm-avatar>
        <img hlmAvatarImage src="https://example.com/does-not-exist.jpg" alt="Grace Hopper">
        <span hlmAvatarFallback>GH</span>
      </hlm-avatar>
    `,
  }),
};

/** Every size declared in the contract. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        ${avatarContract.sizes
          .map(
            (size) => `
              <hlm-avatar size="${size}" title="${avatarContract.sizeDocs[size]}">
                <span hlmAvatarFallback>
                  ${size.slice(0, 2).toUpperCase()}
                </span>
              </hlm-avatar>
            `,
          )
          .join('')}
      </div>
    `,
  }),
};

/** Stacked avatars with an overflow count. */
export const Group: Story = {
  render: () => ({
    template: `
      <hlm-avatar-group>
        <hlm-avatar>
          <span hlmAvatarFallback>AL</span>
        </hlm-avatar>

        <hlm-avatar>
          <span hlmAvatarFallback>GH</span>
        </hlm-avatar>

        <hlm-avatar>
          <span hlmAvatarFallback>KJ</span>
        </hlm-avatar>

        <hlm-avatar-group-count>+3</hlm-avatar-group-count>
      </hlm-avatar-group>
    `,
  }),
};
