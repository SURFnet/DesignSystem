import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { inputContract } from '@surfnet/curve-contracts';
import { HlmInput, HlmInputImports } from '..';
import { HlmButton, HlmFieldImports, HlmLabel } from '../../../../../public-api';

/** Native `<input>` attributes the stories expose as controls, on top of HlmInput's own inputs. */
type InputArgs = HlmInput & { type: string; placeholder: string; disabled: boolean };

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: HlmInput,
  decorators: [
    moduleMetadata({
      imports: [
        HlmInputImports,
        HlmFieldImports,
        HlmLabel,
        HlmButton,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
  ],
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
        'Fields are required by default (`aria-required="true"`). `optional` drops `aria-required`; in an `hlmField optional` the label also gets "(optioneel)".',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    type: 'text',
    placeholder: 'Type something…',
    disabled: false,
    optional: false,
  },
};

export default meta;
type Story = StoryObj<InputArgs>;

/** The default input with its label — tweak it via the controls; toggle `optional` to see the label suffix. */
export const Default: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
			<div hlmField class="w-72" [optional]="optional">
				<label hlmFieldLabel for="input-default">Naam</label>
				<input hlmInput id="input-default" ${argsToTemplate(args)} />
			</div>
    `,
  }),
};

/** Common input types side by side. */
export const Types: Story = {
  render: () => ({
    template: `
			<div class="flex w-72 flex-col gap-3">
				<input hlmInput type="text" placeholder="Text" />
				<input hlmInput type="email" placeholder="Email" />
				<input hlmInput type="password" placeholder="Password" />
				<input hlmInput type="search" placeholder="Search" />
			</div>
		`,
  }),
};

/** Disabled state. */
export const Disabled: Story = {
  render: () => ({
    template: `
    	<input aria-label="Email" disabled class="w-72" hlmInput placeholder="Disabled"/>
    `,
  }),
};

/** Invalid state. Touch the input to test the required validator. */
export const Error: Story = {
  render: () => ({
    props: {
      form: new FormGroup({
        test: new FormControl('', { validators: [Validators.required] }),
      }),
    },
    template: `
			<form [formGroup]="form" class="w-full max-w-md">
    		<input hlmInput formControlName="test" class="w-72" placeholder="Invalid value" />
			</form>
    `,
  }),
};
