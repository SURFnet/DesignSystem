'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, PaletteIcon, SunIcon } from '@phosphor-icons/react';
import { themes, type ThemeMode, type ThemeName } from '@surfnet/curve-tokens';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@surfnet/curve-react';

// Theme keys come straight from the generated token map, so the picker always
// matches what `@surfnet/curve-tokens` ships — same source the Storybook switcher uses.
const THEME_NAMES = Object.keys(themes) as ThemeName[];

const STORAGE_KEY = 'surf-theme';

const titleCase = (key: string) =>
  key
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Reflect theme + mode onto <html> as the classes `@surfnet/curve-tokens` keys its CSS
// on: `dark` for the mode, `theme-<key>` for every theme except the bare default.
function applyTheme(theme: ThemeName, mode: ThemeMode) {
  const root = document.documentElement;
  for (const className of Array.from(root.classList)) {
    if (className.startsWith('theme-')) root.classList.remove(className);
  }
  root.classList.toggle('dark', mode === 'dark');
  if (theme !== 'default') root.classList.add(`theme-${theme}`);
}

// Read the last saved choice for the initial render. Guarded for SSR (no
// `window`/`localStorage` on the server) and used as a `useState` lazy
// initializer rather than an effect, since the dropdown content isn't in the
// DOM until opened, so there's no hydration mismatch to worry about here.
function getStored<T>(key: 'theme' | 'mode', fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return saved[key] ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Floating theme picker (bottom-right) for the demo. Lists every theme shipped by
 * `@surfnet/curve-tokens` plus a light/dark toggle, and persists the choice so it
 * survives reloads. Modelled on the Storybook toolbar switcher.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(() => getStored('theme', 'default'));
  const [mode, setMode] = useState<ThemeMode>(() => getStored('mode', 'light'));

  // Keep <html> and storage in sync with state.
  useEffect(() => {
    applyTheme(theme, mode);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, mode }));
  }, [theme, mode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Change theme"
            className="fixed right-6 bottom-6 z-50 size-11 rounded-full shadow-lg"
          >
            <PaletteIcon />
          </Button>
        }
      />
      <DropdownMenuContent side="top" align="end" className="max-h-[28rem] w-56 overflow-y-auto">
        <DropdownMenuRadioGroup value={mode} onValueChange={(value) => setMode(value as ThemeMode)}>
          <DropdownMenuLabel>Mode</DropdownMenuLabel>
          <DropdownMenuRadioItem value="light">
            <SunIcon />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <MoonIcon />
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as ThemeName)}
        >
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          {THEME_NAMES.map((name) => (
            <DropdownMenuRadioItem key={name} value={name}>
              {titleCase(name)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
