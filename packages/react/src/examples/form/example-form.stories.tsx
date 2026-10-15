import type { Meta, StoryObj } from '@storybook/react-vite';

import { ExampleForm } from './example-form';
import source from './example-form.tsx?raw';

// Show the example as a consumer writes it: from the published package, not the `@/` alias.
const code = source.replace("from '@/index'", "from '@surfnet/curve-react'");

const meta: Meta<typeof ExampleForm> = {
  title: 'Examples/Forms',
  component: ExampleForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md min-w-100">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A form with accessible error messages, built with Curve components. Submit the empty form to see the error summary: focus moves to it, and each error links to its field. Why each part is there is explained in [Formulieren bouwen](?path=/docs/curve-voor-developers--formulieren-bouwen).',
      },
      source: { code, language: 'tsx' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExampleForm>;

/** The empty form. Press Submit to see the validation. */
export const Default: Story = {};

/** The page loads with errors, e.g. after server-side validation: focus starts on the summary. */
export const WithErrors: Story = {
  args: { initialErrors: ['name', 'email'] },
};
