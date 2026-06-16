import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

// Shared manager (chrome/sidebar) theme so every framework's Storybook is
// branded identically.
const theme = create({
  base: 'light',
  brandTitle: 'SURF Design System',
  brandUrl: 'https://www.surf.nl',
});

export function registerManager(): void {
  addons.setConfig({ theme });
}
