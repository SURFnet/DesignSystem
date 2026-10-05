import { expect, test } from '@playwright/test';

import {
  ANGULAR_ORIGIN,
  MODES,
  openStory,
  preparePage,
  storyLocator,
  visualStories,
} from './storybook';

const stories = visualStories('angular');

test.describe('Angular visual regression', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const story of stories) {
    for (const mode of MODES) {
      test(`${story.id} (${mode})`, async ({ page }) => {
        await preparePage(page);
        await openStory(page, ANGULAR_ORIGIN, story.id, mode);
        await expect(storyLocator(page, story)).toHaveScreenshot(`${story.id}-${mode}.png`);
      });
    }
  }
});
