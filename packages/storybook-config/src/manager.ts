import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

import type { Framework } from './frameworks.js';
import { LOGO_DATA_URI } from './logo.js';

const FRAMEWORK_TITLES: Record<Framework, string> = {
  react: 'React',
  angular: 'Angular',
};

// Shared manager (chrome/sidebar) theme so every framework's Storybook is
// branded identically, save for the framework name in the title.
export function registerManager(framework: Framework): void {
  const theme = create({
    base: 'light',
    brandTitle: `SURF Design System — ${FRAMEWORK_TITLES[framework]}`,
    brandUrl: 'https://www.surf.nl',
    brandImage: LOGO_DATA_URI,
  });

  addons.setConfig({ theme });
}
