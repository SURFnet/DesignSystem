# `--muted` token

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien)  
**Betrokken:** Design system / token library

## Samenvatting

> **`--muted` en `--muted-foreground` worden hernoemd** naar `--background-subtle` en `--foreground-subtle`. Geen parallelle shadcn-namen. `--background-item-hover` ≠ subtle. Disabled hoort bij [Disabled state](./disabled-state.md).

## Context

Onze oorspronkelijke `TOKEN_USAGE` vermengde **disabled states** met **subtiele vlakken**. shadcn gebruikt `--muted` alleen voor het laatste; disabled gaat via opacity ([Disabled state](./disabled-state.md)).

[Token roles](./token-roles.md) kiest **`subtle`** als emphasis-laag — duidelijker dan `--muted` (shadcn mixt achtergrond én “muted foreground on any surface”).

## Hoe shadcn `--muted` gebruikt (huidige staat)

**`--muted` (achtergrond):** TabsList, skeleton, avatar fallback, muted badges — niet-interactieve inset-vlakken.

**`--muted-foreground`:** secundaire tekst op elke achtergrond (descriptions, placeholders, hints) — typisch op `--background` / `--card`.

**Niet `--muted`:** disabled controls → `disabled:opacity-50` ([Disabled state](./disabled-state.md)).

## Overwogen opties

| Optie | Beschrijving | Status |
| --- | --- | --- |
| A | shadcn-namen behouden | Afgewezen |
| B | Hernoemen naar `--background-subtle` / `--foreground-subtle` | **Gekozen** |
| C/D | Extra disabled surface / `--muted` schrappen | Afgewezen |

## Beslissing

**Optie B** — direct hernoemen, geen alias-laag.

| Huidig | Gewenst | Doel |
| --- | --- | --- |
| `--muted` | `--background-subtle` | Achtergrond voor subtiele, niet-interactieve inset-vlakken |
| `--muted-foreground` | `--foreground-subtle` | Secundaire tekst/iconen op **default én card** |
| `--accent` | `--background-item-hover` | Interactieve hover — **niet** subtle ([Hover states](./hover-states.md)) |
| — | Disabled | Geen token — opacity ([Disabled state](./disabled-state.md)) |

### Contrast

- `--foreground-subtle` × `--background-default` **en** `--background-card` (4.5:1)
- Op `--background-subtle`: `--foreground-default` en `--foreground-subtle` × `--background-subtle`

## Rationale

Scheidt **emphasis** (`subtle` surfaces + secondary text) van **interaction states** (`--background-item-hover`, disabled). Rol-first namen; één naamensysteem na migratie.

## Gevolgen

- **Tokens:** `--muted` / `--muted-foreground` vervangen in `THEME_BASE`, Figma, `globals.css`
- **token-library.jsx:** `TOKEN_USAGE` op gewenste namen
- **Figma:** Theme-variabelen hernoemen
- **Migratie:** [Token-migratie](./token-migratie.md)

## Open vragen

- [x] Secondary vs item-hover vs subtle visueel differentiëren per theme? → [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md)

## Gerelateerd

- [Token roles](./token-roles.md) — `--background-subtle`, `--foreground-subtle`
- [Token-migratie](./token-migratie.md) — huidig → gewenst
- [Disabled state](./disabled-state.md) — disabled ≠ subtle
- [Hover states](./hover-states.md) — item-hover ≠ subtle
- [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md) — collision opgelost
