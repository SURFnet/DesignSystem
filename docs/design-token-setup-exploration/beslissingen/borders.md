# Borders

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien: geen alpha borders)  
**Betrokken:** Design system / token library

## Samenvatting

> Twee semantic border-tokens: `--border-default` (structuur) en `--border-input` (form controls). **Light én dark: opaque palette-ref** — geen alpha op borders. Contrast minimaal 3:1 tegen **default, card én subtle**. Geen border tiers. Randdikte blijft Tailwind utility.

## Context

Borders scheiden UI-vlakken, omlijsten form controls en geven outline-buttons hun rand. shadcn gebruikt `--border` en `--input` als **kleurtokens** (niet als dikte). In dark mode wijkt shadcn af van de light-mode palette: borders worden semi-transparant wit i.p.v. een donkere neutral shade.

De token library had al `THEME_BASE` en `DARK_OVERRIDES` voor borders; de backlog vroeg om expliciete keuzes vast te leggen — vooral rond de `--border` / `--input`-split, dark-mode opacity, en het afwijzen van extra border-tiers.

## Probleem / vraag

1. Hoeveel border-kleurtokens hebben we nodig?
2. Light vs dark: palette-ref of alpha-waarden?
3. Moet `--input` gelijk zijn aan `--border`?
4. Hoe relateert border-dikte aan tokens?
5. Wat doen we met Figma-only custom tokens (`custom-border-dark-input-dark`)?

## Analyse — hoe shadcn het doet

**Semantic tokens (kleur):**

| Token              | Light (default)              | Dark                         | Gebruik                                      |
| ------------------ | ---------------------------- | ---------------------------- | -------------------------------------------- |
| `--border`         | `neutral-200` (opaque)       | `oklch(1 0 0 / 10%)`         | Cards, tables, dividers, outline-button rand |
| `--input`          | `neutral-200` (opaque)       | `oklch(1 0 0 / 15%)`         | Input, textarea, select, outline surfaces    |
| `--sidebar-border` | zelfde patroon als `--border`| zelfde patroon als `--border`| Alt-regio — zie [Alt surfaces](./alt-surfaces.md) |
| `--ring`           | `neutral-400`                | `neutral-500`                | Focus ring — zie [Focus ring](./focus-ring.md) |

**Belangrijk:** `--input` is primair een **randkleur**, geen achtergrondkleur — behalve wanneer code opacity-modifiers gebruikt (`dark:bg-input/30`, `dark:hover:bg-input/50` op outline buttons). Dan fungeert dezelfde token als semi-transparante surface.

**Dikte:** shadcn gebruikt Tailwind classes (`border`, `border-input`, `border-2`). Geen `--border-width` theme token.

**Contrast:** UI-borders minimaal **3:1** (WCAG non-text). Test tegen **elke relevante achtergrond** — niet alleen `--background-default`, ook `--background-subtle` (`neutral-100`) en `--background-card`. Eén border-token op mixed surfaces vereist een stap die overal voldoet (default theme: `neutral-300` i.p.v. `200` op `subtle`).

De Contrast-tab test `--border-default`, `--border-input` en `--ring-default` tegen `--background-default`, `--background-subtle`, `--background-card` en `--background-alt`.

## Overwogen opties

### Optie A — shadcn-default: light opaque, dark alpha *(vervallen)*

Was eerdere keuze. Vervangen door Optie D (symmetrisch opaque).

| Pro | Con |
| --- | --- |
| shadcn-pariteit | Asymmetrisch; alpha moeilijk in contrast-tab |

### Optie B — Border tiers (`--border-subtle`, `--border`, `--border-strong`) *(afgewezen)*

Drie intensiteiten voor hiërarchie.

| Pro                    | Con                                              |
| ---------------------- | ------------------------------------------------ |
| Meer visuele nuance    | shadcn heeft dit niet; inconsistent met kit      |
|                        | Meer tokens per theme                            |
|                        | Designers moeten per component tier kiezen       |

### Optie C — Eén border-token (`--border` only) *(afgewezen)*

`--input` alias van `--border`.

| Pro              | Con                                           |
| ---------------- | --------------------------------------------- |
| Minder tokens    | Form controls niet apart te themen            |
|                  | Wijkt af van shadcn + shadcndesign kit        |

### Optie D — Light én dark opaque palette-ref *(gekozen)*

Zelfde mechanisme in beide modes: `{ ref: "--color-neutral-*" }`.

