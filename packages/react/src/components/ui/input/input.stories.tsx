import type { Meta, StoryObj } from '@storybook/react-vite';
import { inputContract } from '@surfnet/contracts';

import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: inputContract.description,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'The native input type.',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'text',
    placeholder: 'Type something…',
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default input — tweak it via the controls. */
export const Default: Story = {};

/** Common input types side by side. */
export const Types: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="search" placeholder="Search" />
    </div>
  ),
};

/** Disabled state. */
export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled' },
};

/** Invalid state, driven by `aria-invalid`. */
export const Invalid: Story = {
  render: () => <Input aria-invalid placeholder="Invalid value" className="w-72" />,
};
