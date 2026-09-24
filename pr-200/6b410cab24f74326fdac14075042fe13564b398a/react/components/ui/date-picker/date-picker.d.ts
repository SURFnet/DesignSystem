import { DateRange } from 'react-day-picker';
import { Calendar } from '../calendar';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function DatePicker({ date, onDateChange, placeholder, triggerClassName, ...props }: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
    date?: Date;
    onDateChange?: (date: Date | undefined) => void;
    placeholder?: string;
    triggerClassName?: string;
}): React.JSX.Element;
declare function DateRangePicker({ dateRange, onDateRangeChange, placeholder, triggerClassName, ...props }: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
    dateRange?: DateRange;
    onDateRangeChange?: (dateRange: DateRange | undefined) => void;
    placeholder?: string;
    triggerClassName?: string;
}): React.JSX.Element;
export { DatePicker, DateRangePicker };
