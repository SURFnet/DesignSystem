import type { Meta, StoryObj } from '@storybook/react-vite';
import { textareaContract } from '@surfnet/contracts';

import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: textareaContract.description,
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Type something…',
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default textarea — auto-sizes to content. */
export const Default: Story = {};

/** Disabled state. */
export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Cannot type here' },
};

/** Invalid state (e.g. after failed form validation). */
export const Invalid: Story = {
  render: () => <Textarea aria-invalid="true" placeholder="This field has an error" />,
};
