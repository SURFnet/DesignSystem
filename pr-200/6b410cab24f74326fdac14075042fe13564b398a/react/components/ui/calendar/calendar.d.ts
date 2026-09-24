import { DayPicker, DayButton, Locale } from 'react-day-picker';
import { Button } from '../button';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, locale, formatters, components, ...props }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}): React.JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, locale, ...props }: React.ComponentProps<typeof DayButton> & {
    locale?: Partial<Locale>;
}): React.JSX.Element;
export { Calendar, CalendarDayButton };
