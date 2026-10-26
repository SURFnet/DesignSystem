'use client';

import * as React from 'react';
import { format, isValid, parse, startOfDay } from 'date-fns';
import { CalendarIcon, XIcon } from '@phosphor-icons/react';

import { Calendar } from '@/components/ui/calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import styles from './date-picker.module.css';

const DISPLAY_FORMAT = 'PP';
const ISO_FORMAT = 'yyyy-MM-dd';

function defaultFormatDate(date: Date) {
  return format(date, DISPLAY_FORMAT);
}

/**
 * Accepts the display format ("Oct 26, 2026"), ISO dates ("2026-10-26") and anything else
 * `new Date()` understands, always as a local date (`new Date('2026-10-26')` alone would be
 * UTC midnight, a day early west of Greenwich).
 */
function defaultParseDate(value: string) {
  for (const pattern of [DISPLAY_FORMAT, ISO_FORMAT]) {
    const parsed = parse(value, pattern, new Date());
    if (isValid(parsed)) return parsed;
  }
  const loose = new Date(value);
  return isValid(loose) ? startOfDay(loose) : undefined;
}

type DatePickerInputProps = Omit<
  React.ComponentProps<'input'>,
  'id' | 'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  /**
   * Id of the text input. Required: a form field always has a label, so point a
   * `<FieldLabel htmlFor>` at it.
   */
  id: string;
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  /** Turns a date into the text shown in the input. Defaults to date-fns `PP` ("Oct 26, 2026"). */
  formatDate?: (date: Date) => string;
  /**
   * Turns typed text into a date. Return `undefined` for invalid text: the date is cleared and
   * the text is kept so the user can fix it.
   */
  parseDate?: (value: string) => Date | undefined;
  /** Show a clear button while the input has text. */
  showClear?: boolean;
  /** Open the calendar when the input is clicked. */
  openOnClick?: boolean;
  /** Accessible label for the clear button. */
  clearAriaLabel?: string;
  /** Accessible label for the calendar button. */
  calendarAriaLabel?: string;
  /** Props for the calendar in the popover. */
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'>;
};

/**
 * A text input for a date, with a calendar button. The label points at the input, so screen
 * readers hear the label as its name and the date as its value; `aria-invalid` and
 * `aria-describedby` go on the input as on any other field.
 *
 * The input also sets `aria-invalid="true"` by itself while its text can't be parsed as a date
 * (checked on blur and Enter), on top of any `aria-invalid` you pass.
 */
function DatePickerInput({
  id,
  date,
  onDateChange,
  formatDate = defaultFormatDate,
  parseDate = defaultParseDate,
  showClear = true,
  openOnClick = false,
  clearAriaLabel = 'Clear date',
  calendarAriaLabel = 'Select date',
  calendarProps,
  disabled,
  className,
  onBlur,
  onClick,
  onKeyDown,
  'aria-invalid': ariaInvalid,
  ...props
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [text, setText] = React.useState(() => (date ? formatDate(date) : ''));
  // True after a commit found text that isn't a date; reset by any valid date or by clearing.
  const [unparseable, setUnparseable] = React.useState(false);
  const invalid =
    ariaInvalid === true || ariaInvalid === 'true' || (unparseable && text.trim() !== '');

  // Follow date changes from outside (calendar pick, parent update). When the date is cleared,
  // clear the text only if it still showed the old date: typed text that doesn't parse (which
  // also clears the date) stays so the user can fix it.
  const time = date?.getTime();
  const lastDate = React.useRef(date);
  React.useEffect(() => {
    const previous = lastDate.current;
    if (time === previous?.getTime()) return;
    lastDate.current = date;
    if (date) {
      setText(formatDate(date));
      setUnparseable(false);
    } else if (previous) {
      const shown = formatDate(previous);
      setText((current) => (current === shown ? '' : current));
    }
  }, [time, date, formatDate]);

  const commit = () => {
    const value = text.trim();
    const next = value ? parseDate(value) : undefined;
    setUnparseable(Boolean(value) && !next);
    if (next) setText(formatDate(next));
    if (next?.getTime() !== date?.getTime()) onDateChange?.(next);
  };

  const clear = () => {
    setText('');
    setUnparseable(false);
    onDateChange?.(undefined);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        {...props}
        id={id}
        type="text"
        value={text}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onChange={(event) => setText(event.target.value)}
        onBlur={(event) => {
          commit();
          onBlur?.(event);
        }}
        onClick={(event) => {
          if (openOnClick) setOpen(true);
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
          } else if (event.key === 'Enter') {
            // Commit before anything else reads the value; matches hlm-date-picker-input.
            event.preventDefault();
            commit();
          }
          onKeyDown?.(event);
        }}
      />
      <InputGroupAddon align="inline-end">
        {showClear && text.length > 0 && (
          <InputGroupButton
            size="icon-xs"
            aria-label={clearAriaLabel}
            disabled={disabled}
            onClick={clear}
          >
            <XIcon />
          </InputGroupButton>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            disabled={disabled}
            render={<InputGroupButton size="icon-xs" aria-label={calendarAriaLabel} />}
          >
            <CalendarIcon />
          </PopoverTrigger>
          <PopoverContent
            ref={popupRef}
            className={styles.popoverContent}
            align="end"
            // Focus the selected day (or today): the one day button react-day-picker makes
            // tabbable. Otherwise Base UI would focus the previous-month button.
            initialFocus={() =>
              popupRef.current?.querySelector<HTMLElement>('[role="grid"] button[tabindex="0"]') ??
              true
            }
          >
            <Calendar
              defaultMonth={date}
              {...calendarProps}
              mode="single"
              selected={date}
              onSelect={(next) => {
                if (next) setText(formatDate(next));
                onDateChange?.(next);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { DatePickerInput };
export type { DatePickerInputProps };
