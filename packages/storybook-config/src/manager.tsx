import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

import type { Framework } from './frameworks.js';
import { LOGO_SVG } from './logo.js';
import { MODE_TOGGLE_ID, ModeToggle } from './mode-toggle.js';

const FRAMEWORK_TITLES: Record<Framework, string> = {
  react: 'React',
  angular: 'Angular',
};

// Leaving brandImage unset makes Storybook render brandTitle as raw HTML
// instead of plain text — the only way to show the logo and text together.
const brandMarkup = (framework: Framework) => `
  <span style="display: inline-flex; align-items: center; gap: 8px; line-height: 1; white-space: nowrap;">
    ${LOGO_SVG}
    <span style="font-weight: 600; font-size: 13px;">
      Design System
      <span style="font-weight: 400; opacity: 0.65;"> - ${FRAMEWORK_TITLES[framework]}</span>
    </span>
  </span>
`;

// Shared manager (chrome/sidebar) theme so every framework's Storybook is
// branded identically, save for the framework name in the title.
export function registerManager(framework: Framework): void {
  const theme = create({
    base: 'light',
    brandTitle: brandMarkup(framework),
    brandUrl: 'https://www.surf.nl',
  });

  addons.setConfig({ theme });

  addons.register(MODE_TOGGLE_ID, () => {
    addons.add(MODE_TOGGLE_ID, {
      type: types.TOOL,
      title: 'Mode',
      match: () => true,
      render: () => <ModeToggle />,
    });
  });
}
