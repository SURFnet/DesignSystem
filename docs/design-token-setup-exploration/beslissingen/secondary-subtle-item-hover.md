# Secondary vs subtle vs item-hover

**Status:** Voorgesteld  
**Datum:** 2026-06-16  
**Betrokken:** Design system / token library

## Samenvatting

> **Function-first:** `--background-item-hover` moet altijd visueel verschillen van `--background-subtle` (hover op inset-vlakken). `--background-secondary` mag in het neutrale default theme gelijk blijven aan `subtle` (shadcn-pariteit); in brand themes krijgt secondary een eigen tint. Drie semantics, twee visuele lagen in default light: `subtle` = `secondary` = `neutral-100`, `item-hover` = `neutral-200`.

## Context

Bij migratie van shadcn-default vallen drie oude tokens op dezelfde waarde:

| Huidig (shadcn) | Gewenst                   | Default light (vóór fix) |
| --------------- | ------------------------- | ------------------------ |
| `--muted`       | `--background-subtle`     | `neutral-100`            |
| `--secondary`   | `--background-secondary`  | `neutral-100`            |
| `--accent`      | `--background-item-hover` | `neutral-100`            |

Semantisch zijn dit drie verschillende rollen ([`--muted` token](./muted-token.md), [Hover states](./hover-states.md), [Token roles](./token-roles.md)). Visueel identiek is acceptabel zolang het geen functionele UI breekt — maar **item-hover op `--background-subtle` is onzichtbaar** als beide `neutral-100` zijn (TabsList, command palette in inset-vlak).

[Token-migratie §10](./token-migratie.md) markeerde dit als open backlog.

## Probleem / vraag

1. Moeten secondary, subtle en item-hover per theme **altijd** drie verschillende palette-stappen zijn?
2. Of is semantische scheiding genoeg als waarden soms gelijk mogen zijn?
3. Welke waarden voor default theme light én dark?

## Analyse — waar collision wél en niet mag

| Pair                             | Zelfde waarde OK?     | Waarom                                                                                                                                  |
| -------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **subtle × secondary**           | Ja (neutraal default) | Verschillende UI: inset-vlak vs filled button — vorm en context scheiden. Brand themes: secondary krijgt kleur, subtle blijft neutraal. |
| **subtle × item-hover**          | **Nee**               | Hover moet zichtbaar zijn op `--background-subtle` én op `--background-default`.                                                        |
| **secondary × item-hover**       | Ja (vaak)             | Ghost hover en secondary-button hover mogen visueel gelijk zijn; semantics blijven apart.                                               |
| **secondary-hover × item-hover** | Ja (default light)    | Beide `neutral-200` — acceptabel.                                                                                                       |

**shadcn-default** laat alle drie op `neutral-100` vallen — dat werkt alleen zolang menu-items niet op muted-vlakken staan. SURF kiest expliciete item-hover voor voorspelbare interactie.

**Dark mode:** named themes (`shadcn-default`, `studielink-aii`, …) hadden item-hover al op `neutral-700` vs subtle/secondary op `neutral-800`. `THEME_BASE` + `DARK_OVERRIDES` volgden dat nog niet consequent.

## Overwogen opties

### Optie A — shadcn-collapse behouden (alle drie `neutral-100`) _(afgewezen)_

| Pro                    | Con                                                            |
| ---------------------- | -------------------------------------------------------------- |
| Exacte shadcn-pariteit | Hover onzichtbaar op subtle surfaces                           |
| Minimale tokens-werk   | Token library contrast-tab misleidend (drie namen, één swatch) |

### Optie B — Altijd drie unieke palette-stappen _(afgewezen)_

Bijv. light: subtle `100`, secondary `150`/`200`, item-hover `200`.

| Pro                      | Con                                                             |
| ------------------------ | --------------------------------------------------------------- |
| Elke token unieke swatch | Kunstmatige tussenstappen; secondary button wijkt af van shadcn |
|                          | Brand themes al gedifferentieerd — regel te rigide              |

### Optie C — Function-first: verplicht item-hover ≠ subtle _(gekozen)_

**Regels:**

1. **`--background-item-hover` ≠ `--background-subtle`** in elke theme/mode — test op beide surfaces in Contrast-tab.
2. **`--background-secondary` = `--background-subtle`** mag in neutraal default theme (light én dark).
3. **Brand themes:** `--background-secondary` krijgt palette-tint; `--background-subtle` blijft neutraal inset-grijs.
4. **`--background-alt-item-hover`** volgt dezelfde regel t.o.v. de alt-surface (niet t.o.v. global subtle).
5. **Dark default:** item-hover één stap lichter dan subtle (`700` vs `800`).

