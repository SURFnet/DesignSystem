import { type FactoryProvider, inject, InjectionToken } from '@angular/core';

import { injectMicrocopy } from '../../../../microcopy';

export interface HlmDateRangePickerConfig<T> {
  /**
   * If true, the date picker will close when the max selection of dates is reached.
   */
  autoCloseOnEndSelection: boolean;

  /**
   * Defines how the date should be displayed in the UI.
   *
   * @param dates
   * @returns formatted date
   */
  formatDates: (dates: [T | undefined, T | undefined]) => string;

  /**
   * Defines how the date should be transformed before saving to model/form.
   *
   * @param dates
   * @returns transformed date
   */
  transformDates: (dates: [T, T]) => [T, T];
}

/** `rangeText` is the `date-picker.range` microcopy, e.g. "{from} - {to}". */
function getDefaultConfig<T>(rangeText: string): HlmDateRangePickerConfig<T> {
  const format = (date: T) => (date instanceof Date ? date.toDateString() : `${date}`);
  return {
    formatDates: ([start, end]) =>
      start && end
        ? rangeText.replace('{from}', format(start)).replace('{to}', format(end))
        : [start, end]
            .filter(Boolean)
            .map((date) => format(date as T))
            .join(''),
    transformDates: (dates) => dates,
    autoCloseOnEndSelection: false,
  };
}

const HlmDateRangePickerConfigToken = new InjectionToken<HlmDateRangePickerConfig<unknown>>(
  'HlmDateRangePickerConfig',
);

export function provideHlmDateRangePickerConfig<T>(
  config: Partial<HlmDateRangePickerConfig<T>>,
): FactoryProvider {
  return {
    provide: HlmDateRangePickerConfigToken,
    useFactory: () => ({ ...getDefaultConfig(injectMicrocopy()['date-picker.range']), ...config }),
  };
}

export function injectHlmDateRangePickerConfig<T>(): HlmDateRangePickerConfig<T> {
  const injectedConfig = inject(HlmDateRangePickerConfigToken, { optional: true });
  return injectedConfig
    ? (injectedConfig as HlmDateRangePickerConfig<T>)
    : getDefaultConfig(injectMicrocopy()['date-picker.range']);
}
