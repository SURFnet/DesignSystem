/**
 * Turns the per-story a11y JSON reports (packages/<fw>/.a11y-report/*.json,
 * written by runStoryA11yAudit) into a Markdown summary for a sticky PR comment
 * and the GitHub Actions job summary. No runtime deps — runs via jiti.
 *
 * Usage: pnpm a11y:comment [outFile=.a11y-report/comment.md]
 *
 * Always exits 0 — reporting must never fail the build.
 */
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';

// Subset of the axe-core result shape we read out of each report file.
interface AxeNode {
  target?: string[];
  failureSummary?: string;
}
interface AxeViolation {
  id: string;
  help?: string;
  nodes?: AxeNode[];
}
interface ComboResult {
  theme: string;
  mode: string;
  violations?: AxeViolation[];
}
interface StoryReport {
  title?: string;
  name?: string;
  results?: ComboResult[];
}
interface Row {
  framework: string;
  component: string;
  variation: string;
  theme: string;
  mode: string;
  rule: string;
  example: string;
}

const OUT = process.argv[2] ?? '.a11y-report/comment.md';
const PACKAGES_DIR = resolve('packages');
const REPORT_DIR_NAME = '.a11y-report';

// axe rule id -> WCAG success criterion, for the rules our audit can surface.
// Falls back to the bare rule id for anything not listed.
const WCAG_REF: Record<string, string> = {
  'color-contrast': '1.4.3',
  'color-contrast-enhanced': '1.4.6',
  'link-name': '4.1.2',
  'button-name': '4.1.2',
  'aria-required-attr': '4.1.2',
  'aria-valid-attr-value': '4.1.2',
  'image-alt': '1.1.1',
  'duplicate-id-aria': '4.1.1',
};

