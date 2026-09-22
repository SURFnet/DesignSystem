---
name: accessibility
description: >-
  Guides frontend accessibility using Curve personas and WCAG-oriented rules:
  semantic HTML, accessible names, keyboard access, focus, and persona-based
  review. Use when writing or reviewing React, Angular, HTML, or CSS UI, or when
  the user mentions a11y, accessibility, WCAG, toegankelijkheid, personas,
  keyboard navigation, screenreader, or accessible names.
---

# Web accessibility (Curve)

Apply this skill whenever you **write, edit, or review** UI. Do not wait for the user to mention a11y.

Read [personas.md](personas.md) for the seven user perspectives. Read [reference.md](reference.md) for
detailed HTML, keyboard, and naming rules.

## When to use which mode

| Situation | Mode |
| --------- | ---- |
| Writing or editing UI | Baseline workflow (below) + relevant persona checks |
| "Review for accessibility" / PR review | **Full persona review** |
| "Review as [persona]" | **Single persona review** |
| Quick sanity check | Baseline workflow only |

## Baseline workflow (always)

When changing UI, run in order:

1. **Semantics** — correct HTML element (see [reference.md](reference.md)).
2. **Names** — every control has a visible label or accessible name.
3. **Structure** — one `h1`, no skipped heading levels, landmarks present.
4. **Keyboard** — Tab reaches every control; focus is visible.
5. **Skip links** — repeated chrome can be skipped on full pages.

Prefer native HTML before ARIA. If Curve components exist, use them instead of rebuilding primitives.

## Persona review workflow

Use this when reviewing a component, page, or story.

1. Read the code (and story/demo if present). Identify interactive elements, status feedback, media, and layout constraints.
2. Walk **each persona** in [personas.md](personas.md). For each one, ask that persona's review questions against the actual markup and behaviour.
3. Map findings to severity:
   - **Must fix** — blocks a persona from using the UI (no name, keyboard trap, colour-only status, hover-only content)
   - **Should fix** — friction or WCAG risk (weak contrast, small targets, vague errors)
   - **Note** — improvement, not a blocker
4. End with **cross-cutting fixes** — changes that help multiple personas.

Do not answer "is this accessible?" with a single yes/no. Report concrete, verifiable findings.

### Full review output template

```markdown
# Accessibility review: [Component or page name]

## Blind, screenreadergebruiker
- [Must fix] …
- [Should fix] …

## Slechtziend, vergroting
- …

## Kleurenblind
- …

## Doof of slechthorend
- …

## Beperkte motoriek
- …

## Cognitief of neurodivergent
- …

## Tijdelijk of situationeel
- …

## Cross-cutting fixes
1. …
2. …
```

Omit empty persona sections. If a persona has no issues, write "Geen bevindingen" for that section.

### Single persona output

When the user names one persona, use the same severity labels but only that section plus cross-cutting fixes.

## Good prompts (for the user)

These produce verifiable answers:

- "Welk element krijgt focus als dit opengaat, en wat leest een screenreader voor?"
- "Kun je de foutstatus begrijpen zonder kleur te zien?"
- "Is elke actie bereikbaar met alleen het toetsenbord?"
- "Welk native element maakt dit ARIA-attribuut overbodig?"

Avoid accepting a bare "yes, accessible" without mechanism.

## Limits

This skill does not replace manual testing with VoiceOver/NVDA or `@storybook/addon-a11y`. Treat output
like a linter: fast and useful, but not a substitute for real assistive-tech checks.

## Installation (for humans)

| Tool | Path |
| ---- | ---- |
| Cursor | `.cursor/skills/accessibility/` (this folder) |
| Claude Code | `.claude/skills/accessibility/` |
| Other agents | `.agents/skills/accessibility/` |

Download the full folder from Curve Storybook: **Curve → Voor developers → Je werk testen → Wanneer je gebruik maakt van AI**.
