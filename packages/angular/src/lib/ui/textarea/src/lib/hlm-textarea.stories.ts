import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HlmTextarea, HlmTextareaImports } from '..';
import { HlmFieldImports } from '../../../field/src';
import { textareaContract } from '@surfnet/curve-contracts';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

/** Story-only `optional` drives the wrapping `hlmField optional`. */
type TextareaArgs = HlmTextarea & { placeholder: string; disabled: boolean; optional: boolean };

const meta: Meta<TextareaArgs> = {
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
        'Fields are required by default (`aria-required="true"`). Story control for the wrapping `hlmField optional`: the label gets "(optioneel)" and the control drops `aria-required`.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    placeholder: 'Type something…',
    disabled: false,
    optional: false,
  },
} as Meta<TextareaArgs>;

export default meta;
type Story = StoryObj<TextareaArgs>;

/** Default textarea with its label — auto-sizes to content; toggle `optional` to see the label suffix. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div hlmField class="w-72" [optional]="optional">
				<label hlmFieldLabel for="textarea-default">Toelichting</label>
				<textarea hlmTextarea id="textarea-default" ${argsToTemplate(args, { exclude: ['optional'] })}></textarea>
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

/** Invalid state: a field below its minimum length shows its error message. */
export const Invalid: Story = {
  render: () => {
    const form = new FormGroup({
      message: new FormControl('Hi', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
    form.markAllAsTouched();

    return {
      props: { form },
      template: `
				<form [formGroup]="form" class="w-full max-w-md">
					<div hlmField>
						<label hlmFieldLabel for="invalid-message">Message</label>
						<textarea hlmTextarea formControlName="message" id="invalid-message"></textarea>
						<hlm-field-error />
					</div>
				</form>
			`,
    };
  },
};
