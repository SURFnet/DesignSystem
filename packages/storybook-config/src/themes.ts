import { useEffect, useGlobals } from 'storybook/preview-api';

import { themes } from '@surfnet/curve-tokens';

// Theme keys come straight from the generated token map, so the picker always
// matches what `@surfnet/curve-tokens` ships. `default` is the bare `:root` theme
// (no `theme-` class); every other key maps to a `.theme-<key>` class.
export const THEME_NAMES = Object.keys(themes);

const titleCase = (key: string) =>
  key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// `mode` has no globalType on purpose: it's driven by the toolbar toggle in
// `mode-toggle.tsx`, not a dropdown.
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
};

// Defaults to merge into each preview's `initialGlobals`.
export const themeInitialGlobals = { theme: 'default', mode: 'light' };

// Decorator that reflects the `theme` / `mode` globals onto <html> as the
// classes `@surfnet/curve-tokens` keys its CSS on (`dark`, `theme-<key>`).
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
