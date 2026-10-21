---
name: add-component
description: Use when adding, scaffolding, or vendoring a component into the design system — for @surfnet/curve-react (shadcn/ui + Base UI), @surfnet/curve-angular (Spartan), or both packages in parity. This is the index; it routes to the per-framework playbooks in react.md and angular.md.
---

# Add a component

**Already in the repo?** Don't re-run an add flow. Use
[`update-component`](../update-component/SKILL.md) so Curve design and accessibility edits
are merged, not overwritten.

## 1. Run the generator

```bash
pnpm component:import <name> --description "One sentence." [--axis variants=a,b] [--react|--angular]
pnpm component:new    <name> --description "One sentence." [--axis variants=a,b] [--react|--angular]
```

- **`component:import`** — a shadcn / Spartan component. Checks which upstream has it
  (fails if a requested framework has none), writes the contract, vendors it (React via
  `shadcn add --dry-run`, writing only the component; Angular via the Spartan CLI, undoing
  its dependency and brain bumps), adds barrel, exports, CSS stub (imported in Angular
  `styles.css`), story stub and the `.upstream/` snapshot.
- **`component:new`** — home-grown, no upstream. Names get the `curve-` prefix (`pill` →
  `curve-pill`, React `CurvePill`, Angular `CurvePillComponent`). You get a small working
  component per framework with each axis wired to a typed prop + `data-*` attribute, a CSS
  rule stub per value, and Playground + per-axis stories.
- No `--react`/`--angular` → both. **Always pass `--description`** — without it the
  script asks on stdin, and fails when there's no terminal.
- `--axis` is repeatable (`--axis variants=default,outline --axis sizes=default,sm`). Pick
  axes from what the component actually exposes; shapes are in [`contract.md`](contract.md).
- It refuses up front when the component exists, when a bare `component:new` name is an
  upstream component, or when Spartan needs a newer `@spartan-ng/brain`. For the last,
  rerun with `--react` and document the Angular gap.

The script ends with **"Still to do by hand"**. That list is your task. If the script can't
run at all, do [`manual.md`](manual.md) first, then continue here.

## 2. Finish by hand

Read only the playbook(s) for the framework(s) you added:

- **React** → [`react.md`](react.md): Tailwind → CSS Module, wire contract axes, stories.
- **Angular** → [`angular.md`](angular.md): Tailwind → `hlm-<name>.css`, wire contract axes,
  new runtime deps, stories.

Deeper references when you need a component's API: the `shadcn` / `spartan` skills and the
`shadcn` / `spartan-ui` MCP servers.

## 3. Parity (both frameworks)

- **Variants & sizes:** the two CLIs usually emit the same names. If they differ, keep the
  vendored defaults and **document the gap**; don't silently edit one side.
- **Stories:** the same named stories in both (Playground, Variants, Sizes, states, …).
  `pnpm check:conventions` checks story-title parity; visual parity compares by story id.
- **Tokens:** semantic values live in `@surfnet/curve-tokens` DTCG JSON — rebuild tokens,
  don't hand-edit `:root`.

## 4. Done when

```bash
pnpm check:conventions && pnpm lint && pnpm build && pnpm format
pnpm build-storybook && pnpm test:visual
pnpm changeset   # minor: new component
```

- Contract description and axis docs filled in (no `TODO`); every axis wired in each
  framework so `pnpm lint` fails on name drift.
- No Tailwind left in component code; stories cover the full variant/size/state surface.
- Any unavoidable React/Angular difference documented, not hidden.
- Ask the user before refreshing baselines with `pnpm test:visual:update`.
