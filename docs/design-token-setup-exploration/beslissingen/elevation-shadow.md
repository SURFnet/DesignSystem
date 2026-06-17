# Elevation / shadow

**Status:** Voorgesteld  
**Datum:** 2026-06-16  
**Betrokken:** Design system / token library

## Samenvatting

> Elevation = Tailwind **shadow utilities** (`shadow-xs` … `shadow-2xl`), geen semantic theme tokens. Foundation-tab: referentietabel (class → waarde). shadcn-componenten krijgen vaste shadow-niveaus per type (outline button → `shadow-xs`, card → `shadow-sm`, popover → `shadow-md`, dialog → `shadow-lg`). Optioneel: schaal aanpassen via `@theme { --shadow-* }` — geen `--shadow-card` in Themes.

## Context

Shadows geven diepte aan zwevende UI (cards, popovers, dialogs) en subtiele lift aan outline controls. De backlog vroeg expliciet om keuzes rond cards, popovers en `shadow-xs` op outline buttons. In [Figma Tailwind-tokens](./figma-tailwind-tokens.md) stond shadow/elevation als open vraag: hoort het in de Theme-collectie (semantic CSS vars) of als utility-referentie?

shadcn/ui gebruikt **geen** `--shadow` of `--elevation` in `:root` / `.dark`. Shadows zijn Tailwind box-shadow utilities. Kleur en surface komen uit bestaande theme tokens (`bg-card`, `bg-popover`, `border-default`); diepte uit de shadow-schaal.

Tailwind v4 hernoemde de schaal (`shadow-sm` → `shadow-xs`, enz.) — shadcn v4-componenten zijn daarop bijgewerkt.

## Probleem / vraag

1. Modelleren we elevation als theme tokens (`--shadow-card`, `--elevation-popover`) of als utilities?
2. Welke shadow-niveaus horen bij welke componenten?
3. Hoe werkt dark mode — aparte shadow-tokens of dezelfde utilities?
4. Waar in Figma / token library documenteren we shadows?
5. Hoe relateert elevation aan borders en focus rings?

## Analyse — hoe shadcn het doet

**Geen semantic shadow tokens in Theme:**

| Concept                | shadcn                                   | Theme token?                                    |
| ---------------------- | ---------------------------------------- | ----------------------------------------------- |
| Card diepte            | `border` + `bg-card` + `shadow-sm`       | Nee — utility                                   |
| Outline button lift    | `border` + `bg-background` + `shadow-xs` | Nee — utility                                   |
| Popover / hover-card   | `border` + `bg-popover` + `shadow-md`    | Nee — utility                                   |
| Dialog / sheet / alert | `border` + `bg-background` + `shadow-lg` | Nee — utility                                   |
| Dropdown submenu       | `shadow-lg` (sub) vs `shadow-md` (root)  | Nee — utility                                   |
| Keyboard focus         | `ring-*` utilities                       | Kleur: `--ring` ([Focus ring](./focus-ring.md)) |

**Tailwind v4 shadow-schaal** (defaults, `@theme`):

| Class         | CSS variable   | Typische waarde                        |
| ------------- | -------------- | -------------------------------------- |
| `shadow-2xs`  | `--shadow-2xs` | `0 1px rgb(0 0 0 / 0.05)`              |
| `shadow-xs`   | `--shadow-xs`  | `0 1px 2px 0 rgb(0 0 0 / 0.05)`        |
| `shadow-sm`   | `--shadow-sm`  | `0 1px 3px 0 …, 0 1px 2px -1px …`      |
| `shadow-md`   | `--shadow-md`  | `0 4px 6px -1px …, 0 2px 4px -2px …`   |
| `shadow-lg`   | `--shadow-lg`  | `0 10px 15px -3px …, 0 4px 6px -4px …` |
| `shadow-xl`   | `--shadow-xl`  | groter                                 |
| `shadow-2xl`  | `--shadow-2xl` | groter                                 |
| `shadow-none` | —              | geen shadow                            |

**v3 → v4 rename** (migratie):

| Tailwind v3 | Tailwind v4 |
| ----------- | ----------- |
| `shadow-sm` | `shadow-xs` |
| `shadow`    | `shadow-sm` |

**Kleur van shadows:** default Tailwind shadows gebruiken zwart + alpha (`rgb(0 0 0 / …)`). Geen koppeling aan `--foreground-default` of palette-ref. Colored shadows (`shadow-lg shadow-primary/50`) bestaan als utility maar shadcn stock components gebruiken ze niet.

**Figma (shadcndesign):** box-shadow waarden zitten in collectie **1. Tailwind CSS** (utility-schaal), niet in **2. Theme**. Theme exporteert kleuren — geen elevation-variabelen.

