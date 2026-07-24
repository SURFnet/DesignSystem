# Decision log — Curve PoC

Architecture and tooling decisions for the Curve proof of concept. Each
entry is a lightweight [ADR](https://adr.github.io/) (Architecture Decision Record,
Michael Nygard style): a dated, status-bearing record of _what_ we chose, _why_, and
_what follows from it_.

This log captures the **PoC / repo-wide** decisions. Fine-grained **design-token**
decisions live separately in
[`design-token-setup-exploration/beslissingen.md`](./design-token-setup-exploration/beslissingen.md)
(Dutch); entries here link into them where relevant.

## How this works

Each decision is an `ADR-NNN` record with a status. We don't rewrite history: when a
decision changes, we add a new record and mark the old one **Superseded**, pointing to
the replacement.

| Status         | Meaning                                        |
| -------------- | ---------------------------------------------- |
| **Accepted**   | Active; the code, tokens, or process follow it |
| **Proposed**   | Direction agreed, not yet locked in            |
| **Open**       | Still under discussion; options being compared |
| **Superseded** | Replaced by a later record (linked)            |

## Index

| #   | Decision                                                                                                             | Status   | Date       |
| --- | -------------------------------------------------------------------------------------------------------------------- | -------- | ---------- |
| 01  | [Monorepo structure](#adr-001--monorepo-structure)                                                                   | Accepted | 2026-06-30 |
| 02  | [Base UI over Radix (React)](#adr-002--base-ui-over-radix-react)                                                     | Accepted | 2026-06-30 |
| 03  | [Phosphor icons](#adr-003--phosphor-icons)                                                                           | Accepted | 2026-06-30 |
| 04  | [Tokens as single source of truth](#adr-004--tokens-as-single-source-of-truth)                                       | Accepted | 2026-06-30 |
| 05  | [Figma → code sync](#adr-005--figma--code-sync)                                                                      | Accepted | 2026-06-30 |
| 06  | [Theming via a class on `<html>`](#adr-006--theming-via-a-class-on-html)                                             | Accepted | 2026-06-30 |
| 07  | [Token naming & roles](#adr-007--token-naming--roles)                                                                | Accepted | 2026-06-29 |
| 08  | [Explicit colors over opacity](#adr-008--explicit-colors-over-opacity)                                               | Accepted | 2026-06-29 |
| 09  | [Modes vs themes](#adr-009--modes-vs-themes)                                                                         | Accepted | 2026-06-29 |
| 10  | [Deviating from shadcn is manageable](#adr-010--deviating-from-shadcn-is-manageable)                                 | Accepted | 2026-06-29 |
| 11  | [Cross-framework parity via contracts](#adr-011--cross-framework-parity-via-contracts)                               | Accepted | 2026-06-30 |
| 12  | [Tailwind v4 for styling](#adr-012--tailwind-v4-for-styling)                                                         | Proposed | 2026-06-30 |
| 13  | [Storybook + token docs](#adr-013--storybook--token-docs)                                                            | Accepted | 2026-06-30 |
| 14  | [Versioning & publishing via Changesets](#adr-014--versioning--publishing-via-changesets)                            | Accepted | 2026-06-30 |
| 15  | [Tree-shakeable React build](#adr-015--tree-shakeable-react-build)                                                   | Accepted | 2026-06-30 |
| 16  | [Component scope built in parity](#adr-016--component-scope-built-in-parity)                                         | Accepted | 2026-06-30 |
| 17  | [Prove it in a real app](#adr-017--prove-it-in-a-real-app)                                                           | Proposed | 2026-06-30 |
| 18  | [Relative imports for vendored helm cross-references](#adr-018--relative-imports-for-vendored-helm-cross-references) | Accepted | 2026-07-01 |
| 19  | [Only add components available in both frameworks](#adr-019--only-add-components-available-in-both-frameworks)       | Accepted | 2026-07-13 |

### Open questions (not yet decided)

| Topic                                                     | Notes                                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Product families** — own font / border-radius per brand | Not decided; Simone is working out an iteration                            |
| **Final sign-off**                                        | Pending alignment with the designers' team (2026-06-30) and review by Okke |

---

## ADR-001 — Monorepo structure

**Status:** Accepted · **Date:** 2026-06-30

**Context.** The design system ships React and Angular component libraries plus shared
tokens, contracts, and config. These need to version and release together.

**Decision.** One **Turborepo + pnpm** monorepo. Six packages: `@surfnet/curve-react`,
`@surfnet/curve-angular`, `@surfnet/curve-tokens`, `@surfnet/curve-contracts`, `@surfnet/curve-storybook-config`,
`@surfnet/curve-typescript-config`. One directory per component.

**Rationale.** Shared tooling, atomic cross-package changes, and a single build graph
(`turbo`) keep the two frameworks in lockstep without separate release pipelines.

**Consequences.** Turbo wires inter-package build order via `^build`; contributors build
`@surfnet/curve-tokens` (and `@surfnet/curve-react` before the demo app). See [AGENTS.md](../AGENTS.md).

---

## ADR-002 — Base UI over Radix (React)

**Status:** Accepted · **Date:** 2026-06-30

**Context.** shadcn/ui defaults to Radix primitives. We evaluated Base UI as the
underlying primitive layer for `@surfnet/curve-react`.

**Decision.** Configure shadcn with **Base UI** primitives — `packages/react/components.json`
sets `"style": "base-vega"`. **Do not** switch `style` back to a Radix value.

**Rationale.** Base UI is the direction we're standardizing on for accessibility and API
shape. Locking the `style` field prevents the CLI from re-vendoring Radix variants.

**Consequences.** Components are vendored via the shadcn CLI under Base UI; any new
component must come in through that flow.

---

## ADR-003 — Phosphor icons

**Status:** Accepted · **Date:** 2026-06-30

**Context.** We started with Tabler icons, then later switched. Both React and Angular
need to look visually aligned.

**Decision.** Use **Phosphor** as the single icon family across React and Angular
(`components.json` → `"iconLibrary": "phosphor"`). We migrated React off Lucide and
Angular off its earlier set to Phosphor.

**Rationale.** One icon family keeps the two frameworks visually consistent and avoids
per-framework icon drift.

**Consequences.** Component scaffolds pull Phosphor icons by default.

---

## ADR-004 — Tokens as single source of truth

**Status:** Accepted · **Date:** 2026-06-30

**Context.** Color and semantic values must stay identical across React, Angular, Figma,
and any consumer.

**Decision.** **DTCG JSON is the only place tokens live** (`packages/tokens/src/tokens*.json`).
**Style Dictionary** builds it into `tokens.css` plus a typed TS map. `@surfnet/curve-tokens` is
published as the **only public package**.

**Rationale.** A single typed source removes hand-edited drift between stylesheets and
frameworks. Both component packages `@import` the generated CSS.

**Consequences.** Never hand-edit `:root` / `.dark` blocks in a framework stylesheet —
change the DTCG JSON and rebuild. Related token-level records:
[token-roles](./design-token-setup-exploration/beslissingen/token-roles.md).

---

## ADR-005 — Figma → code sync

**Status:** Accepted · **Date:** 2026-06-30

**Context.** Designers maintain variables in Figma; engineering needs them as tokens
without manual copying.

**Decision.** A `sync:figma` script (`scripts/sync-figma.ts`) pulls from the **Figma
Variables API** and regenerates the DTCG JSON. Run manually/locally; the JSON is committed.

**Rationale.** Committed JSON means builds never depend on Figma being reachable, while a
one-command sync keeps tokens current when design changes.

**Consequences.** Needs `FIGMA_TOKEN` + `FIGMA_FILE_ID` in `.env`. Syncing is optional for
a normal build. Related:
[figma-tailwind-tokens](./design-token-setup-exploration/beslissingen/figma-tailwind-tokens.md).

---

## ADR-006 — Theming via a class on `<html>`

**Status:** Accepted · **Date:** 2026-06-30

**Context.** The system needs multiple brand themes and dark mode without rebuilds.

**Decision.** Themes and dark mode are a **class on `<html>`** (e.g.
`class="dark theme-surf-green"`). The CSS ships per-theme/per-mode **diffs**.

**Rationale.** Diff-based CSS keeps the payload small and lets consumers switch theme or
mode at runtime by toggling a class — no rebuild.

**Consequences.** Token build emits `:root` (light default), `.dark`, and
`.theme-<class>` / `.dark.theme-<class>` blocks. Related:
[dark-mode](./design-token-setup-exploration/beslissingen/dark-mode.md).

---

## ADR-007 — Token naming & roles

**Status:** Accepted · **Date:** 2026-06-29 · **Source:** "Token opzet bepalen" meeting

**Context.** Several shadcn token names don't describe their role (`muted`, `accent`),
which obscures intent and conflates concerns.

**Decision.** Rename non-meaningful shadcn names to role-based names (`muted` →
`background-subtle`; `accent` → `item-hover` / `item-selected`). **One role per token**:
background, foreground, or border. Separate tokens for **hover**, **press**, and
**loading** states.

**Rationale.** Role-first names make the token's job explicit and stop one token serving
two purposes (e.g. neutral hover vs brand selection).

**Consequences.** A one-time old→new mapping per component. Related token records:
[token-roles](./design-token-setup-exploration/beslissingen/token-roles.md),
[muted-token](./design-token-setup-exploration/beslissingen/muted-token.md),
[secondary-subtle-item-hover](./design-token-setup-exploration/beslissingen/secondary-subtle-item-hover.md),
[hover-states](./design-token-setup-exploration/beslissingen/hover-states.md).

---

## ADR-008 — Explicit colors over opacity

**Status:** Accepted · **Date:** 2026-06-29 · **Source:** "Token opzet bepalen" meeting

**Context.** shadcn models some states with opacity modifiers (`/80`, `/50`). Alpha
workarounds don't export cleanly from Figma and hide the real rendered color.

**Decision.** Replace opacity-based tokens with **explicit color values**. Define fixed
color scales per brand (e.g. `surf-blue-50…900`). Remove hardcoded alpha from code and
sync the resulting colors as tokens.

**Rationale.** Explicit values are unambiguous, round-trip with Figma, and give designers
control over each state's exact color.

**Consequences.** Brand scales must exist as tokens; incomplete scales need filling.
Related: [hover-token-generatie](./design-token-setup-exploration/beslissingen/hover-token-generatie.md),
[token-migratie](./design-token-setup-exploration/beslissingen/token-migratie.md).

---

## ADR-009 — Modes vs themes

**Status:** Accepted · **Date:** 2026-06-29 · **Source:** "Token opzet bepalen" meeting

**Context.** Figma has no fallback layering between neutral and brand colors, which made
light/dark and per-brand values hard to keep DRY.

**Decision.** Define **neutral colors once in the mode** (light/dark). **Override only
brand colors per theme** (surf-blue, studielink-green). The missing Figma fallback layer
is solved via **references**.

**Rationale.** Neutrals rarely change between brands; scoping per-theme overrides to brand
colors only avoids duplicating the full palette per theme.

**Consequences.** Theme files carry brand diffs, not full palettes. Related:
[dark-mode](./design-token-setup-exploration/beslissingen/dark-mode.md).

---

## ADR-010 — Deviating from shadcn is manageable

**Status:** Accepted · **Date:** 2026-06-29 · **Source:** "Token opzet bepalen" meeting

**Context.** Renaming tokens (ADR-007/008) means deviating from shadcn's default class
names — raising the worry that we'd diverge from upstream docs and updates.

**Decision.** Treat the deviation as low-cost: shadcn docs are about **implementation, not
class names**. Record the deviation **once**, then let `sync:figma` run automatically. Use
a one-time old→new token mapping per component (Figma MCP/API).

**Rationale.** The value of shadcn is the component implementation, not its token strings;
our naming layer sits on top without forking the components.

**Consequences.** Each component gets a documented mapping. Reference:
[referentie-shadcn-architectuur](./design-token-setup-exploration/referentie-shadcn-architectuur.md),
[token-migratie](./design-token-setup-exploration/beslissingen/token-migratie.md).

---

## ADR-011 — Cross-framework parity via contracts

**Status:** Accepted · **Date:** 2026-06-30

**Context.** React and Angular must expose the same variants, sizes, and defaults, but
have separate codebases that can drift.

**Decision.** `@surfnet/curve-contracts` defines the canonical variant names, size names, and
defaults as `as const` specs. Each framework enforces them at compile time with
`satisfies` — a mismatch fails `pnpm lint`. Contracts are **build-time only, never published**.

**Rationale.** A typed contract makes divergence a compile error instead of a review
oversight, while erasing after compilation so it never ships.

**Consequences.** Adding a variant means updating the contract; both frameworks must
satisfy it.

---

## ADR-012 — Tailwind v4 for styling

**Status:** Proposed · **Date:** 2026-06-30

**Context.** There was pushback that utility-first CSS is "disguised inline styling."

**Decision.** Use **Tailwind CSS v4** in both frameworks. Try it for the PoC; revisit only
if it fails in practice.

**Rationale.** Both frameworks sharing one styling approach reduces divergence; the
concern is a known trade-off we'll evaluate against real use, not block on up front.

**Consequences.** Marked **Proposed** — kept under review. Both component packages and the
demo app run Tailwind v4 (see [AGENTS.md](../AGENTS.md) for the app's granular import setup).

---

## ADR-013 — Storybook + token docs

**Status:** Accepted · **Date:** 2026-06-30

**Context.** We need living component and token documentation, and the team has no
Confluence access.

**Decision.** Per-package Storybook, each component in isolation — **React on Vite**,
**Angular on webpack**. Add **Foundations / Design Tokens** stories for both frameworks.
Storybook is the living docs.

**Rationale.** Co-locating docs with components keeps them current; the webpack builder is
used for Angular because the Vite builder isn't production-ready there.

**Consequences.** Ports pinned so both run at once (React 6006, Angular 6007). Shared
config in `@surfnet/curve-storybook-config`. Keep `browserTarget: "angular:build"` and the
Angular `.postcssrc.json` (see [AGENTS.md](../AGENTS.md)).

---

## ADR-014 — Versioning & publishing via Changesets

**Status:** Accepted · **Date:** 2026-06-30

**Context.** Publishable packages need versioning, changelogs, and an npm release path.

**Decision.** Use **Changesets** for versioning and changelog. Publish to public npm from
**GitHub Actions**. Only `@surfnet/curve-tokens` is public today.

**Rationale.** Changesets ties each change to a semver bump and a consumer-facing
changelog entry; CI owns version/publish so contributors only commit the changeset file.

**Consequences.** When you change a publishable package, add a changeset (`pnpm changeset`).
Don't run `version-packages`/`release` by hand. See [AGENTS.md](../AGENTS.md).

---

## ADR-015 — Tree-shakeable React build

**Status:** Accepted · **Date:** 2026-06-30

**Context.** Consumers should pay only for the components they import.

**Decision.** The React library builds with `preserveModules` (Vite/Rollup —
`packages/react/vite.config.ts`), preserving the module graph instead of one bundle.

**Rationale.** Per-module output lets bundlers tree-shake unused components, giving real
apps smaller bundles.

**Consequences.** `.d.ts` files land under `dist/src/`, so `package.json` `types` points at
`dist/src/index.d.ts`.

---

## ADR-016 — Component scope built in parity

**Status:** Accepted · **Date:** 2026-06-30

**Context.** The PoC needs a representative component set in both frameworks.

**Decision.** Roughly **16 components each** in React and Angular, built in parity. React
additionally ships a **data table** (TanStack); both share the rest. Target **WCAG 2.1 AA**.

**Rationale.** A parity set proves the contract mechanism and tokens across both
frameworks; the data table demonstrates React-only depth where Angular has no direct equivalent.

**Consequences.** Each shared component must satisfy the contract (ADR-011) and ship a
Storybook story (ADR-013).

---

## ADR-017 — Prove it in a real app

**Status:** Proposed · **Date:** 2026-06-30

**Context.** Components should be validated as a true external consumer, not only in
Storybook.

**Decision.** A demo **Next.js (App Router)** app consumes `@surfnet/curve-react` via
`workspace:*`. Richer screens (browse-apps, login) are in progress on a branch.

**Rationale.** Consuming the compiled package (with `transpilePackages` + the published
`styles.css`) surfaces integration issues Storybook can't.

**Consequences.** Marked **Proposed** while the richer screens land. Apps stay consumers,
not published packages; keep the demo simple. See [AGENTS.md](../AGENTS.md).

---

## ADR-018 — Relative imports for vendored helm cross-references

**Status:** Accepted · **Date:** 2026-07-01

**Context.** The Spartan CLI vendors `helm` components into `src/lib/ui/<name>/` and wires
cross-component references through a `@spartan-ng/helm/<name>` tsconfig `paths` alias
(`packages/angular/components.json` → `importAlias`). That alias isn't a real npm package
— it only resolves when a consuming **app**'s own bundler reads the tsconfig mapping at
build time. `@surfnet/curve-angular` instead builds itself into a redistributable package via
`ng-packagr`. `ng-packagr`'s rollup step hardcodes any bare (non-relative) import specifier
as external unless it matches a registered secondary entry point
(`node_modules/ng-packagr/.../flatten/rollup.js` → `isExternalDependency`) — it never
consults tsconfig `paths`. With one entry point (`src/public-api.ts`), every alias-based
cross-import leaked into the published bundle as an unresolved `@spartan-ng/helm/*` import,
and in some cases duplicated the real symbol (once correctly inlined via a relative import
path elsewhere, once left dangling as external).

**Decision.** Rewrite all vendored cross-component imports from the
`@spartan-ng/helm/<name>` alias to relative paths. Added
`packages/angular/scripts/rewrite-helm-imports.ts` (run via
`pnpm --filter @surfnet/curve-angular fix-helm-imports`, `jiti`) as a codemod to re-apply this
after every `ng g @spartan-ng/cli:ui <component>` run, since the CLI always writes the
alias form.

**Rationale.** No supported config exists to make `ng-packagr` inline the alias for a
single-entry-point library — not `components.json`'s `importAlias`, not `ng-package.json`.
Moving to per-component secondary entry points (matching how Spartan's own `@spartan-ng/helm`
package ships subpath exports) would fix it too, but is a much larger structural change;
relative imports are the minimal fix within the current single-entry-point architecture.

**Consequences.** The `angular.md` add-component playbook's "don't rewrite to relative
imports" guidance was reversed — see the **Notes** section there. Run
`fix-helm-imports` after every future `ng g` run and verify with
`grep -r "@spartan-ng/helm" packages/angular/dist` (should be empty) before publishing.

---

## ADR-019 — Only add components available in both frameworks

**Status:** Accepted · **Date:** 2026-07-13

**Context.** A gap analysis against the Figma component library (41 missing components)
was worked through by vendoring each one from shadcn (React) and Spartan (Angular). Two
of them — **Chart** and **Drawer** — have a shadcn/Base UI implementation but no Spartan
equivalent: Spartan ships no `chart` generator at all, and its closest primitive to Drawer
is `sheet` (a side panel), which is a different pattern and already vendored as its own
component. Three more from the original gap list — **Login** (full custom flow), **Top
navigation**, and **Typography** — aren't vendorable primitives in either registry at all:
Login/Top navigation need bespoke composition, and Typography is prose styling, not a
shadcn/Spartan component.

**Decision.** Ship only components that land in **both** `@surfnet/curve-react` and
`@surfnet/curve-angular`. Chart and Drawer are removed from `@surfnet/curve-react` (they were
briefly added React-only) rather than kept as a one-sided addition. Login, Top navigation,
and Typography stay out of scope entirely for now — none of the three were ever vendored.

**Rationale.** ADR-016 already set the precedent that this system is built **in parity**;
a component that exists in only one framework quietly breaks that contract and forces
consumers of the other framework to special-case it. Better to track the gap explicitly
here than let per-framework drift creep in one component at a time.

**Consequences.** Follow-up work, to be picked up when the blocker clears:

- **Chart** — re-add to `@surfnet/curve-react` once Spartan ships a chart component, or
  scope a custom Angular chart wrapper (e.g. over `ngx-charts` or a direct `recharts`-equivalent)
  if Spartan support doesn't materialize.
- **Drawer** — re-add to `@surfnet/curve-react` once Spartan ships a distinct
  bottom/edge-drawer primitive (not just `sheet`), or build a custom Angular equivalent on top
  of `@spartan-ng/brain/dialog` (the primitive `sheet` already uses). Re-check
  spartan.ng/components periodically — this is exactly the kind of gap that closes silently.
- **Login** — needs a custom, hand-composed full flow (form, validation, provider hooks) in
  both frameworks; not something a CLI vendors. Design input needed before scoping.
- **Top navigation** — same: a bespoke composition (likely built from `NavigationMenu` +
  `Avatar` + `DropdownMenu`), not a registry component.
- **Typography** — decide whether this becomes a real component (e.g. `Heading`/`Text`
  wrapper components with contract-enforced size/weight scales) or stays documentation-only
  (a Storybook foundations page, like the existing Design Tokens stories) before building it.
