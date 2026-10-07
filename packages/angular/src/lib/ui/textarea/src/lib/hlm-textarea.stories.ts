import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HlmTextarea, HlmTextareaImports } from '..';
import { HlmFieldImports } from '../../../field/src';
import { textareaContract } from '@surfnet/curve-contracts';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<HlmTextarea> = {
  title: 'Components/Textarea',
  component: HlmTextarea,
  decorators: [
    moduleMetadata({
      imports: [HlmTextareaImports, HlmFieldImports, ReactiveFormsModule],
    }),
  ],
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
        'Fields are required by default (`aria-required="true"`). `optional` drops `aria-required`; in an `hlmField optional` the label also gets "(optioneel)".',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    placeholder: 'Type something…',
    disabled: false,
    optional: false,
  },
} as Meta<HlmTextarea>;

export default meta;
type Story = StoryObj<HlmTextarea>;

/** Default textarea with its label — auto-sizes to content; toggle `optional` to see the label suffix. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div hlmField class="w-72" [optional]="optional">
				<label hlmFieldLabel for="textarea-default">Toelichting</label>
				<textarea hlmTextarea id="textarea-default" ${argsToTemplate(args)}></textarea>
			</div>
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
