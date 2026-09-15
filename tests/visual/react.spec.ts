import { expect, test } from '@playwright/test';

import {
  MODES,
  REACT_ORIGIN,
  openStory,
  preparePage,
  storyLocator,
  visualStories,
} from './storybook';

const stories = visualStories('react');

test.describe('React visual regression', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const story of stories) {
    for (const mode of MODES) {
      test(`${story.id} (${mode})`, async ({ page }) => {
        await preparePage(page);
        await openStory(page, REACT_ORIGIN, story.id, mode);
        await expect(storyLocator(page, story)).toHaveScreenshot(`${story.id}-${mode}.png`);
      });
    }
  }
});
