import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { radioGroupContract } from '@surfnet/curve-contracts';
import { HlmFieldImports } from '../../../field/src';
import { HlmLabel } from '../../../label/src/lib/hlm-label';
import { HlmRadioGroup, HlmRadioGroupImports } from '..';

// `disabled` is contributed by the BrnRadioGroup host directive rather than HlmRadioGroup
// itself, so widen the story args to expose it as a control.
type RadioGroupArgs = HlmRadioGroup & { disabled: boolean };

const meta: Meta<RadioGroupArgs> = {
  title: 'Components/RadioGroup',
  component: HlmRadioGroup,
  decorators: [
    moduleMetadata({
      imports: [HlmRadioGroupImports, HlmLabel, HlmFieldImports, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: radioGroupContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=64-316',
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
type Story = StoryObj<RadioGroupArgs>;

/** A radio group with a few options — the typical usage pattern. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<hlm-radio-group value="comfortable" ${argsToTemplate(args)}>
				<div class="flex items-center gap-3">
					<hlm-radio value="default" inputId="r1">
						<hlm-radio-indicator indicator />
					</hlm-radio>
					<label hlmLabel for="r1">Default</label>
				</div>
				<div class="flex items-center gap-3">
					<hlm-radio value="comfortable" inputId="r2">
						<hlm-radio-indicator indicator />
					</hlm-radio>
					<label hlmLabel for="r2">Comfortable</label>
				</div>
				<div class="flex items-center gap-3">
					<hlm-radio value="compact" inputId="r3">
						<hlm-radio-indicator indicator />
					</hlm-radio>
					<label hlmLabel for="r3">Compact</label>
				</div>
			</hlm-radio-group>
		`,
  }),
};

/**
 * A realistic composed example: a `fieldset[hlmFieldSet]` with a legend and description
 * groups the radio group, and each option's `label[hlmFieldLabel]` doubles as the click
 * target for its item.
 */
export const InFieldset: Story = {
  render: () => ({
    template: `
			<fieldset hlmFieldSet class="w-80">
				<legend hlmFieldLegend>Notification preference</legend>
				<p hlmFieldDescription>Choose how you'd like to receive updates.</p>
				<hlm-radio-group value="email">
					<div class="flex items-center gap-3">
						<hlm-radio value="email" inputId="notif-email">
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmFieldLabel for="notif-email">Email</label>
					</div>
					<div class="flex items-center gap-3">
						<hlm-radio value="push" inputId="notif-push">
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmFieldLabel for="notif-push">Push notification</label>
					</div>
					<div class="flex items-center gap-3">
						<hlm-radio value="none" inputId="notif-none">
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmFieldLabel for="notif-none">None</label>
					</div>
				</hlm-radio-group>
			</fieldset>
		`,
  }),
};

/**
 * Choice cards: wrap each option's `hlmField` in a `label[hlmFieldLabel]` and the whole
 * label becomes a selectable card. The selected card gets a primary-tinted border and
 * background. The group is named by a visible `label[hlmLabel]` via `aria-labelledby`.
 */
export const ChoiceCard: Story = {
  render: () => ({
    template: `
			<div class="flex max-w-sm flex-col gap-3">
				<label hlmLabel id="plan-label">Plan</label>
				<hlm-radio-group value="plus" aria-labelledby="plan-label">
					<label hlmFieldLabel for="plus-plan">
						<div hlmField orientation="horizontal">
							<div hlmFieldContent>
								<div hlmFieldTitle id="plus-plan-title">Plus</div>
								<p hlmFieldDescription id="plus-plan-description">For individuals and small teams.</p>
							</div>
							<hlm-radio
								value="plus"
								inputId="plus-plan"
								aria-labelledby="plus-plan-title"
								aria-describedby="plus-plan-description"
							>
								<hlm-radio-indicator indicator />
							</hlm-radio>
						</div>
					</label>
					<label hlmFieldLabel for="pro-plan">
						<div hlmField orientation="horizontal">
							<div hlmFieldContent>
								<div hlmFieldTitle id="pro-plan-title">Pro</div>
								<p hlmFieldDescription id="pro-plan-description">For growing businesses.</p>
							</div>
							<hlm-radio
								value="pro"
								inputId="pro-plan"
								aria-labelledby="pro-plan-title"
								aria-describedby="pro-plan-description"
							>
								<hlm-radio-indicator indicator />
							</hlm-radio>
						</div>
					</label>
					<label hlmFieldLabel for="enterprise-plan">
						<div hlmField orientation="horizontal">
							<div hlmFieldContent>
								<div hlmFieldTitle id="enterprise-plan-title">Enterprise</div>
								<p hlmFieldDescription id="enterprise-plan-description">For large teams and enterprises.</p>
							</div>
							<hlm-radio
								value="enterprise"
								inputId="enterprise-plan"
								aria-labelledby="enterprise-plan-title"
								aria-describedby="enterprise-plan-description"
							>
								<hlm-radio-indicator indicator />
							</hlm-radio>
						</div>
					</label>
				</hlm-radio-group>
			</div>
		`,
  }),
};

/** Disabling a single item versus disabling the whole group. */
export const Disabled: Story = {
  render: () => ({
    template: `
			<div class="flex flex-col gap-6">
				<hlm-radio-group value="comfortable" class="w-fit">
					<div class="flex items-center gap-3">
						<hlm-radio value="default" inputId="d1" disabled>
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmLabel for="d1">Default (item disabled)</label>
					</div>
					<div class="flex items-center gap-3">
						<hlm-radio value="comfortable" inputId="d2">
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmLabel for="d2">Comfortable</label>
					</div>
				</hlm-radio-group>
				<hlm-radio-group value="comfortable" disabled class="w-fit">
					<div class="flex items-center gap-3">
						<hlm-radio value="default" inputId="d3">
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmLabel for="d3">Default</label>
					</div>
					<div class="flex items-center gap-3">
						<hlm-radio value="comfortable" inputId="d4">
							<hlm-radio-indicator indicator />
						</hlm-radio>
						<label hlmLabel for="d4">Comfortable (group disabled)</label>
					</div>
				</hlm-radio-group>
			</div>
		`,
  }),
};

/** Invalid state via a required reactive-form control, pre-touched so the error shows immediately. */
export const Invalid: Story = {
  render: () => {
    const form = new FormGroup({
      plan: new FormControl('', { validators: [Validators.required] }),
    });
    form.markAllAsTouched();

    return {
      props: { form },
      template: `
				<form [formGroup]="form" class="w-fit">
					<hlm-radio-group formControlName="plan">
						<div class="flex items-center gap-3">
							<hlm-radio value="one" inputId="i1">
								<hlm-radio-indicator indicator />
							</hlm-radio>
							<label hlmLabel for="i1">Option one</label>
						</div>
						<div class="flex items-center gap-3">
							<hlm-radio value="two" inputId="i2">
								<hlm-radio-indicator indicator />
							</hlm-radio>
							<label hlmLabel for="i2">Option two</label>
						</div>
					</hlm-radio-group>
				</form>
			`,
    };
  },
};
