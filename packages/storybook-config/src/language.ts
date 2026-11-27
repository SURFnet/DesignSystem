import { useEffect, useGlobals } from 'storybook/preview-api';

// The `locale` global has no globalType on purpose: like `mode`, it's driven by a
// toolbar button (`language-toggle.tsx`), not a dropdown. Each preview reads it in a
// decorator and hands it to the framework's microcopy provider.
export type StoryLocale = 'en' | 'nl';

export const LANGUAGE_TITLES: Record<StoryLocale, string> = { en: 'English', nl: 'Nederlands' };

// Defaults to merge into each preview's `initialGlobals`. English, like the components.
export const languageInitialGlobals = { locale: 'en' satisfies StoryLocale };

/** The `locale` global, falling back to English for unknown values. */
export function storyLocale(globals: Record<string, unknown>): StoryLocale {
  return globals.locale === 'nl' ? 'nl' : 'en';
}

// Decorator that sets <html lang>, so screen readers read the story in the right language.
export function languageSwitcher() {
  return (StoryFn: () => unknown) => {
    const [globals] = useGlobals();
    const locale = storyLocale(globals);

    useEffect(() => {
      document.documentElement.lang = locale;
    }, [locale]);

    return StoryFn();
  };
}
