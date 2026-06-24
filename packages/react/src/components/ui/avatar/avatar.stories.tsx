import type { Meta, StoryObj } from '@storybook/react-vite';
import { avatarContract } from '@surfnet/contracts';

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
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
      table: {
        defaultValue: { summary: avatarContract.defaultSize },
      },
    },
  },
  args: {
    size: avatarContract.defaultSize,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** An avatar with an image and a fallback. */
export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  ),
};

/** When the image fails to load, the initials fallback shows. */
export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="Grace Hopper" />
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  ),
};

/** Every size declared in the contract. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {avatarContract.sizes.map((size) => (
        <Avatar key={size} size={size} title={avatarContract.sizeDocs[size]}>
          <AvatarFallback>{size.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** Stacked avatars with an overflow count. */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>KJ</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
