'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { CalendarIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function DatePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  triggerClassName?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="date-picker-trigger"
            className={cn('w-56 justify-start text-left font-normal', triggerClassName)}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {date ? format(date, 'PPP') : <span className="text-muted-foreground">{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onDateChange} {...props} />
      </PopoverContent>
    </Popover>
  );
}

function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = 'Pick a date range',
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
  dateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  placeholder?: string;
  triggerClassName?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="date-range-picker-trigger"
            className={cn('w-72 justify-start text-left font-normal', triggerClassName)}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {dateRange?.from ? (
          dateRange.to ? (
            <>
              {format(dateRange.from, 'LLL d, y')} - {format(dateRange.to, 'LLL d, y')}
            </>
          ) : (
            format(dateRange.from, 'LLL d, y')
          )
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
