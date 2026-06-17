# Disabled state

**Status:** Voorgesteld  
**Datum:** 2026-06-16  
**Betrokken:** Design system / token library

## Samenvatting

> Disabled = `opacity-50` op het component + cursor/pointer lock. Geen `--disabled` of andere theme tokens. Figma: disabled variant met 50% layer opacity.

## Context

Disabled is een **interaction state**, geen kleur. In eerdere documentatie stond disabled ten onrechte onder `--muted` (zie [`--muted` token](./muted-token.md)). shadcn behandelt disabled consistent als **opacity + cursor/interaction lock**, zonder aparte theme tokens.

Hover krijgt expliciete tokens ([Hover states](./hover-states.md)); disabled bewust niet — het is een universeel afzwakking-mechanisme over alle varianten heen.

## Probleem / vraag

1. Hoe modelleren we disabled in tokens, Figma en code?
2. Hebben we `--disabled`, `--muted` of variant-specifieke disabled-kleuren nodig?
3. Hoe relateert disabled aan readonly, loading en invalid?

## Analyse — hoe shadcn het doet

**Patroon in componenten (new-york):**

| Component | Disabled styling                                   |
| --------- | -------------------------------------------------- |
| Button    | `disabled:pointer-events-none disabled:opacity-50` |
| Input     | `disabled:cursor-not-allowed disabled:opacity-50`  |
| Switch    | `disabled:cursor-not-allowed disabled:opacity-50`  |

Gemeenschappelijk:

- **`opacity-50`** op het hele element (achtergrond + tekst + icoon tegelijk)
- Geen `bg-muted`, geen `--disabled` variable
- Geen variant-specifieke disabled-kleuren

**Aanvullend gedrag:**

- Buttons: geen pointer events (niet klikbaar, geen hover)
- Inputs/switches: `cursor-not-allowed`

**Wat disabled níet is:**

| State                 | Verschil met disabled                                              |
| --------------------- | ------------------------------------------------------------------ |
| **Readonly**          | Waarde zichtbaar, vaak geen opacity; vol contrast                  |
| **Loading**           | Vaak `disabled` + spinner; opacity kan gelijk blijven              |
| **Invalid / error**   | `--destructive` border/ring; element is wél interactief ([Invalid / error states](./invalid-error-states.md)) |
| **`--muted` surface** | Niet-interactief vlak; geen state op een control                   |

**Toegankelijkheid:**

- Disabled controls zijn **inactive UI** — contrast-eisen zijn hier minder strikt dan voor actieve content.
- Wel: visueel herkenbaar én programmatically disabled (`disabled` attr of `aria-disabled`).

## Overwogen opties

### Optie A — Opacity op component *(shadcn-default, gekozen)*

`disabled:opacity-50` + `pointer-events-none` of `cursor-not-allowed`.

| Pro                                        | Con                                        |
| ------------------------------------------ | ------------------------------------------ |
| Geen extra tokens                          | Contrast moeilijk voorspelbaar per variant |
| Werkt voor alle varianten identiek         | Figma: 50% layer opacity is benadering     |
| Stock shadcn + shadcndesign compatibel     | Hele component wordt afgezwakt             |
| Sluit aan bij muted ≠ disabled (zie muted) |                                            |

### Optie B — Muted surface *(afgewezen)*

`disabled:bg-muted disabled:text-muted-foreground` — shadcn doet dit niet; verwart `--muted`.

### Optie C — Expliciete disabled tokens *(afgewezen)*

`--disabled`, `--disabled-foreground` — te veel tokens, wijkt af van shadcn.

## Beslissing

**Optie A — opacity-model, geen disabled theme tokens.**

**Code (shadcn-conform):**

```tsx
disabled:pointer-events-none disabled:opacity-50   // buttons, icon buttons
disabled:cursor-not-allowed disabled:opacity-50  // inputs, switches, selects
```

**Tokens:** geen `--disabled` in `THEME_BASE`.

**Figma (shadcndesign kit):**

- **Disabled variant** op componenten waar die bestaat
- Default/hover appearance + **50% opacity** op het component
- Geen aparte fill-kleur; geen `--muted` voor disabled buttons

**States-overzicht (interaction):**

| State    | Mechanisme                                         | Theme token? |
| -------- | -------------------------------------------------- | ------------ |
| Default  | Variant-kleuren                                    | Ja           |
| Hover    | Emphasis: `-hover` token; items: `--item-hover`    | Ja           |
| Selected | `--item-selected` (lists, nav)                   | Ja           |
| Active   | Visueel = default                                  | —            |
| Disabled | `opacity-50` + cursor/pointer lock                 | **Nee**      |
| Focus    | `--ring-default` ([Focus ring](./focus-ring.md))   | Ja           |

## Rationale

1. **shadcn-pariteit** — stock components werken zonder theme-aanpassingen.
2. **Eén regel voor alle varianten** — primary, secondary, ghost: zelfde disabled-gedrag.
3. **Geen token-proliferatie** — disabled is afzwakking, geen kleurintentie.
4. **Scheiding van `--muted`** — muted = surface; disabled = state ([`--muted` token](./muted-token.md)).

## Gevolgen

- **Tokens:** geen wijziging in `THEME_BASE`
- **token-library.jsx:** geen `--disabled` entry; disabled is geen CSS variable
- **Figma:** disabled = opacity-variant
- **Contrast-tab:** geen disabled-paren (inactive UI)
- **Code:** geen fork nodig; wel consistent op custom components

## Open vragen

- [ ] Loading state: `disabled` + spinner — opacity 50% behouden?
- [ ] Readonly inputs: aparte styling nodig?
- [ ] `aria-disabled` op custom elements: zelfde opacity-classes?

## Gerelateerd

- [Hover states](./hover-states.md) — hover wél via tokens
- [`--muted` token](./muted-token.md) — muted ≠ disabled
- [Invalid / error states](./invalid-error-states.md) — invalid ≠ disabled; `--destructive` border
- [Focus ring](./focus-ring.md) — disabled krijgt geen focus ring

## Referenties

```
CODE                          FIGMA (shadcndesign)
┌─────────────────────┐       ┌─────────────────────┐
│  variant colors     │       │  default/hover      │
│  @ opacity: 0.5     │  ≈    │  @ layer opacity 50%│
│  + pointer lock     │       │                     │
└─────────────────────┘       └─────────────────────┘
Geen --disabled token.
```
