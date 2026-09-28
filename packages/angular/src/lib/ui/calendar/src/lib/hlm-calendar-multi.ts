import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretLeft, phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';
import {
  BrnCalendarImports,
  BrnCalendarMulti,
  injectBrnCalendarI18n,
  type Weekday,
} from '@spartan-ng/brain/calendar';
import { injectDateAdapter } from '@spartan-ng/brain/date-time';
import { buttonVariants } from '../../../button/src';
import { HlmIcon } from '../../../icon/src';
import { HlmSelectImports } from '../../../select/src';
import { hlm } from '../../../utils/src';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-calendar-multi',
  imports: [BrnCalendarImports, NgIcon, HlmIcon, NgTemplateOutlet, HlmSelectImports],
  viewProviders: [provideIcons({ phosphorCaretLeft, phosphorCaretRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      brnCalendarMulti
      [min]="min()"
      [max]="max()"
      [minSelection]="minSelection()"
      [maxSelection]="maxSelection()"
      [disabled]="disabled()"
      [(date)]="date"
      [dateDisabled]="dateDisabled()"
      [weekStartsOn]="weekStartsOn()"
      [highlightDays]="highlightDays()"
      [defaultFocusedDate]="defaultFocusedDate()"
      [class]="_computedCalenderClass()"
    >
      <div class="curve-calendar-months">
        <!-- Header -->
        <div class="curve-calendar-header-stack">
          <div class="curve-calendar-caption">
            <div class="curve-calendar-caption-label">
              <ng-template #month>
                <hlm-select brnCalendarMonthSelect>
                  <hlm-select-trigger size="sm" [class]="_selectClass">
                    <hlm-select-value />
                  </hlm-select-trigger>
                  <hlm-select-content *hlmSelectPortal class="curve-calendar-select-content">
                    <hlm-select-group>
                      @for (month of _i18n.config().months(); track month) {
                        <hlm-select-item [value]="month">{{ month }}</hlm-select-item>
                      }
                    </hlm-select-group>
                  </hlm-select-content>
                </hlm-select>
              </ng-template>
              <ng-template #year>
                <hlm-select brnCalendarYearSelect>
                  <hlm-select-trigger size="sm" [class]="_selectClass">
                    <hlm-select-value />
                  </hlm-select-trigger>
                  <hlm-select-content *hlmSelectPortal class="curve-calendar-select-content">
                    <hlm-select-group>
                      @for (year of _i18n.config().years(); track year) {
                        <hlm-select-item [value]="year">{{ year }}</hlm-select-item>
                      }
                    </hlm-select-group>
                  </hlm-select-content>
                </hlm-select>
              </ng-template>
              @let heading = _heading();
              @switch (captionLayout()) {
                @case ('dropdown') {
                  <ng-container [ngTemplateOutlet]="month" />
                  <ng-container [ngTemplateOutlet]="year" />
                }
                @case ('dropdown-months') {
                  <ng-container [ngTemplateOutlet]="month" />
                  <div brnCalendarHeader class="curve-calendar-heading">{{ heading.year }}</div>
                }
                @case ('dropdown-years') {
                  <div brnCalendarHeader class="curve-calendar-heading">{{ heading.month }}</div>
                  <ng-container [ngTemplateOutlet]="year" />
                }
                @case ('label') {
                  <div brnCalendarHeader class="curve-calendar-heading">{{ heading.header }}</div>
                }
              }
            </div>

            <div class="curve-calendar-nav-group">
              <button
                brnCalendarPreviousButton
                class="curve-calendar-nav curve-calendar-nav--outline curve-calendar-nav--prev"
              >
                <ng-icon hlm name="phosphorCaretLeft" size="sm" />
              </button>

              <button
                brnCalendarNextButton
                class="curve-calendar-nav curve-calendar-nav--outline curve-calendar-nav--next"
              >
                <ng-icon hlm name="phosphorCaretRight" size="sm" />
              </button>
            </div>
          </div>
        </div>

        <table class="curve-calendar-grid" brnCalendarGrid>
          <thead>
            <tr class="curve-calendar-weekdays">
              <th
                *brnCalendarWeekday="let weekday"
                scope="col"
                class="curve-calendar-weekday"
                [attr.aria-label]="_i18n.config().labelWeekday(weekday)"
              >
                {{ _i18n.config().formatWeekdayName(weekday) }}
              </th>
            </tr>
          </thead>

          <tbody role="rowgroup">
            <tr *brnCalendarWeek="let week" class="curve-calendar-week">
              @for (date of week; track _dateAdapter.getTime(date)) {
                <td brnCalendarCell class="curve-calendar-cell">
                  <button brnCalendarCellButton [date]="date" [class]="_btnClass">
                    {{ _dateAdapter.getDate(date) }}
                  </button>
                </td>
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class HlmCalendarMulti<T> {
  public readonly calendarClass = input<ClassValue>('');

  protected readonly _computedCalenderClass = computed(() =>
    hlm('curve-calendar', this.calendarClass()),
  );

  /** Access the calendar i18n */
  protected readonly _i18n = injectBrnCalendarI18n();

  /** Access the date time adapter */
  protected readonly _dateAdapter = injectDateAdapter<T>();

  /** The days to highlight. */
  public readonly highlightDays = input<T[]>([]);

  /** The minimum date that can be selected.*/
  public readonly min = input<T>();

  /** The maximum date that can be selected. */
  public readonly max = input<T>();

  /** Show dropdowns to navigate between months or years. */
  public readonly captionLayout = input<
    'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'
  >('label');

  /** The minimum selectable dates.  */
  public readonly minSelection = input<number, NumberInput>(undefined, {
    transform: numberAttribute,
  });

  /** The maximum selectable dates.  */
  public readonly maxSelection = input<number, NumberInput>(undefined, {
    transform: numberAttribute,
  });

  /** Determine if the date picker is disabled. */
  public readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /** The selected value. */
  public readonly date = model<T[]>();

  /** Whether a specific date is disabled. */
  public readonly dateDisabled = input<(date: T) => boolean>(() => false);

  /** The day the week starts on */
  public readonly weekStartsOn = input<Weekday, NumberInput>(undefined, {
    transform: (v: unknown) => numberAttribute(v) as Weekday,
  });

  /** The default focused date. */
  public readonly defaultFocusedDate = input<T>();

  /** Access the calendar directive */
  private readonly _calendar = viewChild.required(BrnCalendarMulti);

  /** Get the heading for the current month and year */
  protected readonly _heading = computed(() => {
    const config = this._i18n.config();
    const date = this._calendar().focusedDate();

    return {
      header: config.formatHeader(
        this._dateAdapter.getMonth(date),
        this._dateAdapter.getYear(date),
      ),
      month: config.formatMonth(this._dateAdapter.getMonth(date)),
      year: config.formatYear(this._dateAdapter.getYear(date)),
    };
  });

  protected readonly _btnClass = hlm(
    buttonVariants({ variant: 'ghost' }),
    // Styling lives in ./hlm-calendar.css.
    'curve-calendar-day curve-calendar-day--multi',
  );

  protected readonly _selectClass = 'curve-calendar-select-trigger';
}
