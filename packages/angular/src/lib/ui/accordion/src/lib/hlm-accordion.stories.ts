import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { accordionContract } from '@surfnet/curve-contracts';

import { HlmAccordion, HlmAccordionImports } from '..';

// `type` is contributed by the BrnAccordion host directive rather than HlmAccordion
// itself, so widen the story args to expose it as a control.
type AccordionArgs = HlmAccordion & {
  type: 'single' | 'multiple';
};

const meta: Meta<AccordionArgs> = {
  title: 'Components/Accordion',
  component: HlmAccordion,
  decorators: [
    moduleMetadata({
      imports: [HlmAccordionImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: accordionContract.docs.description,
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be expanded at the same time.',
      table: { defaultValue: { summary: 'single' } },
    },
  },
  args: {
    type: 'single',
  },
};

export default meta;
type Story = StoryObj<AccordionArgs>;

/** The default accordion — tweak `type` via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div hlmAccordion ${argsToTemplate(args)} class="w-96">
				<div hlmAccordionItem [isOpened]="true">
					<hlm-accordion-trigger>Is it accessible?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It adheres to the WAI-ARIA accordion design pattern.</hlm-accordion-content>
				</div>
				<div hlmAccordionItem>
					<hlm-accordion-trigger>Is it styled?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It comes with default styles that match the rest of the design system.</hlm-accordion-content>
				</div>
				<div hlmAccordionItem>
					<hlm-accordion-trigger>Is it animated?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It's animated by default, but you can disable it if you prefer.</hlm-accordion-content>
				</div>
			</div>
		`,
  }),
};

/** With `type="multiple"`, several items can stay expanded at the same time. */
export const Multiple: Story = {
  render: () => ({
    template: `
			<div hlmAccordion type="multiple" class="w-96">
				<div hlmAccordionItem [isOpened]="true">
					<hlm-accordion-trigger>Is it accessible?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It adheres to the WAI-ARIA accordion design pattern.</hlm-accordion-content>
				</div>
				<div hlmAccordionItem [isOpened]="true">
					<hlm-accordion-trigger>Is it styled?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It comes with default styles that match the rest of the design system.</hlm-accordion-content>
				</div>
				<div hlmAccordionItem>
					<hlm-accordion-trigger>Is it animated?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It's animated by default, but you can disable it if you prefer.</hlm-accordion-content>
				</div>
			</div>
		`,
  }),
};

/** A single item can be disabled independently of the rest of the accordion. */
export const DisabledItem: Story = {
  render: () => ({
    template: `
			<div hlmAccordion class="w-96">
				<div hlmAccordionItem [isOpened]="true">
					<hlm-accordion-trigger>Is it accessible?</hlm-accordion-trigger>
					<hlm-accordion-content>Yes. It adheres to the WAI-ARIA accordion design pattern.</hlm-accordion-content>
				</div>
				<div hlmAccordionItem [disabled]="true">
					<hlm-accordion-trigger>Disabled item</hlm-accordion-trigger>
					<hlm-accordion-content>This content is unreachable while the item is disabled.</hlm-accordion-content>
				</div>
			</div>
		`,
  }),
};
