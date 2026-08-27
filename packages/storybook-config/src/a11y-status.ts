import { SET_INDEX } from 'storybook/internal/core-events';
import type { Status } from 'storybook/internal/types';
import { addons, experimental_getStatusStore } from 'storybook/manager-api';

import { A11Y_GAP_TAG, A11Y_MINOR_TAG } from './a11y-tags.js';

export const A11Y_STATUS_ID = 'curve/a11y-status';
export const A11Y_STATUS_TYPE_ID = 'curve/a11y-concern';

/**
 * Maps `a11y-gap` / `a11y-minor` story tags onto Storybook's sidebar status
 * icons (error / warning), the same slot as the "new" change-detection symbol.
 *
 * Uses its own status `typeId` so it does not collide with addon-a11y or
 * Vitest change-detection statuses.
 */
export function registerA11yStatus(): void {
  addons.register(A11Y_STATUS_ID, (api) => {
    const store = experimental_getStatusStore(A11Y_STATUS_TYPE_ID);

    const apply = () => {
      const index = api.getIndex();
      if (!index) return;

      const statuses: Status[] = [];
      for (const entry of Object.values(index.entries)) {
        if (entry.type !== 'story') continue;
        const tags = entry.tags ?? [];

        if (tags.includes(A11Y_GAP_TAG)) {
          statuses.push({
            typeId: A11Y_STATUS_TYPE_ID,
            storyId: entry.id,
            value: 'status-value:error',
            title: 'Accessibility gap',
            description:
              'Unverified WCAG gap from the shadcn/ui 2026 audit. Confirm in Curve before treating as a real fail.',
            sidebarContextMenu: true,
          });
        } else if (tags.includes(A11Y_MINOR_TAG)) {
          statuses.push({
            typeId: A11Y_STATUS_TYPE_ID,
            storyId: entry.id,
            value: 'status-value:warning',
            title: 'Accessibility concern',
            description:
              'Unverified minor a11y issue from the shadcn/ui 2026 audit. Confirm in Curve before treating as a fail.',
            sidebarContextMenu: true,
          });
        }
      }

      store.set(statuses);
    };

    addons.getChannel().on(SET_INDEX, apply);
    apply();
  });
}
