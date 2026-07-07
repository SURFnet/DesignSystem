import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HlmTextarea, HlmTextareaImports } from '..';
import { textareaContract } from '@surfnet/curve-contracts';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<HlmTextarea> = {
  title: 'Components/Textarea',
  component: HlmTextarea,
  decorators: [
    moduleMetadata({
      imports: [HlmTextareaImports, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: textareaContract.docs.description,
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
} as Meta<HlmTextarea>;

export default meta;
type Story = StoryObj<HlmTextarea>;

/** Default textarea — auto-sizes to content. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<textarea hlmTextarea ${argsToTemplate(args)}></textarea>
		`,
  }),
};

/** Disabled state. */
export const Disabled: Story = {
  render: (args) => ({
    props: { ...args, disabled: true, placeholder: 'Cannot type here' },
    template: `
			<textarea hlmTextarea ${argsToTemplate(args)}></textarea>
		`,
  }),
};

/** Invalid state (e.g. after failed form validation). Touch the field to test the minimum of 8 characters. */
export const Invalid: Story = {
  render: () => ({
    props: {
      placeholder: 'This field has an error',
      form: new FormGroup({
        test: new FormControl('', { validators: [Validators.required, Validators.minLength(8)] }),
      }),
    },
    template: `
			<form [formGroup]="form" class="w-full max-w-md">
				<div hlmField>
					<textarea hlmTextarea formControlName="test" [placeholder]="placeholder"></textarea>
				</div>
			</form>
		`,
  }),
};
