import { expect, test } from '@playwright/test';

import { assertParity } from './parity';
import {
  ANGULAR_ORIGIN,
  MODES,
  REACT_ORIGIN,
  openStory,
  preparePage,
  screenshotStory,
  visualStories,
} from './storybook';

const reactStories = visualStories('react');
const angularIds = new Set(visualStories('angular').map((story) => story.id));
const shared = reactStories.filter((story) => angularIds.has(story.id));

test.describe('React / Angular visual parity', () => {
  test.describe.configure({ mode: 'parallel' });

  test('React and Angular share component stories to compare', () => {
    expect(shared.length).toBeGreaterThan(0);
  });

  for (const story of shared) {
    for (const mode of MODES) {
      test(`${story.id} (${mode})`, async ({ page, context }) => {
        const angularPage = await context.newPage();
        await preparePage(page);
        await preparePage(angularPage);
        await Promise.all([
          openStory(page, REACT_ORIGIN, story.id, mode),
          openStory(angularPage, ANGULAR_ORIGIN, story.id, mode),
        ]);

        const [reactPng, angularPng] = await Promise.all([
          screenshotStory(page, story),
          screenshotStory(angularPage, story),
        ]);

        await assertParity(reactPng, angularPng, test.info());
      });
    }
  }
});
