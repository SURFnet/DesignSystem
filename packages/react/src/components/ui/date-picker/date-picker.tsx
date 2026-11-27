'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { CalendarIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import styles from './date-picker.module.css';
import { useMicrocopy } from '@/lib/microcopy';

const defaultFormatDate = (date: Date) => format(date, 'PPP');
const defaultFormatRangeDate = (date: Date) => format(date, 'LLL d, y');

function DatePicker({
  date,
  onDateChange,
  placeholder: placeholderProp,
  formatDate = defaultFormatDate,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** Turns the picked date into the text on the trigger. Default: "October 26th, 2026". */
  formatDate?: (date: Date) => string;
  triggerClassName?: string;
}) {
  const texts = useMicrocopy();
  const placeholder = placeholderProp ?? texts['date-picker.placeholder'];
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="date-picker-trigger"
            className={cn(styles.trigger, triggerClassName)}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {date ? formatDate(date) : <span className={styles.placeholder}>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className={styles.popoverContent} align="start">
        <Calendar mode="single" selected={date} onSelect={onDateChange} {...props} />
      </PopoverContent>
    </Popover>
  );
}

function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder: placeholderProp,
  formatDate = defaultFormatRangeDate,
  formatRange,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
  dateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  placeholder?: string;
  /** Turns one date into text, also when only the start date is picked. Default: "Oct 26, 2026". */
  formatDate?: (date: Date) => string;
  /** Turns a full range into the text on the trigger. Default: the `date-picker.range` microcopy, "{from} - {to}". */
  formatRange?: (from: Date, to: Date) => string;
  triggerClassName?: string;
}) {
  const texts = useMicrocopy();
  const placeholder = placeholderProp ?? texts['date-picker.range-placeholder'];
  const rangeText = (from: Date, to: Date) =>
    formatRange
      ? formatRange(from, to)
      : texts['date-picker.range']
          .replace('{from}', formatDate(from))
          .replace('{to}', formatDate(to));

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="date-range-picker-trigger"
            className={cn(styles.trigger, styles.triggerRange, triggerClassName)}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {dateRange?.from ? (
          dateRange.to ? (
            rangeText(dateRange.from, dateRange.to)
          ) : (
            formatDate(dateRange.from)
          )
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className={styles.popoverContent} align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onDateRangeChange}
          numberOfMonths={2}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
