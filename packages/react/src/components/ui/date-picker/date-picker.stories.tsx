import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { datePickerContract } from '@surfnet/curve-contracts';

import { DatePicker, DateRangePicker } from './date-picker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: datePickerContract.docs.description,
      },
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
