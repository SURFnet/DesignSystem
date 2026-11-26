import type { Meta, StoryObj } from '@storybook/react-vite';
import { avatarContract } from '@surfnet/curve-contracts';

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: avatarContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=296-5188&t=vT3gKkMDSpQaeqci-4',
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: avatarContract.props.sizes,
      description: avatarContract.props.sizes
        .map((size) => `\`${size}\` — ${avatarContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: avatarContract.defaults.sizes },
      },
    },
  },
  args: {
    size: avatarContract.defaults.sizes,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** An avatar with an image and a fallback. */
export const Default: Story = {
  render: (args) => (
    <Avatar title={avatarContract.docs.sizes['default']} {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  ),
};

/** Compact size for dense lists and inline mentions. */
export const Sm: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Avatar title={avatarContract.docs.sizes['sm']} {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace" />
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
};

/** Large size for profile headers and prominent placements. */
export const Lg: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <Avatar title={avatarContract.docs.sizes['lg']} {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace" />
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
};

/** When the image fails to load, the initials fallback shows. */
export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://example.com/does-not-exist.jpg" alt="Grace Hopper" />
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  ),
};

/** Stacked avatars with an overflow count. */
export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      <Avatar {...args}>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>KJ</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
