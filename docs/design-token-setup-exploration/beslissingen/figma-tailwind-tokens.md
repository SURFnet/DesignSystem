# Figma Tailwind-tokens in token library

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien: alpha/custom niet gebruiken)  
**Betrokken:** Design system / token library

## Samenvatting

> Tailwind CSS utility-schalen uit de shadcndesign Figma kit als **referentie** in Foundation. Semantic theme tokens in Themes — **alleen Mode → base** (light + dark). **Mode → alpha en Mode → custom niet gebruiken** in SURF Figma; stock-kit bindings herbinden naar opaque base-tokens. Width/height niet gedupliceerd (zelfde schaal als spacing).

## Context

De shadcndesign Figma kit bevat ~496 tokens in collectie **1. Tailwind CSS** plus ~80 tokens in **3. Mode** (base, alpha, custom). De stock kit gebruikt alpha/custom om shadcn-patronen na te bootsen (`bg-muted/90`, `dark:bg-input/50`) die Figma niet native kan aliassen.

**SURF gebruikt die workarounds niet.** Alle semantic kleuren — inclusief dark mode en hover — staan als **opaque refs in Mode → base**. Zie [Dark mode](./dark-mode.md), [Hover states](./hover-states.md), [Borders](./borders.md).

## Probleem / vraag

1. Welke Figma-tokens horen in de token library?
2. Moeten Tailwind utility-waarden (spacing, opacity, border-width) als CSS variables worden gemodelleerd?
3. Gebruiken we Mode → alpha en Mode → custom? *(nee — alleen base)*

## Analyse — drie lagen in shadcndesign

| Figma-collectie | shadcn equivalent | Token library tab |
| --- | --- | --- |
| **1. Tailwind CSS** | Tailwind utility classes (`p-4`, `rounded-lg`, `opacity-50`) | Foundation (referentie) |
| **2. Theme** | CSS variables in `globals.css` / `@theme inline` | Foundation + Themes |
| **3. Mode → base** | Semantic utilities (`bg-background-default`) | Themes — **enige Mode-bron** |
| **3. Mode → alpha** | Stock: opacity op aliased colors (`bg-muted/90`) | **Niet gebruiken** — vervangen door hover-tokens in base |
| **3. Mode → custom** | Stock: `dark:` combinaties (`dark:bg-input/50`) | **Niet gebruiken** — vervangen door semantic tokens in base |

De Figma-to-shadcn plugin exporteert primair **Theme-kleuren** naar CSS — niet de volledige Tailwind CSS-collectie als custom properties.

## Overwogen opties

### Optie A — Alles als CSS custom properties

Elke Figma-variable wordt een `--`-token in code en tool.

| Pro | Con |
| --- | --- |
| 1:1 Figma ↔ code mapping | Dupliceert Tailwind; wijkt af van shadcn |
| Eén token-systeem | ~400+ extra variables zonder meerwaarde |
| | Alpha/custom worden parallel systeem (conflict met [Hover states](./hover-states.md)) |

### Optie B — Alleen semantic tokens *(huidige situatie vóór uitbreiding)*

Alleen Theme/Mode-base in tool; Tailwind utilities buiten beschouwing.

| Pro | Con |
| --- | --- |
| Sluit aan bij shadcn export | Designers missen lookup voor spacing/opacity |
| Weinig onderhoud | Figma-kit lijkt incompleet t.o.v. Figma |

### Optie C — Gelaagde documentatie *(gekozen)*