| Pro                                                | Con                                                   |
| -------------------------------------------------- | ----------------------------------------------------- |
| Fix voor hover-op-subtle zonder token-proliferatie | Secondary en subtle delen nog swatch in default theme |
| shadcn-pariteit voor secondary button              | Designers moeten per theme item-hover checken         |
| Consistent met bestaande named-theme overrides     |                                                       |

## Beslissing

**Optie C — function-first differentiation.**

### Default theme waarden (THEME_BASE + DARK_OVERRIDES)

| Token                          | Light         | Dark          | Opmerking                                                                   |
| ------------------------------ | ------------- | ------------- | --------------------------------------------------------------------------- |
| `--background-subtle`          | `neutral-100` | `neutral-800` | Inset, niet-interactief                                                     |
| `--background-secondary`       | `neutral-100` | `neutral-800` | Secondary button; mag = subtle                                              |
| `--background-secondary-hover` | `neutral-200` | `neutral-700` | Emphasis hover                                                              |
| `--background-item-hover`      | `neutral-200` | `neutral-700` | Items/ghost; **≠ subtle**                                                   |
| `--background-alt-item-hover`  | `neutral-100` | `neutral-800` | Op `--background-alt` (`zinc-50` / `neutral-900`) — zichtbaar t.o.v. alt bg |

### Per-theme checklist (Figma + token library)

Bij elke named theme:

- [ ] `--background-item-hover` zichtbaar op `--background-default`
- [ ] `--background-item-hover` zichtbaar op `--background-subtle`
- [ ] `--background-alt-item-hover` zichtbaar op `--background-alt`
- [ ] Brand secondary ≠ neutral subtle (indien secondary gekleurd is)

Light themes met expliciete overrides (`groenvermogen-nkph2`, `studielink-aii`, `shadcn-default`): `--background-item-hover` → `neutral-200` (niet `100`).

### Niet doen

- Item-hover terugzetten naar dezelfde ref als subtle “voor shadcn”
- Secondary en subtle force-merge tot één token — semantics blijven gescheiden
- Alpha-trucs voor hover op semantic tokens ([Dark mode](./dark-mode.md))

## Rationale

1. **Interactie gaat voor pariteit** — onzichtbare hover is een bug, geen stijlkeuze.
2. **Minimale diff** — alleen de ene verplichte scheiding; secondary/subtle mogen gelijk blijven waar shadcn dat ook doet.
3. **Brand themes al correct** — colored secondary + neutral subtle is het gewenste patroon; default theme volgt nu hetzelfde principe voor item-hover.
4. **Testbaar** — Contrast-tab en visuele review op TabsList + dropdown.

## Gevolgen

- **token-library.jsx:** `THEME_BASE` light — `--background-item-hover` → `neutral-200`; `DARK_OVERRIDES` — `--background-item-hover` → `neutral-700`. Light overrides in named themes alignen.
- **Figma:** Theme Mode → base — item-hover waarde per theme controleren; geen alpha Mode.
- **Code:** `hover:bg-item-hover` op components in subtle containers blijft werken na migratie.
- **Migratie:** [Token-migratie §10](./token-migratie.md) afgerond.

## Open vragen

- [ ] `--background-alt-item-hover` altijd global item-hover spiegelen, of apart per theme tunen?
- [x] OKLCH L-shift voor item-hover afleiden van subtle? → Nee, vaste opaque tokens — zie [Hover-tokens: geen auto-generatie](./hover-token-generatie.md)

## Gerelateerd

- [`--muted` token](./muted-token.md) — subtle semantics
- [Hover states](./hover-states.md) — item-hover track
- [Token roles](./token-roles.md) — emphasis vs actions
- [Token-migratie](./token-migratie.md) — §10 collision
- [Alt surfaces](./alt-surfaces.md) — `--background-alt-item-hover`
- [Dark mode](./dark-mode.md) — opaque tokens in `.dark`

## Referenties

```
DEFAULT LIGHT (neutral)
  subtle / secondary     →  neutral-100  (mag gelijk)
  item-hover             →  neutral-200  (verplicht ≠ subtle)

DEFAULT DARK
  subtle / secondary     →  neutral-800
  item-hover             →  neutral-700  (verplicht ≠ subtle)

BRAND THEME (voorbeeld studielink light)
  subtle                 →  neutral-100
  secondary              →  studielink-blue-100
  item-hover             →  neutral-200
```
