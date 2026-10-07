import type { Meta, StoryObj } from '@storybook/react-vite';
import { inputContract } from '@surfnet/curve-contracts';

import { Field, FieldLabel } from '@/components/ui/field';

import { Input } from './input';

const meta = {
  title: 'Components/Input',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: Input,
  parameters: {
    docs: {
      description: {
        component: inputContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=65-520',
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
    optional: {
      control: 'boolean',
      description:
        'Fields are required by default (`aria-required="true"`). `optional` drops `aria-required`; in a `Field optional` the label also gets "(optioneel)".',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    type: 'text',
    placeholder: 'Type something…',
    disabled: false,
    optional: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default input with its label — tweak it via the controls; toggle `optional` to see the label suffix. */
export const Default: Story = {
  render: ({ optional, ...args }) => (
    <Field optional={optional} className="w-72">
      <FieldLabel htmlFor="input-default">Naam</FieldLabel>
      <Input id="input-default" optional={optional} {...args} />
    </Field>
  ),
};

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
