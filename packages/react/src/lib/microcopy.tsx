'use client';

import * as React from 'react';

import {
  microcopy,
  type Microcopy,
  type MicrocopyKey,
  type MicrocopyLocale,
} from './microcopy.generated';

const MicrocopyContext = React.createContext<Microcopy>(microcopy.en);

type CurveMicrocopyProviderProps = {
  /** The language of every built-in text inside. Leave it out to keep the surrounding language. */
  locale?: MicrocopyLocale;
  /** Your own texts for some keys, on top of the language, e.g. `{ 'dialog.close': 'Dicht' }`. */
  messages?: Partial<Microcopy>;
  children: React.ReactNode;
};

/**
 * Sets the language of Curve's built-in texts (close buttons, screen-reader labels, error messages)
 * for everything inside. Without it, components use English. A prop on a component still wins.
 */
function CurveMicrocopyProvider({ locale, messages, children }: CurveMicrocopyProviderProps) {
  const parent = React.useContext(MicrocopyContext);
  const value = React.useMemo(
    () => ({ ...(locale ? microcopy[locale] : parent), ...messages }),
    [locale, messages, parent],
  );
  return <MicrocopyContext.Provider value={value}>{children}</MicrocopyContext.Provider>;
}

/** The built-in texts for the current language, keyed like `dialog.close`. */
function useMicrocopy(): Microcopy {
  return React.useContext(MicrocopyContext);
}

export { CurveMicrocopyProvider, microcopy, useMicrocopy };
export type { CurveMicrocopyProviderProps, Microcopy, MicrocopyKey, MicrocopyLocale };
