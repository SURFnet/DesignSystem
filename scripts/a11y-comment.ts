/**
 * Turns the per-story a11y JSON reports into a Markdown summary for the PR
 * comment and the Actions job summary. Always exits 0.
 *
 * Usage: pnpm a11y:comment [outFile=.a11y-report/comment.md]
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
  screenshot?: string;
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
  themeDependent: boolean;
  screenshotUrl?: string;
}

const OUT = process.argv[2] ?? '.a11y-report/comment.md';
const PACKAGES_DIR = resolve('packages');
const REPORT_DIR_NAME = '.a11y-report';

// The "Publish a11y screenshots" CI step pushes screenshots to this branch,
// under `pr-<number>/<package>/<file>.png`, giving each one a stable raw URL.
// Only set for pull_request runs — local/push runs skip image embeds.
const SCREENSHOTS_BRANCH = 'a11y-screenshots';
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.GITHUB_REPOSITORY;

function screenshotUrl(pkgName: string, file?: string): string | undefined {
  if (!file || !PR_NUMBER || !REPO) return undefined;
  return `https://raw.githubusercontent.com/${REPO}/${SCREENSHOTS_BRANCH}/pr-${PR_NUMBER}/${pkgName}/${file}`;
}

// axe rule id -> WCAG success criterion. Unlisted rules show the bare id.
const WCAG_REF: Record<string, string> = {
  'color-contrast': '1.4.3',
  'color-contrast-enhanced': '1.4.6',
  'link-in-text-block': '1.4.1',
  'link-name': '4.1.2',
  'button-name': '4.1.2',
  'aria-required-attr': '4.1.2',
  'aria-valid-attr-value': '4.1.2',
  'image-alt': '1.1.1',
  'duplicate-id-aria': '4.1.1',
};

// Color-dependent rules; reported per theme·mode. Others collapse to one entry.
const THEME_DEPENDENT_RULES = new Set([
  'color-contrast',
  'color-contrast-enhanced',
  'link-in-text-block',
]);

// Pull a readable example ("`#fff` on `#84cc16` · ratio 1.89") from a contrast
// failure; else fall back to help text.
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
          framework: `@surfnet/curve-${fw.name}`,
          component,
          variation,
          theme: combo.theme,
          mode: combo.mode,
          rule: ref,
          example: exampleFor(v),
          themeDependent: THEME_DEPENDENT_RULES.has(v.id),
          screenshotUrl: screenshotUrl(fw.name, v.screenshot),
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
    const fwList = [...frameworksWithReports].map((f) => `\`@surfnet/curve-${f}\``).join(', ');
    return [
      HEADER,
      '',
      `✅ **No violations** across ${storiesAudited} stories / ${totalCombos} theme·mode ` +
        `combinations in ${fwList}.`,
      '',
      FOOTER,
    ].join('\n');
  }

  // Nest framework -> component -> variation, splitting findings into structural
  // (collapsed) and themed (kept per theme -> mode).
  interface Leaf {
    mode: string;
    rule: string;
    example: string;
    screenshotUrl?: string;
  }
  interface StructuralEntry {
    desc: string;
    screenshotUrl?: string;
  }
  interface VariationData {
    structural: Map<string, StructuralEntry>; // rule -> short description (deduped)
    themed: Map<string, Leaf[]>; // theme -> failing modes
  }
  type VariationMap = Map<string, VariationData>;
  type ComponentMap = Map<string, VariationMap>;

  // GitHub strips `data:` URIs from comment markdown, so thumbnails need a
  // real URL — this stays undefined outside the "Publish a11y screenshots" CI
  // step, and callers just render without an image in that case.
  const img = (url: string | undefined, alt: string): string =>
    url ? `<img src="${url}" alt="${alt.replace(/"/g, '')}">` : '';

  const tree = new Map<string, ComponentMap>();
  for (const r of rows) {
    const components = tree.get(r.framework) ?? new Map<string, VariationMap>();
    const variations = components.get(r.component) ?? new Map<string, VariationData>();
    const data: VariationData = variations.get(r.variation) ?? {
      structural: new Map(),
      themed: new Map(),
    };
    if (r.themeDependent) {
      const leaves = data.themed.get(r.theme) ?? [];
      leaves.push({
        mode: r.mode,
        rule: r.rule,
        example: r.example,
        screenshotUrl: r.screenshotUrl,
      });
      data.themed.set(r.theme, leaves);
    } else {
      // Same finding in every theme/mode — keep one entry per rule.
      data.structural.set(r.rule, { desc: r.example, screenshotUrl: r.screenshotUrl });
    }
    variations.set(r.variation, data);
    components.set(r.component, variations);
    tree.set(r.framework, components);
  }

  const themedCount = (d: VariationData) =>
    [...d.themed.values()].reduce((n, leaves) => n + leaves.length, 0);
  const findingCount = (d: VariationData) => d.structural.size + themedCount(d);
  const variationsCount = (vs: VariationMap) =>
    [...vs.values()].reduce((n, d) => n + findingCount(d), 0);
  // Light before dark, then anything else alphabetically.
  const modeRank = (m: string) => (m === 'light' ? 0 : m === 'dark' ? 1 : 2);
  const byKey = ([a]: [string, unknown], [b]: [string, unknown]) => a.localeCompare(b);

  let structuralTotal = 0;
  let themedTotal = 0;
  const sections: string[] = [];
  for (const [framework, components] of [...tree].sort(byKey)) {
    const fwCount = [...components.values()].reduce((n, vs) => n + variationsCount(vs), 0);

    const blocks: string[] = [];
    for (const [component, variations] of [...components].sort(byKey)) {
      const lines = [`#### ${component} — ${variationsCount(variations)} finding(s)`];
      for (const [variation, data] of [...variations].sort(byKey)) {
        lines.push('', `##### ${variation} — ${findingCount(data)} finding(s)`);

        // Theme-independent findings: one line each, flagged as such.
        for (const [rule, entry] of [...data.structural].sort(byKey)) {
          structuralTotal += 1;
          const detail = entry.desc ? `${entry.desc} — ` : '';
          lines.push(`- ${detail}${rule} · _all themes/modes_`);
          const thumb = img(entry.screenshotUrl, `${rule} violation`);
          if (thumb) lines.push(`  ${thumb}`);
        }

        // Contrast findings: grouped theme -> mode.
        for (const [theme, leaves] of [...data.themed].sort(byKey)) {
          themedTotal += leaves.length;
          lines.push(`- \`${theme}\``);
          for (const leaf of [...leaves].sort((a, b) => modeRank(a.mode) - modeRank(b.mode))) {
            const detail = leaf.example ? `${leaf.example} — ` : '';
            lines.push(`  - \`${leaf.mode}\` — ${detail}${leaf.rule}`);
            const thumb = img(leaf.screenshotUrl, `${leaf.rule} violation (${theme}/${leaf.mode})`);
            if (thumb) lines.push(`    ${thumb}`);
          }
        }
      }
      blocks.push(lines.join('\n'));
    }

    sections.push(
      `<details open><summary><strong>${framework}</strong> — ${fwCount} finding(s)</summary>\n\n${blocks.join('\n\n')}\n\n</details>`,
    );
  }

  const breakdown =
    `${themedTotal} contrast (per theme·mode), ${structuralTotal} theme-independent` +
    ` · across ${storiesAudited} stories / ${totalCombos} audited combinations`;

  return [
    HEADER,
    '',
    `⚠️ **${structuralTotal + themedTotal} finding(s)** — ${breakdown}. ` +
      `Report-only — does not block merge.`,
    '',
    ...sections,
    '',
    FOOTER,
  ].join('\n');
}

// Keep under GitHub's 65 536-char comment limit.
const MAX_LEN = 64000;
const full = buildBody();
const body =
  full.length > MAX_LEN
    ? full.slice(0, MAX_LEN) +
      '\n\n_…truncated; see the `a11y-reports` artifact for the full list._'
    : full;

mkdirSync(dirname(resolve(OUT)), { recursive: true });
writeFileSync(OUT, body + '\n', 'utf8');

// Mirror into the Actions run summary when available.
const stepSummary = process.env.GITHUB_STEP_SUMMARY;
if (stepSummary) appendFileSync(stepSummary, body + '\n');

console.log(`a11y comment written to ${OUT} (${rows.length} failing rows)`);
