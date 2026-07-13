import type { Meta, StoryObj } from '@storybook/react-vite';
import { accordionContract } from '@surfnet/curve-contracts';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: accordionContract.docs.description,
      },
    },
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded at the same time.',
      table: { defaultValue: { summary: 'false' } },
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description:
        "The accordion's visual orientation; controls whether roving focus uses the up/down or left/right arrow keys.",
      table: { defaultValue: { summary: 'vertical' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the whole accordion should ignore user interaction.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    multiple: false,
    orientation: 'vertical',
    disabled: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    value: 'item-1',
    question: 'Is it accessible?',
    answer: 'Yes. It adheres to the WAI-ARIA accordion design pattern.',
  },
  {
    value: 'item-2',
    question: 'Is it styled?',
    answer: 'Yes. It comes with default styles that match the rest of the design system.',
  },
  {
    value: 'item-3',
    question: 'Is it animated?',
    answer: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

/** The default accordion — tweak `multiple`, `orientation`, and `disabled` via the controls. */
export const Default: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={['item-1']} className="w-96">
      {faqItems.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/** With `multiple`, several items can stay expanded at the same time. */
export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={['item-1', 'item-2']} className="w-96">
      {faqItems.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/** A single item can be disabled independently of the rest of the accordion. */
export const DisabledItem: Story = {
  render: () => (
    <Accordion defaultValue={['item-1']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA accordion design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled item</AccordionTrigger>
        <AccordionContent>This content is unreachable while the item is disabled.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** Horizontal orientation moves roving focus to the left/right arrow keys. */
export const Horizontal: Story = {
  render: () => (
    <Accordion orientation="horizontal" defaultValue={['item-1']} className="w-96">
      {faqItems.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
