// Classic JSX runtime: bundling a second react/jsx-runtime crashes the manager,
// so compile against the React that Storybook externalizes.
import React from 'react';
import { GlobeIcon } from '@storybook/icons';
import { Button } from 'storybook/internal/components';
import { useGlobals } from 'storybook/manager-api';

import { LANGUAGE_TITLES } from './language.js';

export const LANGUAGE_TOGGLE_ID = 'curve/language-toggle';

/** Toolbar button that switches the `locale` global between English and Nederlands. */
export function LanguageToggle() {
  const [{ locale }, updateGlobals] = useGlobals();
  const isDutch = locale === 'nl';

  return (
    <Button
      key={LANGUAGE_TOGGLE_ID}
      variant="ghost"
      padding="small"
      active={isDutch}
      ariaLabel={isDutch ? 'Switch texts to English' : 'Switch texts to Nederlands'}
      onClick={() => updateGlobals({ locale: isDutch ? 'en' : 'nl' })}
    >
      <GlobeIcon />
      {LANGUAGE_TITLES[isDutch ? 'nl' : 'en']}
    </Button>
  );
}
