# Hover states

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien)  
**Betrokken:** Design system / token library

## Samenvatting

> Twee interactie-tracks: **emphasis** (`--background-primary-hover`, `--background-secondary-hover` voor filled controls) en **items** (`--background-item-hover` grijs, `--background-item-selected` brand). `--accent` / `--accent-foreground` verdwijnen. Geen opacity-modifiers (`/80`) als hoofdstrategie. Keyboard focus blijft `--ring-default`.

## Context

shadcn gebruikt `--accent` voor hover op ghost buttons, menu-items, command palette entries en selected nav — maar de naam suggereert branding, terwijl het een **interactie-highlight** is (hover vaak grijs, selected vaak brandkleur).

Tegelijk gebruikt shadcn opacity-modifiers (`hover:bg-primary/90`) voor filled buttons. Dat is visueel context-afhankelijk en moeilijk te syncen met Figma.

## Probleem / vraag

1. Hoe modelleren we hover en selected expliciet en voorspelbaar?
2. Hoe vervangen we `--accent` door beschrijvende namen?
3. Hoe scheiden we filled-button hover van list/menu/nav interactie?

## Analyse — twee interactiemodellen

Er is **geen enkele `--hover`-token** die overal geldt. shadcn combineert nu impliciet twee patronen:

| Context                                    | Default      | Hover                      | Selected             |
| ------------------------------------------ | ------------ | -------------------------- | -------------------- |
| **Filled button** (primary/secondary)      | `bg-primary` | donkerder primary          | —                    |
| **List/menu/nav/ghost** op bg/card/popover | transparent  | subtiele highlight (grijs) | brand/actief (blauw) |

**`--accent` is geen hover van `--background`.** Het is een absolute highlight-kleur die op elke onderliggende surface hetzelfde blijft — niet berekend als `background + delta`.

**Waarom niet `--background-hover`?** Items staan op `--background-default`, `--background-card` én `--background-popover`; één item-token dekt alle contexten.

## Overwogen opties

### Optie A — shadcn-default behouden (`--accent` + `/80`-modifiers)

| Pro           | Con                              |
| ------------- | -------------------------------- |
| Weinig tokens | `--accent` misleidende naam      |
|               | Hover ≠ selected niet modelleren |
|               | Figma ≠ code zonder workarounds  |

### Optie B — `--highlight` + `-hover` / `-selected`

| Pro         | Con                                                    |
| ----------- | ------------------------------------------------------ |
| Eén familie | `--highlight` klinkt als achtergrondkleur              |
|             | `--highlight-hover` voelt als kleurenschaal i.p.v. rol |

### Optie C — Twee tracks + item-tokens _(gekozen)_

**Track 1 — Emphasis (filled controls):**

```
--background-primary-hover
--background-secondary-hover
```

**Track 2 — Neutrale items (lists, menus, ghost, nav):**

```
--background-item-hover
--background-item-selected
--foreground-item-selected      (optioneel)
```

| Pro                                                            | Con                            |
| -------------------------------------------------------------- | ------------------------------ |
| Hover (grijs) en selected (brand) expliciet                    | Meer tokens dan shadcn-default |
| Namen beschrijven rol, geen branding                           | Migratie van `--accent` nodig  |
| Voorspelbaar, contrast testbaar                                | Component classes aanpassen    |
| Werkt op default/card/popover zonder surface-specifieke tokens |                                |

## Beslissing

**Optie C — twee tracks; `--accent` vervangen door item-tokens.**

### Tokenschema (gewenste staat)

```
Emphasis (filled buttons, chips):
  --background-primary          →  --background-primary-hover
  --background-secondary        →  --background-secondary-hover

Items (menus, dropdowns, command palette, ghost/outline hover, nav selected):
  --background-item-hover         (neutrale hover — typisch grijs)
  --background-item-selected      (actieve/geselecteerde staat — typisch brand)
  --foreground-item-selected      (optioneel)

Focus (keyboard, los van hover):
  --ring-default                  (zie Focus ring)
  ring-offset via background-surface (geen theme token)

Disabled (geen kleurtokens):
  opacity-50                      (zie Disabled state)
```

### Huidig → gewenst

| Huidig (shadcn)                      | Gewenst                                                          |
| ------------------------------------ | ---------------------------------------------------------------- |
| `--accent` (hover op items/ghost)    | `--background-item-hover`                                        |
| `--accent-foreground`                | `--foreground-item-selected` of `--foreground-default` (context) |
| selected/active nav (was ook accent) | `--background-item-selected`                                     |
| `hover:bg-primary/90`                | `--background-primary-hover`                                     |
| `hover:bg-secondary/80`              | `--background-secondary-hover`                                   |
| `hover:bg-accent` (ghost/outline)    | `--background-item-hover`                                        |
| `--ring`                             | `--ring-default`                                                 |

Zie [Token-migratie](./token-migratie.md).

### Interaction-principe

