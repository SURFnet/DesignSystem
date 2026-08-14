// Classic JSX runtime: bundling a second react/jsx-runtime crashes the manager,
// so compile against the React that Storybook externalizes.
import React from 'react';
import { MoonIcon, SunIcon } from '@storybook/icons';
import { Button } from 'storybook/internal/components';
import { useGlobals } from 'storybook/manager-api';

export const MODE_TOGGLE_ID = 'curve/mode-toggle';

export function ModeToggle() {
  const [{ mode }, updateGlobals] = useGlobals();
  const isDark = mode === 'dark';

  return (
    <Button
      key={MODE_TOGGLE_ID}
      variant="ghost"
      padding="small"
      active={isDark}
      ariaLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => updateGlobals({ mode: isDark ? 'light' : 'dark' })}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      {isDark ? 'Dark' : 'Light'}
    </Button>
  );
}