## Overwogen opties

### Optie A — Semantic elevation tokens (`--shadow-card`, `--elevation-popover`, …) _(afgewezen)_

Per component-type een theme token met volledige `box-shadow`-waarde.

| Pro                                       | Con                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| Designers kunnen per theme shadow tweaken | shadcn heeft dit niet; plugin exporteert het niet                      |
| Expliciete component↔token mapping        | Token-proliferatie (~10+ shadow tokens)                                |
|                                           | Dupliceert Tailwind `@theme` shadow-schaal                             |
|                                           | Breekt met [Figma Tailwind-tokens](./figma-tailwind-tokens.md) Optie C |

### Optie B — Eén universele `--shadow` token _(afgewezen)_

Alle elevated surfaces delen één shadow.

| Pro      | Con                                                        |
| -------- | ---------------------------------------------------------- |
| Minimaal | Dialog en outline button hebben verschillende diepte nodig |
|          | Geen shadcn-pariteit                                       |

### Optie C — Utility-schaal + component-conventies _(gekozen)_

Shadows als Tailwind utilities; Foundation-tab als lookup; vaste mapping per component-type in documentatie en component library.

| Pro                                                                                                 | Con                                                              |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| shadcn-pariteit                                                                                     | Twee plekken: schaal (Foundation) + conventies (docs/components) |
| Consistent met spacing, opacity, border-width ([Figma Tailwind-tokens](./figma-tailwind-tokens.md)) | Designers moeten Figma effect handmatig matchen op utility       |
| `@theme { --shadow-* }` optioneel voor brand-themes                                                 | Geen `--shadow-card` in Contrast-tab                             |
| Geen extra CSS vars in `:root`                                                                      |                                                                  |

### Optie D — Border/ring i.p.v. shadow voor alle elevation _(afgewezen)_

Cards en popovers alleen via `border` + `ring-foreground/10`, geen box-shadow.

| Pro                                      | Con                                                   |
| ---------------------------------------- | ----------------------------------------------------- |
| Minder shadow-drift tussen Figma en code | shadcn v4 gebruikt wél shadows op popover/dialog/card |
|                                          | Zwevende lagen (dialog over overlay) missen diepte    |
|                                          | Outline button mist subtiele lift (`shadow-xs`)       |

## Beslissing

**Optie C — Tailwind shadow utilities + gedocumenteerde component-conventies; geen semantic elevation tokens in Themes.**

### Shadow-schaal (Foundation)

Opnemen in token library als **utility-referentie** (zelfde patroon als Spacing, Opacity):

```
Foundation → Shadow:
  shadow-2xs … shadow-2xl, shadow-none
  (class → box-shadow waarde / --shadow-* variable)
```

**Niet** opnemen als `--shadow-card` e.d. in `THEME_BASE`.

### Elevation-conventies (component → utility)

Vaste shadcn-pariteit; SURF component library volgt dit na migratie:

| Niveau          | Utility       | Gebruik (shadcn v4)                                |
| --------------- | ------------- | -------------------------------------------------- |
| **Subtle lift** | `shadow-xs`   | Outline button, subtiele raised controls           |
| **Surface**     | `shadow-sm`   | Card, statische elevated panels                    |
| **Floating**    | `shadow-md`   | Popover, HoverCard, DropdownMenu (root)            |
| **Modal**       | `shadow-lg`   | Dialog, Sheet, AlertDialog, DropdownMenuSub        |
| **Geen**        | `shadow-none` | Default/ghost buttons, flat lists, inline surfaces |

**Altijd combineren met:** `border` + surface-token (`bg-card`, `bg-popover`, `bg-background-default`) — shadow vervangt geen border.

### Dark mode

- **Default:** zelfde utility-classes in light en dark (`shadow-md` blijft `shadow-md`).
- Default Tailwind shadows (zwart + alpha) werken op donkere achtergronden; geen aparte `--shadow-*-dark` tokens.
- **Optioneel per theme:** `@theme { --shadow-md: … }` in `.dark` of per named theme als contrast te zwak is — override op schaal-niveau, niet per component-token.

Geen alpha/custom shadow-tokens in Figma Mode exporteren ([Dark mode](./dark-mode.md), [Figma Tailwind-tokens](./figma-tailwind-tokens.md)).

### Scheiding elevation / ring / border

| Mechanisme | Doel                                 | Waar                                                       |
| ---------- | ------------------------------------ | ---------------------------------------------------------- |
| `border-*` | Scheiding vlakken, control-omlijning | Theme: `--border-default`, … ([Borders](./borders.md))     |
| `shadow-*` | Diepte / zwevend                     | Utility; geen theme token                                  |
| `ring-*`   | Keyboard focus                       | Theme: `--ring-default`, … ([Focus ring](./focus-ring.md)) |