| Type                       | Default                                           | Hover                     | Selected                     |
| -------------------------- | ------------------------------------------------- | ------------------------- | ---------------------------- |
| Primary/secondary button   | `--background-primary` / `--background-secondary` | `-hover` token            | —                            |
| Ghost / outline button     | transparent                                       | `--background-item-hover` | —                            |
| Menu/dropdown/command item | transparent                                       | `--background-item-hover` | `--background-item-selected` |
| Nav item                   | transparent                                       | `--background-item-hover` | `--background-item-selected` |

**Focus** op items: `--ring-default` voor keyboard; pointer hover blijft `--background-item-hover`.

**Active (pressed):** visueel gelijk aan default voorlopig; later apart token indien nodig.

### Visuele richtlijn (thema)

| Token                          | Light mode richting                         | Dark mode richting       |
| ------------------------------ | ------------------------------------------- | ------------------------ |
| `--background-primary-hover`   | primary iets donkerder (≈ één palette-stap) | primary iets lichter     |
| `--background-secondary-hover` | secondary iets donkerder                    | secondary iets lichter   |
| `--background-item-hover`      | neutraal grijs (subtiel)                    | neutraal grijs (subtiel) |
| `--background-item-selected`   | brand / primary tint                        | brand / primary tint     |

Dit is een **richtlijn voor handmatige keuze**, geen berekening. Hover-tokens zijn vaste opaque palette-refs per theme/mode — geen runtime OKLCH-afleiding. Zie [Hover-tokens: geen auto-generatie](./hover-token-generatie.md).

### Niet doen

- Opacity-modifiers (`/80`, `/90`) als hoofdstrategie voor eigen components
- `--accent-hover` — accent _was_ al de hover-kleur; item-tokens vervangen het geheel
- `--background-hover` — te gebonden aan één surface
- Alpha-collectie als parallel developer-systeem (Figma-only)
- `--background-item-hover` op filled primary/secondary buttons
- Oude shadcn-namen (`--accent`) na migratie behouden

## Rationale

1. **Naamgeving = intentie** — rol-first tokens; “accent” suggereert branding.
2. **Hover ≠ selected** — grijs vs brand expliciet modelleren.
3. **Twee tracks erkennen realiteit** — filled emphasis vs neutrale items.
4. **Surface-onafhankelijk** — item-tokens werken op default, card én popover.
5. **Determinisme** — designers en developers zien dezelfde kleur; contrast per state testbaar.

## Gevolgen

- **Tokens:** `THEME_BASE` — `--accent` / `--accent-foreground` **verwijderen**; emphasis-hover + item-tokens **toevoegen**
- **token-library.jsx:** `TOKEN_USAGE` en `CONTRAST_PAIRS` op gewenste namen
- **Figma:** Theme-variabelen hernoemen/toevoegen; geen `--accent`
- **Code:** `@theme inline` + component classes naar gewenste tokens
- **Migratie:** [Token-migratie](./token-migratie.md) § checklist

## Open vragen

- [ ] `--foreground-item-selected` altijd nodig, of alleen `--foreground-default`?
- [x] Automatische generatie emphasis-hover via OKLCH L-shift? → Nee, vaste opaque tokens — zie [Hover-tokens: geen auto-generatie](./hover-token-generatie.md)
- [x] Alt item-hover: `--sidebar-accent` → `--background-alt-item-hover` — zie [Alt surfaces](./alt-surfaces.md)

## Gerelateerd

- [Token roles](./token-roles.md) — gewenste token architectuur
- [Token-migratie](./token-migratie.md) — huidig → gewenst
- [Disabled state](./disabled-state.md) — disabled gebruikt geen kleurtokens
- [`--muted` token](./muted-token.md) — subtle ≠ item-hover
- [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md) — collision default theme
- [Figma Tailwind-tokens in token library](./figma-tailwind-tokens.md) — alpha-collectie niet gebruiken
- [Borders](./borders.md) — outline button dark hover
- [Dark mode](./dark-mode.md) — hover via tokens in `.dark`
- [Focus ring](./focus-ring.md) — keyboard focus los van hover

## Referenties

```
TWEE TRACKS (gewenste staat)
┌─────────────────────────────┐   ┌─────────────────────────────┐
│  EMPHASIS (filled)          │   │  ITEMS (lists, ghost, nav)  │
│  bg-background-primary      │   │  transparent                │
│    → bg-primary-hover       │   │    → bg-item-hover (grijs)  │
│  bg-background-secondary    │   │    → bg-item-selected       │
│    → bg-secondary-hover     │   │                             │
└─────────────────────────────┘   └─────────────────────────────┘

MIGRATIE
  --accent              →  --background-item-hover (+ --background-item-selected)
  --accent-foreground   →  --foreground-item-selected (of --foreground-default)
  hover:bg-primary/90   →  --background-primary-hover
  --ring                →  --ring-default
```
