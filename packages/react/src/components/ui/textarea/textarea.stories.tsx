import type { Meta, StoryObj } from '@storybook/react-vite';
import { textareaContract } from '@surfnet/curve-contracts';

import { Field, FieldLabel } from '@/components/ui/field';

import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: textareaContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=177-367',
    },
  },
  argTypes: {
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
    placeholder: 'Type something…',
    disabled: false,
    optional: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default textarea with its label — auto-sizes to content; toggle `optional` to see the label suffix. */
export const Default: Story = {
  render: ({ optional, ...args }) => (
    <Field optional={optional} className="w-72">
      <FieldLabel htmlFor="textarea-default">Toelichting</FieldLabel>
      <Textarea id="textarea-default" optional={optional} {...args} />
    </Field>
  ),
};

/** Disabled state. */
export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Cannot type here' },
};

/** Invalid state (e.g. after failed form validation). */
export const Invalid: Story = {
  render: () => <Textarea aria-invalid="true" placeholder="This field has an error" />,
};