| Pro | Con |
| --- | --- |
| Symmetrisch light/dark | Wijkt af van shadcn dark alpha borders |
| Contrast-tab eenvoudig (vaste paren) | Border moet op **subtle én default** getest worden |
| Figma `{ ref }` overal | Mogelijk zwaarder op wit dan shadcn alpha dark |
| Geen blend-afhankelijke checks | |

### Optie E — Light én dark alpha *(afgewezen)*

Symmetrisch via `oklch(… / 10%)` in beide modes.

| Pro | Con |
| --- | --- |
| Visueel egaler op mixed surfaces | Contrast-tab complex (blend) |
| | Geen `{ ref }` in Figma export |
| | Minder in lijn met voorkeur eenvoudige WCAG-checks |

## Beslissing

**Optie D — twee kleurtokens, light én dark opaque palette-ref.**

### Token-schema

```
Light (THEME_BASE):
  --border-default → --color-neutral-300   (≥3:1 op default én subtle)
  --border-input   → --color-neutral-300   (los token; theme kan control iets sterker)
  --border-alt     → --color-neutral-200

Dark (DARK_OVERRIDES):
  --border-default → --color-neutral-700
  --border-input   → --color-neutral-600
  --border-alt     → --color-neutral-700
```

**Waarom losse tokens als light dezelfde ref deelt:** themes kunnen controls zichtbaarder maken (`neutral-400`) zonder structuurborders aan te passen.

**Waarom geen alpha (meer):** consistent mechanisme light/dark; contrast-checks op vaste palette-paren; borders getest op `--background-subtle` (`100`) én `--background-default` (white).

**Default theme `neutral-300`:** `neutral-200` op `neutral-100` (subtle/secondary) faalt visueel én WCAG; `300` is minimum richting — per theme valideren in Contrast-tab.

**Geen border tiers:** ongewijzigd.

**Dikte / Figma custom / focus vs border:** ongewijzigd — zie eerdere secties.

### Component-gebruik

| Component / patroon     | Border token              | Dikte (Tailwind) |
| ----------------------- | ------------------------- | ---------------- |
| Card, Table, Separator  | `border-default`          | `border`         |
| Input, Textarea, Select | `border-input`            | `border`         |
| Outline Button          | `border-input`            | `border`         |
| Alt regio divider       | `border-alt`              | `border`         |

## Rationale

1. **Consistentie** — borders altijd opaque ref; geen mix met alpha in dark.
2. **Contrast-tooling** — `{ ref }` paren tegen elke relevante surface.
3. **Subtle-probleem erkend** — border-stap tunen voor default + subtle, niet alleen white canvas.
4. **Theming-flexibiliteit** — control vs structuur border blijft los.
5. **Scheiding kleur vs dikte** — ongewijzigd.

## Gevolgen

- **Tokens:** `DARK_OVERRIDES` borders → palette-ref (geen `oklch` alpha)
- **Light borders:** default theme → `neutral-300` (was `200`)
- **Contrast-tab:** paren toegevoegd voor `--background-subtle` × borders
- **shadcn-migratie:** stock dark alpha borders vervangen door SURF opaque waarden
- **Figma:** Mode → custom border alpha **niet gebruiken** — bind `--border-*` in base dark

## Open vragen

- [ ] Outline button dark hover: `dark:hover:bg-input/50` → `--background-item-hover`?
- [x] Invalid states — [Invalid / error states](./invalid-error-states.md)
- [ ] Per theme: `neutral-300` vs `400` voor control border op subtiele themes?

## Gerelateerd

- [Dark mode](./dark-mode.md) — borders volgen opaque model; alpha alleen utilities
- [Alt surfaces](./alt-surfaces.md) — `--border-alt`
- [Figma Tailwind-tokens](./figma-tailwind-tokens.md)
- [Hover states](./hover-states.md)
- [Focus ring](./focus-ring.md)
- [Invalid / error states](./invalid-error-states.md)
- [Token roles](./token-roles.md)
- [Token-migratie](./token-migratie.md)

## Referenties

```
LIGHT & DARK (symmetrisch — beide opaque ref)
┌─────────────────────────┐        ┌─────────────────────────┐
│  --border-default       │        │  --border-default       │
│  ref: neutral-300       │        │  ref: neutral-700       │
│  test vs default+subtle │        │  test vs default+card   │
├─────────────────────────┤        ├─────────────────────────┤
│  --border-input         │        │  --border-input         │
│  ref: neutral-300       │        │  ref: neutral-600       │
└─────────────────────────┘        └─────────────────────────┘

NIET voor borders: oklch(… / 10%)  ←  shadcn dark; SURF afgewezen
WEL elders:        opacity-50 (disabled), ring/40 (invalid focus)
```
