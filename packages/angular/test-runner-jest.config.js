import { getJestConfig } from '@storybook/test-runner/dist/index.js';

// The default Jest configuration comes from @storybook/test-runner
const testRunnerConfig = getJestConfig();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  ...testRunnerConfig,
  // Exclude build output so jest-haste-map doesn't see two package.json
  // files (source + dist) declaring the same package name.
  modulePathIgnorePatterns: [
    ...(testRunnerConfig.modulePathIgnorePatterns ?? []),
    '<rootDir>/dist/',
  ],
};
