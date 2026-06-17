import { useEffect, useGlobals } from 'storybook/preview-api';

import { themes } from '@surfnet/tokens';

// Theme keys come straight from the generated token map, so the picker always
// matches what `@surfnet/tokens` ships. `default` is the bare `:root` theme
// (no `theme-` class); every other key maps to a `.theme-<key>` class.
export const THEME_NAMES = Object.keys(themes);

const titleCase = (key: string) =>
  key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// Toolbar selects: one for the theme, one for light/dark mode.
export const themeGlobalTypes = {
  theme: {
    description: 'Design system theme',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: THEME_NAMES.map((t) => ({ value: t, title: titleCase(t) })),
      dynamicTitle: true,
    },
  },
  mode: {
    description: 'Light / dark mode',
    toolbar: {
      title: 'Mode',
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

// Defaults to merge into each preview's `initialGlobals`.
export const themeInitialGlobals = { theme: 'default', mode: 'light' };

// Decorator that reflects the `theme` / `mode` globals onto <html> as the
// classes `@surfnet/tokens` keys its CSS on (`dark`, `theme-<key>`).
export function themeSwitcher() {
  return (StoryFn: () => unknown) => {
    const [{ theme, mode }] = useGlobals();

    useEffect(() => {
      const root = document.documentElement;
      for (const c of Array.from(root.classList)) {
        if (c.startsWith('theme-')) root.classList.remove(c);
      }
      root.classList.toggle('dark', mode === 'dark');
      if (theme && theme !== 'default') root.classList.add(`theme-${theme}`);
    }, [theme, mode]);

    return StoryFn();
  };
}
