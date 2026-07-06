import type { TestRunnerConfig } from '@storybook/test-runner';

import { runStoryA11yAudit } from '@surfnet/storybook-config/test-runner';

// Thin delegate to the shared audit so React and Angular stay in lockstep
// (same convention as the shared preview parameters and decorators). The audit
// sweeps every story against WCAG 2.1 AA across all themes/modes from
// `@surfnet/tokens` and writes a per-story JSON report.
const config: TestRunnerConfig = {
  async postVisit(page, context) {
    await runStoryA11yAudit(page, context);
  },
};

export default config;
