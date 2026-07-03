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
import { HlmButton, HlmLabel } from '../../../../../public-api';

const meta: Meta<HlmInput> = {
  title: 'Components/Input',
  component: HlmInput,
  decorators: [
    moduleMetadata({
      imports: [HlmInputImports, HlmLabel, HlmButton, FormsModule, ReactiveFormsModule],
    }),
  ],
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
};

export default meta;
type Story = StoryObj<HlmInput>;

/** The default input — tweak it via the controls. */
export const Default: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
    	<input hlmInput type="text" class="w-72" ${argsToTemplate(args)} />
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