Focus ring en elevation zijn **orthogonaal** — een dialog kan `shadow-lg` hebben; focus binnenin gebruikt `ring-default`.

### Code-contract (gewenste staat)

**Card:**

```
border border-default bg-background-card text-foreground-card shadow-sm
```

**Outline button:**

```
border border-input bg-background-default shadow-xs
hover:bg-background-item-hover
```

**Popover / dropdown content:**

```
border border-default bg-background-popover text-foreground-popover shadow-md
```

**Dialog / sheet:**

```
border border-default bg-background-default shadow-lg
```

Shadow-opacity modifiers (`shadow-md/50`) zijn toegestaan als utility maar **niet** standaard op stock components.

### Figma-richtlijn

| Element        | Figma effect                                           |
| -------------- | ------------------------------------------------------ |
| Outline button | Drop shadow ≈ `shadow-xs`; border uit `--border-input` |
| Card           | Drop shadow ≈ `shadow-sm` + border                     |
| Popover        | Drop shadow ≈ `shadow-md`                              |
| Dialog         | Drop shadow ≈ `shadow-lg`                              |

Bind **kleur** aan Mode → base (`background`, `popover`, …). Bind **shadow** aan Tailwind CSS-collectie (box-shadow variabelen) of handmatig effect dat matcht met utility-tabel — niet als Theme semantic token.

## Rationale

1. **shadcn-pariteit** — geen `--shadow` in theme; componenten gebruiken Tailwind classes.
2. **Consistent met Optie C** ([Figma Tailwind-tokens](./figma-tailwind-tokens.md)) — utilities in Foundation, semantic kleur in Themes.
3. **Geen token-proliferatie** — één schaal, conventies i.p.v. `--shadow-{component}`.
4. **Dark mode eenvoud** — geen parallel elevation-token-set; optionele `@theme`-override op schaal.
5. **Scheiding van ring** — elevation ≠ focus; aparte besluiten, geen `--ring` voor diepte.

## Gevolgen

- **token-library.jsx:** `FOUNDATION_TOKENS` → sectie **Shadow**; `TAILWIND_UTILITY_CATEGORIES`; `UTILITY_USAGE`; elevation-banner; `--custom-*` gefilterd bij export
- **Themes:** geen nieuwe shadow/elevation tokens in `THEME_BASE`.
- **Figma:** geen wijziging in Theme-collectie; designers gebruiken Tailwind CSS shadow-variabelen of handmatige effects.
- **Code:** component classes volgen elevation-conventies; optioneel `@theme { --shadow-* }` per brand theme.
- **Documentatie:** [figma-tailwind-tokens.md](./figma-tailwind-tokens.md) open vraag afgerond.

## Open vragen

- [ ] `@theme`-override van `--shadow-*` per named theme — wanneer nodig vs default Tailwind-schaal?
- [ ] `inset-shadow-*` utilities — opnemen in Foundation-referentie of pas bij gebruik?
- [ ] Card: `shadow-sm` vs border-only in toekomstige shadcn-updates volgen?

## Gerelateerd

- [Figma Tailwind-tokens](./figma-tailwind-tokens.md) — utility vs theme; Shadow in Foundation
- [Borders](./borders.md) — border + shadow combineren
- [Focus ring](./focus-ring.md) — ring ≠ elevation
- [Dark mode](./dark-mode.md) — geen alpha shadow tokens
- [Token roles](./token-roles.md) — geen `--shadow-{surface}` patroon
- [Disabled state](./disabled-state.md) — `opacity-50` verzwakt shadow mee
- [referentie-shadcn-architectuur.md](../referentie-shadcn-architectuur.md) — collectie 1 Tailwind CSS

## Referenties

```
ELEVATION STACK (gewenste staat)
┌─────────────────────────────────────────┐
│  shadow-md        ← diepte (utility)    │
│  border-default   ← rand (theme token)  │
│  bg-popover       ← surface (theme)     │
├─────────────────────────────────────────┤
│  ring-default     ← focus only (apart)  │
└─────────────────────────────────────────┘

FIGMA                          CODE
┌─────────────────────────┐    ┌─────────────────────────┐
│ 1. Tailwind CSS         │    │ shadow-md               │
│    box-shadow/shadow-md │ →  │ @theme --shadow-md      │
│                         │    │ (geen --shadow-popover) │
│ 2. Theme / background   │ →  │ bg-popover              │
└─────────────────────────┘    └─────────────────────────┘

COMPONENT → SHADOW (shadcn v4)
  outline button     shadow-xs
  card               shadow-sm
  popover, hover     shadow-md
  dialog, sheet      shadow-lg
```
