import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { calendarContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover';

import { Calendar } from './calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: calendarContract.docs.description,
      },
    },
  },
  argTypes: {
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'How the month/year caption is rendered — a plain label or dropdown selectors.',
      table: {
        defaultValue: { summary: 'label' },
      },
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show the leading/trailing days of adjacent months to fill out the grid.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A plain month grid with no selection wired up — tweak the caption and outside-days controls. */
export const Default: Story = {};

/** Single-date selection, the most common mode, driven by React state. */
export const Single: Story = {
  render: function SingleCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/** Multiple, individually toggled dates. */
export const Multiple: Story = {
  render: function MultipleCalendar() {
    const [dates, setDates] = React.useState<Date[] | undefined>(undefined);
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/** A contiguous range with a start and end date. */
export const Range: Story = {
  render: function RangeCalendar() {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/** Two months side by side — the layout typically used for a date-range picker. */
export const TwoMonths: Story = {
  render: function TwoMonthsCalendar() {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    return (
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/** Dropdown month/year selectors instead of a static caption — useful for jumping across years (e.g. a birthdate field). */
export const DropdownCaption: Story = {
  render: function DropdownCaptionCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/** Weekends disabled via a day-of-week matcher — disabled days cannot be selected. */
export const DisabledDates: Story = {
  render: function DisabledDatesCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ dayOfWeek: [0, 6] }}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/** A footer acting as a live region, announcing the current selection — recommended for accessibility. */
export const WithFooter: Story = {
  render: function WithFooterCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        footer={date ? `Selected: ${date.toLocaleDateString()}` : 'Pick a day.'}
        className="rounded-md ring-1 ring-foreground/10"
      />
    );
  },
};

/**
 * Composed inside a Card — the calendar's own styles already treat a parent
 * `data-slot="card-content"` as transparent, so it blends with the card background.
 */
export const InCard: Story = {
  render: function CalendarInCard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Card className="w-fit p-0">
        <CardContent className="px-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </CardContent>
      </Card>
    );
  },
};

/**
 * Composed inside a Popover trigger — the classic date-picker anatomy (trigger + popover
 * content). See the dedicated `DatePicker` component for a ready-made version of this pattern.
 */
export const InPopover: Story = {
  render: function CalendarInPopover() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" className="w-56 justify-start font-normal" />}
        >
          {date ? date.toLocaleDateString() : 'Pick a date'}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    );
  },
};
