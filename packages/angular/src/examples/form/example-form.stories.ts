import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';

import { ExampleForm } from './example-form';
import source from './example-form.ts?raw';

// Show the example as a consumer writes it: from the published package, not a relative path.
const code = source.replace("from '../../public-api'", "from '@surfnet/curve-angular'");

const meta: Meta<ExampleForm> = {
  title: 'Examples/Forms',
  component: ExampleForm,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator((story) => `<div class="w-full max-w-md min-w-100">${story}</div>`),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A form with accessible error messages, built with Curve components. Submit the empty form to see the error summary: focus moves to it, and each error links to its field. Why each part is there is explained in [Formulieren bouwen](?path=/docs/curve-voor-developers--formulieren-bouwen).',
      },
      source: { code, language: 'ts' },
    },
  },
};

export default meta;
type Story = StoryObj<ExampleForm>;

/** The empty form. Press Submit to see the validation. */
export const Default: Story = {};

/** The page loads with errors, e.g. after server-side validation: focus starts on the summary. */
export const WithErrors: Story = {
  args: { initialErrors: ['name', 'email'] },
};