- **CSS variables** → Themes (semantic) + Foundation (typography, breakpoints, containers, radius)
- **Tailwind utilities** → Foundation als referentietabellen (class → waarde)
- **Figma-workarounds (alpha/custom)** → **niet binden**; migreren naar base — zie [Designer checklist](#designer-checklist-figma)

| Pro | Con |
| --- | --- |
| Sluit aan bij shadcn architectuur | Stock kit moet worden omgebonden |
| Designers én developers kunnen opzoeken | Eénmalige migratie alpha/custom → base |
| Geen token-proliferatie in CSS | |

## Beslissing

**Optie C — gelaagde documentatie.**

### Wel in token library

| Categorie | Locatie | Vorm |
| --- | --- | --- |
| Spacing (35) | Foundation → Spacing | Utility referentie (`4` → `16px`, class `p-4`) |
| Min/max-width (14+15) | Foundation → Min/max width | Aliassen naar `--container-*` |
| Border radius (10) | Foundation → Border radius + Themes → Radius | Utility referentie + `--radius-sm` … `--radius-4xl` |
| Border width (9) | Foundation → Border width | Utility referentie |
| Stroke width (12) | Foundation → Stroke width | Utility referentie |
| Opacity (21) | Foundation → Opacity | Utility referentie |
| Box shadow (7) | Foundation → Shadow | Utility referentie — zie [Elevation / shadow](./elevation-shadow.md) |
| Leading (20) | Foundation → Leading | Utility referentie |
| Breakpoints, containers | Foundation | CSS variables (bestaand) |
| Tailwind colors | Colors | CSS variables (bestaand) |
| Mode → base | Themes | CSS variables (bestaand) |

### Niet gebruiken (stock-kit legacy)

| Categorie | Waarom niet | SURF-alternatief |
| --- | --- | --- |
| **Mode → alpha** (~10) | Simuleerde `bg-*/90`-hovers; geen export naar CSS | `--background-*-hover` in **base** (light + dark) |
| **Mode → custom** (~37) | Simuleerde `dark:bg-*/*`; geen export naar CSS | Semantic tokens in **base** dark mode |
| **`--custom-*` tokens** | Parse-artefact uit oude Figma-imports | Verwijderen / niet exporteren |
| **Width / height** (33+33) | Zelfde schaal als Spacing | `w-4` = spacing `4` |

### Designer checklist (Figma)

Bij migratie van stock shadcndesign naar SURF:

1. **Alleen Mode → base binden** — light én dark mode per semantic token.
2. **Loslaten:** alle fills/strokes/borders gebonden aan Mode → alpha of Mode → custom.
3. **Hover/selected:** bind aan `--background-item-hover`, `--background-item-selected`, `--background-primary-hover`, enz. — opaque palette-stappen in base dark.
4. **Borders dark:** bind aan `--border-default` / `--border-input` in base dark — geen semi-transparant wit.
5. **Disabled:** layer opacity 50% op component (geen alpha-variabele).
6. **Focus ring:** `--ring-default` kleur uit base; ring-transparantie is code (`ring-default/50`), niet een Figma alpha-token.
7. **Plugin-export:** alleen base → CSS; alpha/custom verschijnen niet in `globals.css`.

Zie migratietabel in [Dark mode](./dark-mode.md) §3.

## Rationale

1. **shadcn-pariteit** — semantic CSS variables + Tailwind utilities; geen parallel `--spacing-4` systeem.
2. **Alleen Mode → base** — alpha/custom bestaan in stock kit maar horen niet in SURF workflow; geen achtergrond-opacity als kleurstrategie ([Hover states](./hover-states.md), [Dark mode](./dark-mode.md)).
3. **Lookup-waarde** — Foundation-tab voor utility-schalen; Themes-tab voor semantic base-tokens.
4. **Geen duplicatie** — width/height delen spacing-schaal.
5. **Radius-afgeleiden** — `--radius-sm` … `--radius-4xl` horen in Themes.

## Gevolgen

- **token-library.jsx:** `FOUNDATION_TOKENS` uitgebreid met Spacing, Min/max width, Border radius, Border width, Stroke width, Opacity, Leading. Info-banner in Foundation-tab. `THEME_BASE` Radius uitgebreid met `--radius-sm` … `--radius-4xl`.
- **Figma:** herbind componenten naar **Mode → base**; alpha/custom loslaten (checklist hierboven).
- **Code:** geen CSS variables voor spacing/opacity/border-width; geen `--custom-*` export.
- **Documentatie:** alpha/custom = stock-kit legacy, expliciet afgewezen voor SURF.

## Open vragen

- [x] Shadow/elevation — **Foundation utility-referentie**, geen Theme tokens ([Elevation / shadow](./elevation-shadow.md))

## Gerelateerd

- [Elevation / shadow](./elevation-shadow.md) — component-conventies; geen `--shadow-*` in Themes
- [Dark mode](./dark-mode.md) — alleen base; opaque tokens in `.dark`
- [Focus ring](./focus-ring.md) — ring opacity als utility; geen `--ring-offset` token

- [Token roles](./token-roles.md) — gewenste semantic tokens; Theme-tab migreert
- [Token-migratie overzicht](./token-migratie.md) — huidig → gewenst
- [Hover states](./hover-states.md) — hover als opaque tokens, geen alpha-collectie
- [Disabled state](./disabled-state.md) — `opacity-50` utility, geen token
- `token-library.jsx` — `FOUNDATION_TOKENS`, `TAILWIND_UTILITY_CATEGORIES`, `THEME_BASE`
- shadcndesign Variables docs: [https://www.shadcndesign.com/docs/variables](https://www.shadcndesign.com/docs/variables)

## Referenties

```
FIGMA (Tailwind CSS collectie)     CODE (shadcn + Tailwind)
┌─────────────────────────┐        ┌─────────────────────────┐
│  spacing/4  →  16px     │   →    │  p-4, m-4, gap-4, w-4   │
│  opacity/opacity-50     │   →    │  opacity-50             │
│  border-radius/rounded-lg│  →    │  rounded-lg             │
│                         │        │  = var(--radius-lg)     │
└─────────────────────────┘        └─────────────────────────┘
Geen --spacing-4 token.            Wel --radius + afgeleiden.

FIGMA Mode (SURF)                  CODE
┌─────────────────────────┐        ┌─────────────────────────┐
│  base/light  →  tokens  │   →    │  :root / THEME_BASE     │
│  base/dark   →  tokens  │   →    │  .dark / DARK_OVERRIDES │
│  alpha       →  ❌       │        │  (niet gebruiken)       │
│  custom      →  ❌       │        │  (niet gebruiken)       │
└─────────────────────────┘        └─────────────────────────┘

Opacity in code (utilities, geen theme token):
  opacity-50          →  disabled
  ring-default/50     →  focus ring
  ring-default-error/* →  invalid ring
```
