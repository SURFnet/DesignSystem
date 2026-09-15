import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  testMatch: '*.spec.ts',
  testIgnore: ['**/parity.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'UTC',
    colorScheme: 'light',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'react',
      testMatch: /react\.spec\.ts/,
      snapshotPathTemplate: '{testDir}/__screenshots__/react/{arg}{ext}',
    },
    {
      name: 'angular',
      testMatch: /angular\.spec\.ts/,
      snapshotPathTemplate: '{testDir}/__screenshots__/angular/{arg}{ext}',
    },
  ],
  webServer: [
    {
      command: 'node tests/visual/serve-storybook.mjs packages/react/storybook-static 6008',
      url: 'http://127.0.0.1:6008/index.json',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: 'node tests/visual/serve-storybook.mjs packages/angular/storybook-static 6009',
      url: 'http://127.0.0.1:6009/index.json',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
  ],
});
