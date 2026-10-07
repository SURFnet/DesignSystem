import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldContract } from '@surfnet/curve-contracts';

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
        component: fieldContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=28934-79420',
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: fieldContract.props.orientations,
      description: fieldContract.props.orientations
        .map(
          (orientation) => `\`${orientation}\` — ${fieldContract.docs.orientations[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: fieldContract.defaults.orientations },
      },
    },
    optional: {
      control: 'boolean',
      description: fieldContract.props.necessities
        .map((necessity) => `\`${necessity}\` — ${fieldContract.docs.necessities[necessity]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    orientation: fieldContract.defaults.orientations,
    optional: false,
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

/**
 * Fields are required by default. Mark the exception with `optional`: the label gets an
 * "(optioneel)" suffix and the control loses `aria-required`.
 */
export const Optional: Story = {
  render: () => (
    <Field optional className="w-72">
      <FieldLabel htmlFor="phone">Telefoonnummer</FieldLabel>
      <Input id="phone" type="tel" autoComplete="tel" />
    </Field>
  ),
};

/**
 * Required and optional fields side by side. Only the optional ones are marked; `optionalText`
 * swaps the suffix for an English form. A consent checkbox stays required, a newsletter one is optional.
 */
export const MixedForm: Story = {
  render: () => (
    <FieldGroup className="w-72">
      <Field>
        <FieldLabel htmlFor="mixed-name">Full name</FieldLabel>
        <Input id="mixed-name" autoComplete="name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="mixed-email">Email</FieldLabel>
        <Input id="mixed-email" type="email" autoComplete="email" />
      </Field>
      <Field optional>
        <FieldLabel htmlFor="mixed-phone" optionalText="(optional)">
          Phone number
        </FieldLabel>
        <Input id="mixed-phone" type="tel" autoComplete="tel" />
        <FieldDescription>Only used if we can't reach you by email.</FieldDescription>
      </Field>
      <Field orientation="horizontal" optional>
        <Checkbox id="mixed-newsletter" />
        <FieldLabel htmlFor="mixed-newsletter" optionalText="(optional)">
          Send me the newsletter
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="mixed-terms" />
        <FieldLabel htmlFor="mixed-terms">I accept the terms of use</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};
