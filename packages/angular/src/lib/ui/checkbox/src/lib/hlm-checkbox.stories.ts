import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HlmCheckbox, HlmCheckboxImports } from '..';
import { HlmLabel } from '../../../label/src/lib/hlm-label';
import { checkboxContract } from '@surfnet/curve-contracts';
import { HlmFieldImports } from '../../../field/src';

const meta: Meta<HlmCheckbox> = {
  title: 'Components/Checkbox',
  component: HlmCheckbox,
  decorators: [
    moduleMetadata({
      imports: [HlmCheckboxImports, HlmLabel, HlmFieldImports, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: checkboxContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18692-39410&t=vT3gKkMDSpQaeqci-4',
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<HlmCheckbox>;

/** A controlled checkbox driven by Angular state — the typical usage pattern. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-checkbox inputId="testCheckbox" checked [disabled]="disabled" aria-label="Checkbox" />
    `,
  }),
};

/** A checkbox paired with a clickable label. */
export const WithLabel: Story = {
  render: (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-checkbox checked [disabled]="disabled" />
        Accept terms and conditions
      </label>
    `,
  }),
};

/** An unchecked checkbox. */
export const Unchecked: Story = {
  render: (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-checkbox [disabled]="disabled" />
        Unchecked
      </label>
    `,
  }),
};

/** A checked checkbox. */
export const Checked: Story = {
  render: (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-checkbox checked [disabled]="disabled" />
        Checked
      </label>
    `,
  }),
};

/** An indeterminate checkbox. */
export const Indeterminate: Story = {
  render: (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-checkbox indeterminate="true" [disabled]="disabled" />
        Indeterminate
      </label>
    `,
  }),
};

/** A disabled unchecked checkbox. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-checkbox [disabled]="disabled" />
        Disabled
      </label>
    `,
  }),
};

/** A disabled checked checkbox. */
export const DisabledChecked: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-checkbox checked [disabled]="disabled" />
        Disabled checked
      </label>
    `,
  }),
};

/** Invalid, such as a required checkbox left unchecked */
export const Invalid: Story = {
  render: (args) => {
    const form = new FormGroup({
      terms: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });
    form.markAllAsTouched();

    return {
      props: { ...args, form },
      template: `
        <form [formGroup]="form">
          <div hlmField orientation="horizontal">
            <hlm-checkbox inputId="invalid-terms" formControlName="terms" [disabled]="disabled" />
            <div hlmFieldContent>
              <label hlmFieldLabel for="invalid-terms">I accept the terms</label>
              <hlm-field-error />
            </div>
          </div>
        </form>
      `,
    };
  },
};
