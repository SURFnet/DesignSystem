import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldContract } from '@surfnet/contracts';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from './field';

const meta = {
  title: 'Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component: fieldContract.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: fieldContract.orientations,
      table: {
        defaultValue: { summary: fieldContract.defaultOrientation },
      },
    },
  },
  args: {
    orientation: fieldContract.defaultOrientation,
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A label, input, and helper description. */
export const Default: Story = {
  render: (args) => (
    <Field {...args} className="w-72">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@surf.nl" />
      <FieldDescription>This is an input description.</FieldDescription>
    </Field>
  ),
};

/** A horizontal field, e.g. a checkbox with its label. */
export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-72">
      <Checkbox id="remember" />
      <FieldLabel htmlFor="remember">Remember me</FieldLabel>
    </Field>
  ),
};

/** An invalid field showing an error message. */
export const WithError: Story = {
  render: () => (
    <Field data-invalid className="w-72">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" type="password" aria-invalid />
      <FieldError>Password must be at least 8 characters.</FieldError>
    </Field>
  ),
};

/** Several fields grouped, with a labelled separator. */
export const Group: Story = {
  render: () => (
    <FieldGroup className="w-72">
      <Field>
        <FieldLabel htmlFor="g-email">Email</FieldLabel>
        <Input id="g-email" type="email" placeholder="you@surf.nl" />
      </Field>
      <FieldSeparator>Or continue with</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="g-password">Password</FieldLabel>
        <Input id="g-password" type="password" />
      </Field>
    </FieldGroup>
  ),
};