// Pull a human-readable example ("`#fff` on `#84cc16` · ratio 1.89") out of an
// axe node's failureSummary for contrast failures; else fall back to help text.
function exampleFor(violation: AxeViolation): string {
  const summary = violation.nodes?.[0]?.failureSummary ?? '';
  const m = summary.match(
    /contrast of ([\d.]+) \(foreground color: (#[0-9a-f]+), background color: (#[0-9a-f]+)/i,
  );
  if (m) return `\`${m[2]}\` on \`${m[3]}\` · ratio ${m[1]}`;
  return violation.help ?? '';
}

// Collect every failing (framework, story, theme, mode, rule) row.
const rows: Row[] = [];
const frameworks = existsSync(PACKAGES_DIR)
  ? readdirSync(PACKAGES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
  : [];

let storiesAudited = 0;
let totalCombos = 0;
const frameworksWithReports = new Set<string>();

for (const fw of frameworks) {
  const reportDir = resolve(PACKAGES_DIR, fw.name, REPORT_DIR_NAME);
  if (!existsSync(reportDir)) continue;
  frameworksWithReports.add(fw.name);

  for (const file of readdirSync(reportDir).filter((f) => f.endsWith('.json'))) {
    let report: StoryReport;
    try {
      report = JSON.parse(readFileSync(resolve(reportDir, file), 'utf8')) as StoryReport;
    } catch {
      continue;
    }
    storiesAudited += 1;
    totalCombos += report.results?.length ?? 0;
    // title is "Components/Button" -> component "Button"; name is the story variation.
    const component = (report.title ?? '').replace(/^Components\//, '') || '(untitled)';
    const variation = report.name ?? '';

    for (const combo of report.results ?? []) {
      for (const v of combo.violations ?? []) {
        const ref = WCAG_REF[v.id] ? `${v.id} (${WCAG_REF[v.id]})` : v.id;
        rows.push({
          framework: `@surfnet/${fw.name}`,
          component,
          variation,
          theme: combo.theme,
          mode: combo.mode,
          rule: ref,
          example: exampleFor(v),
        });
      }
    }
  }
}

// Build the Markdown.
const HEADER = '## ♿ Accessibility audit — WCAG 2.1 AA';
const FOOTER =
  '_Automated axe covers ~30–50% of WCAG 2.1 AA. Keyboard, screen-reader and ' +
  'reflow checks still need a manual pass. Full per-story JSON is in the run’s ' +
  '`a11y-reports` artifact._';

function buildBody(): string {
  if (frameworksWithReports.size === 0) {
    return [
      HEADER,
      '',
      'No a11y report was produced (the audit step may not have run).',
      '',
      FOOTER,
    ].join('\n');
  }

  if (rows.length === 0) {
    const fwList = [...frameworksWithReports].map((f) => `\`@surfnet/${f}\``).join(', ');
    return [
      HEADER,
      '',
      `✅ **No violations** across ${storiesAudited} stories / ${totalCombos} theme·mode ` +
        `combinations in ${fwList}.`,
      '',
      FOOTER,
    ].join('\n');
  }

  // Nest the flat rows as framework -> component -> variation -> theme -> modes,
  // so the comment is scannable: collapse a whole framework, skim components
  // (h4) and their variations (h5), drill into a theme to see which modes fail.
  interface Leaf {
    mode: string;
    rule: string;
    example: string;
  }
  type ThemeMap = Map<string, Leaf[]>;
  type VariationMap = Map<string, ThemeMap>;
  type ComponentMap = Map<string, VariationMap>;

  const tree = new Map<string, ComponentMap>();
  for (const r of rows) {
    const components = tree.get(r.framework) ?? new Map<string, VariationMap>();
    const variations = components.get(r.component) ?? new Map<string, ThemeMap>();
    const themes = variations.get(r.variation) ?? new Map<string, Leaf[]>();
    const leaves = themes.get(r.theme) ?? [];
    leaves.push({ mode: r.mode, rule: r.rule, example: r.example });
    themes.set(r.theme, leaves);
    variations.set(r.variation, themes);
    components.set(r.component, variations);
    tree.set(r.framework, components);
  }

  const countThemes = (themes: ThemeMap) =>
    [...themes.values()].reduce((n, leaves) => n + leaves.length, 0);
  const countVariations = (variations: VariationMap) =>
    [...variations.values()].reduce((n, themes) => n + countThemes(themes), 0);
  // Light before dark, then anything else alphabetically.
  const modeRank = (m: string) => (m === 'light' ? 0 : m === 'dark' ? 1 : 2);
  const byKey = ([a]: [string, unknown], [b]: [string, unknown]) => a.localeCompare(b);

  const sections: string[] = [];
  for (const [framework, components] of [...tree].sort(byKey)) {
    const fwCount = [...components.values()].reduce((n, v) => n + countVariations(v), 0);

    const blocks: string[] = [];
    for (const [component, variations] of [...components].sort(byKey)) {
      const lines = [`#### ${component} — ${countVariations(variations)} combination(s)`];
      for (const [variation, themes] of [...variations].sort(byKey)) {
        lines.push('', `##### ${variation} — ${countThemes(themes)} combination(s)`);
        for (const [theme, leaves] of [...themes].sort(byKey)) {
          lines.push(`- \`${theme}\``);
          for (const leaf of [...leaves].sort((a, b) => modeRank(a.mode) - modeRank(b.mode))) {
            const detail = leaf.example ? `${leaf.example} — ` : '';
            lines.push(`  - \`${leaf.mode}\` — ${detail}${leaf.rule}`);
          }
        }
      }
      blocks.push(lines.join('\n'));
    }

    sections.push(
      `<details open><summary><strong>${framework}</strong> — ${fwCount} failing combination(s)</summary>\n\n${blocks.join('\n\n')}\n\n</details>`,
    );
  }

  return [
    HEADER,
    '',
    `⚠️ **${rows.length} failing theme·mode combination(s)** across ${storiesAudited} stories ` +
      `/ ${totalCombos} audited combinations. Report-only — does not block merge.`,
    '',
    ...sections,
    '',
    FOOTER,
  ].join('\n');
}

// Keep under GitHub's 65 536-char comment limit (leave headroom for the marker).
const MAX_LEN = 64000;
const full = buildBody();
const body =
  full.length > MAX_LEN
    ? full.slice(0, MAX_LEN) +
      '\n\n_…truncated; see the `a11y-reports` artifact for the full list._'
    : full;

mkdirSync(dirname(resolve(OUT)), { recursive: true });
writeFileSync(OUT, body + '\n', 'utf8');

// Mirror into the Actions run summary when available (also covers push builds).
const stepSummary = process.env.GITHUB_STEP_SUMMARY;
if (stepSummary) appendFileSync(stepSummary, body + '\n');

console.log(`a11y comment written to ${OUT} (${rows.length} failing rows)`);
