import { inject, InjectionToken, type Provider } from '@angular/core';
import {
  microcopy,
  type Microcopy,
  type MicrocopyKey,
  type MicrocopyLocale,
} from './microcopy.generated';

/** The built-in texts for the current language, keyed like `dialog.close`. English by default. */
export const CURVE_MICROCOPY = new InjectionToken<Microcopy>('CurveMicrocopy', {
  providedIn: 'root',
  factory: () => microcopy.en,
});

/**
 * Sets the language of Curve's built-in texts (close buttons, screen-reader labels, error
 * messages), e.g. `provideCurveMicrocopy('nl')` in your app config. Pass `messages` to replace
 * some texts on top of the language. An input on a component still wins.
 */
export function provideCurveMicrocopy(
  locale?: MicrocopyLocale,
  messages?: Partial<Microcopy>,
): Provider {
  return {
    provide: CURVE_MICROCOPY,
    useFactory: (): Microcopy => ({
      ...(locale
        ? microcopy[locale]
        : (inject(CURVE_MICROCOPY, { skipSelf: true, optional: true }) ?? microcopy.en)),
      ...messages,
    }),
  };
}

/** The built-in texts for the current language. Call it where `inject()` works. */
export function injectMicrocopy(): Microcopy {
  return inject(CURVE_MICROCOPY);
}

export { microcopy };
export type { Microcopy, MicrocopyKey, MicrocopyLocale };
