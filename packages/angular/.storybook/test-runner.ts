import type { TestRunnerConfig } from '@storybook/test-runner';

import { runStoryA11yAudit } from '@surfnet/storybook-config/test-runner';

// Delegate to the shared audit so React and Angular stay in lockstep.
const config: TestRunnerConfig = {
  async postVisit(page, context) {
    await runStoryA11yAudit(page, context);
  },
};

export default config;
