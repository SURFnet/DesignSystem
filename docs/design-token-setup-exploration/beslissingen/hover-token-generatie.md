# Hover-tokens: vaste opaque tokens, geen auto-generatie

**Status:** Voorgesteld  
**Datum:** 2026-06-17  
**Betrokken:** Design system / token library

## Samenvatting

> `-hover` tokens (`--background-primary-hover`, `--background-secondary-hover`, `--background-item-hover`) zijn **vaste opaque palette-refs per theme/mode** — geen runtime OKLCH-afleiding. OKLCH-auto-generatie blijft voorbehouden aan **foundation kleurschalen** (één bron → code én Figma). Hover via berekening zou dezelfde code/Figma-kloof terugbrengen die we elders juist sluiten.

## Context

De backlog had "OKLCH auto-generatie voor `-hover` tokens": hover-waarden afleiden via een lichtheids-shift (`L − ~0.03`) i.p.v. handmatig per theme. [Hover states](./hover-states.md) suggereerde dit ("Waarden in OKLCH").

Tegelijk is OKLCH-generatie wél aantrekkelijk om **kleurschalen** (`--color-*-50…950`) consistent en snel uit één seed te bouwen.

De vraag: horen die twee bij elkaar?

## Probleem / vraag

1. Genereren we `-hover` tokens automatisch via OKLCH?
2. Hoe verhoudt dat zich tot OKLCH-generatie voor kleurschalen?
3. Wat betekent het voor pariteit tussen shadcn dev library en Figma library?

## Analyse — twee verschillende problemen

| Laag | Output | Leeft in | Divergentie-risico |
| --- | --- | --- | --- |
| **Foundation — kleurschalen** | Statische `--color-*` hex/OKLCH | Code **én** Figma als gewone variabele | Geen — één bron, beide kanten op |
| **Theme — `-hover` tokens** | Afgeleide kleur via math | Alleen code/tooling | **Hoog** — Figma kan geen OKLCH-math op aliased variables |

**Kern:** Figma kan geen lichtheids-shift op een aliased variable berekenen (precies waarom de stock-kit `alpha`/`custom` workarounds heeft — zie [Figma Tailwind-tokens](./figma-tailwind-tokens.md) en [Dark mode](./dark-mode.md)). Een auto-afgeleide hover bestaat dan alleen in code, terwijl Figma een handmatige of "gesnapte" waarde nodig heeft → **dev library ≠ Figma library**.

Dat is dezelfde klasse frictie als de `--accent` / opacity-modifier mismatch die [Hover states](./hover-states.md) en [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md) juist oplossen.

## Overwogen opties

### Optie A — Runtime OKLCH-afleiding voor hover *(afgewezen)*

| Pro | Con |
| --- | --- |
| Minder handmatige tokens per theme | Figma kan math niet repliceren → code/Figma-kloof |
| Perceptueel gelijkmatige shift | Hoge-chroma kleuren vereisen per-hue ΔL |
| | Hover valt buiten bestaande palette-stappen |
| | Strijdig met opaque-palette-ref model |

### Optie B — Vaste opaque palette-ref per theme/mode *(gekozen)*

Elke `-hover` is een expliciete `{ ref: "--color-*" }`, identiek in code en Figma Mode → base.

| Pro | Con |
| --- | --- |
| Eén waarheid in code én Figma | Handmatig per theme zetten |
| Opaque, geen alpha/math | — |
| Contrast direct testbaar in Contrast-tab | |
| Consistent met borders, dark mode, item-hover | |

## Beslissing

**Optie B — `-hover` tokens zijn vaste opaque palette-refs; geen auto-generatie.**

- `--background-primary-hover`, `--background-secondary-hover`, `--background-item-hover`: handmatige `{ ref: "--color-*" }` per theme/mode.
- Richtlijn (niet berekend): emphasis-hover = één palette-stap donkerder (light) / lichter (dark) dan de base; item-hover = neutrale stap die **≠ `--background-subtle`** is ([Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md)).
- **OKLCH-generatie blijft toegestaan voor foundation kleurschalen** — los onderwerp, geen divergentie.

### Niet doen

- Runtime OKLCH L-shift voor hover in code
- Alpha-modifiers (`/90`) als hover-strategie
- Hover-waarden die alleen in code bestaan en niet in Figma

## Rationale

1. **Geen nieuwe code/Figma-kloof** — hetzelfde principe als de migratie weg van `--accent`/alpha.
2. **Opaque palette-ref overal** — consistent met [Borders](./borders.md), [Dark mode](./dark-mode.md).
3. **Determinisme** — designer en developer zien identieke ref; contrast per state testbaar.
4. **Scheiding van zorgen** — schaal-generatie versnelt foundation; hover blijft expliciete designkeuze.

## Gevolgen

- **token-library.jsx:** `-hover` tokens blijven `{ ref }` in `THEME_BASE` / `DARK_OVERRIDES` / `THEME_OVERRIDES`; geen derive-laag.
- **Figma:** hover-tokens als Theme Mode → base variabelen met expliciete waarde.
- **Code:** geen OKLCH-helper voor hover-afleiding.
- **Docs:** [Hover states](./hover-states.md) "OKLCH richting" wordt richtlijn voor handmatige keuze, geen berekening.

## Open vragen

- [ ] OKLCH-schaal-generator voor onvolledige brand-paletten (bijv. Studielink 3-staps blauw) — apart backlog-item?

## Gerelateerd

- [Hover states](./hover-states.md) — twee hover-tracks
- [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md) — item-hover ≠ subtle
- [Dark mode](./dark-mode.md) — opaque palette-ref, geen alpha
- [Borders](./borders.md) — opaque ref-model
- [Figma Tailwind-tokens in token library](./figma-tailwind-tokens.md) — waarom alpha/custom niet exporteren
