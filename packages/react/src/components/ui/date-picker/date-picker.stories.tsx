import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { datePickerContract } from '@surfnet/curve-contracts';

import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import { DatePicker, DateRangePicker } from './date-picker';
import { DatePickerInput } from './date-picker-input';

const meta = {
  title: 'Components/DatePicker',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: datePickerContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=302-6273&t=vT3gKkMDSpQaeqci-4',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A single-date picker — click the trigger to open the calendar popover. */
export const Default: Story = {
  render: function DefaultDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

/** Pre-filled with a selected date. */
export const WithValue: Story = {
  render: function DatePickerWithValue() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

/** A date-range picker showing two months and a from/to summary in the trigger. */
export const Range: Story = {
  render: function DateRangePickerStory() {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return <DateRangePicker dateRange={range} onDateRangeChange={setRange} />;
  },
};

/**
 * `DatePickerInput`: type a date or pick one from the calendar. Use this in forms. The label
 * points at the text input (`id` is required for that), so screen readers hear "Start date" as
 * the name and the date as the value. Press Arrow Down in the input to open the calendar.
 * Type something that isn't a date and leave the field: the input marks itself invalid.
 */
export const Input: Story = {
  render: function DatePickerInputStory() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Field className="w-72">
        <FieldLabel htmlFor="start-date">Start date</FieldLabel>
        <DatePickerInput
          id="start-date"
          date={date}
          onDateChange={setDate}
          placeholder="Oct 26, 2026"
          aria-describedby="start-date-description"
        />
        <FieldDescription id="start-date-description">
          Type a date or use the calendar.
        </FieldDescription>
      </Field>
    );
  },
};

/**
 * `DatePickerInput` in its invalid state. `aria-invalid` goes on the text input, where it is
 * allowed, and turns the whole input group red; `aria-describedby` links the error message.
 */
export const InputInvalid: Story = {
  render: function DatePickerInputInvalidStory() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Field data-invalid className="w-72">
        <FieldLabel htmlFor="end-date">End date</FieldLabel>
        <DatePickerInput
          id="end-date"
          date={date}
          onDateChange={setDate}
          aria-invalid
          aria-describedby="end-date-error"
        />
        <FieldError id="end-date-error">Enter an end date.</FieldError>
      </Field>
    );
  },
};
