# Token roles (role-first kleurtokens)

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien)  
**Betrokken:** Design system / token library / Figma

## Samenvatting

> **Parallelle namen per surface:** `--background-default` + `--foreground-default`, `--background-card` + `--foreground-card`. Emphasis-laag: `default` / `subtle`. Patroon: `--{rol}-{surface}[-{qualifier}]`. Geen `-on-` grammatica. Dit is de **gewenste staat** — zie [Token-migratie](./token-migratie.md) voor huidig → gewenst.

## Context

shadcn mixt rollen (`--destructive` voor bg, text én border). Een eerdere versie van dit besluit gebruikte `--foreground-on-canvas-error` — te zwaar, onintuïtief. Daarna `page` / `muted` — te veel overlap met shadcn `--muted` en onduidelijk wat “page” betekent.

**Voorkeur:** symmetric pairs zoals shadcn, maar met **rol altijd expliciet in de prefix**:

```css
--background-default   /* i.p.v. --background / --background-page */
--foreground-default   /* i.p.v. --foreground / --foreground-page */
--background-subtle    /* i.p.v. --muted / --background-muted */
--foreground-subtle    /* i.p.v. --muted-foreground / --foreground-muted */
--background-card      /* i.p.v. --card */
--foreground-card      /* i.p.v. --card-foreground */
```

Contrast-paren worden triviaal: `--foreground-default` × `--background-default`.

## Drie assen (orthogonaal)

| As | Waarden | Voorbeeld |
| --- | --- | --- |
| **Emphasis** | `default`, `subtle` | body vs inset-vlak (TabsList, skeleton) |
| **Containers** | `card`, `popover`, `alt` | raised / overlay / alt tonal region |
| **Actions** | `primary`, `secondary`, `error` | shadcn button-semantiek behouden |

`default` = root app shell (was `page` / `--background`).  
`subtle` = lichtere emphasis-laag (was `--muted` als achtergrond).  
`foreground-subtle` = secundaire tekst op **default én card** — geen aparte “muted-on-muted” pair-logica.

## Naamgrammatica

### Regels

| Regel | Detail |
| --- | --- |
| Vorm | `--{rol}-{surface}[-{qualifier}]` |
| Rollen | `background`, `foreground`, `border`, `ring` |
| Surfaces / elementen | `default`, `subtle`, `card`, `popover`, `alt`, `primary`, `secondary`, `error`, `item`, `input`, … |
| Qualifiers | `error`, `hover`, `selected`, … |
| Geen `-on-` | ❌ `--foreground-on-default` → ✅ `--foreground-default` |
| Figma = CSS | identieke `--`-naam |

### Surface + rol (kern)

| Background | Foreground | Gebruik |
| --- | --- | --- |
| `--background-default` | `--foreground-default` | App shell, body |
| `--background-subtle` | `--foreground-default` | TabsList, skeleton, avatar fallback *(bg)* |
| `--background-card` | `--foreground-card` | Cards |
| `--background-popover` | `--foreground-popover` | Popovers, dropdown panels |
| — | `--foreground-subtle` | Secundaire tekst op default **en** card |
| `--background-primary` | `--foreground-primary` | Primary button |
| `--background-secondary` | `--foreground-secondary` | Secondary button |
| `--background-error` | `--foreground-error` | Destructive button |
| `--background-alt` | `--foreground-alt` | Alt regio (nav, hero, …) — zie [Alt surfaces](./alt-surfaces.md) |

### Borders & ring (zelfde surface-naam)

| Token | Gebruik |
| --- | --- |
| `--border-default` | Cards, dividers, tables op default |
| `--border-input` | Input, textarea, select, outline button |
| `--border-input-error` | Invalid input stroke |
| `--border-card` | Card rand *(indien afwijkend; anders zelfde waarde als `--border-default`)* |
| `--border-alt` | Divider binnen alt regio |
| `--ring-default` | Keyboard focus |
| `--ring-default-error` | Invalid focus ring |
| `--ring-alt` | Focus op alt tonaliteit |

Offset-kleur voor focus rings = achtergrond-surface (`ring-offset-background-default`, …) — geen apart ring-token. Zie [Focus ring](./focus-ring.md).

### Error op default (invalid / FieldError)

Destructive **button** = `--background-error` + `--foreground-error`.  
Invalid **field** = aparte tokens: elk is de `-error` variant van zijn basis-token (border van de input, ring van focus, tekst op default):

| Token | Gebruik |
| --- | --- |
| `--foreground-default-error` | FieldError, invalid label (tekst op default/card) |
| `--border-input-error` | `aria-invalid` stroke (error-variant van `--border-input`) |
| `--ring-default-error` | Invalid focus (error-variant van `--ring-default`) |

Zie [Invalid / error states](./invalid-error-states.md).

### Item-interaction ([Hover states](./hover-states.md))

| Token | Gebruik |
| --- | --- |
| `--background-item-hover` | Menu / list / ghost hover |
| `--background-item-selected` | Selected nav / row |
| `--foreground-item-selected` | Tekst op selected *(optioneel)* |

Tekst op hover-row blijft meestal `--foreground-default` (of `--foreground-card` op raised surfaces).

### Hover op buttons

| Token | Gebruik |
| --- | --- |
| `--background-primary-hover` | Primary button hover |
| `--background-secondary-hover` | Secondary button hover |

Foreground blijft `--foreground-primary` / `--foreground-secondary`.

## Huidig → gewenst

Volledige checklist: [Token-migratie](./token-migratie.md). Samenvatting:

| Huidig (shadcn) | Gewenst |
| --- | --- |
| `--background` | `--background-default` |
| `--foreground` | `--foreground-default` |
| `--card` | `--background-card` |
| `--card-foreground` | `--foreground-card` |
| `--popover` | `--background-popover` |
| `--popover-foreground` | `--foreground-popover` |
| `--primary` | `--background-primary` |
| `--primary-foreground` | `--foreground-primary` |
| `--secondary` | `--background-secondary` |
| `--secondary-foreground` | `--foreground-secondary` |
| `--muted` | `--background-subtle` |
| `--muted-foreground` | `--foreground-subtle` |
| `--destructive` | `--background-error` *(+ split invalid tokens)* |
| `--destructive-foreground` | `--foreground-error` |
| `--border` | `--border-default` |
| `--input` | `--border-input` |
| `--ring` | `--ring-default` |
| `--accent` | `--background-item-hover` *(+ `--background-item-selected`)* |
| `--sidebar` | `--background-alt` |
| `--sidebar-foreground` | `--foreground-alt` |
| `--sidebar-border` | `--border-alt` |
| `--sidebar-ring` | `--ring-alt` |
| `--sidebar-accent` | `--background-alt-item-hover` |
| `--background-sidebar` *(vervallen)* | `--background-alt` |
| `--foreground-sidebar` *(vervallen)* | `--foreground-alt` |
| `--border-sidebar` *(vervallen)* | `--border-alt` |
| `--ring-sidebar` *(vervallen)* | `--ring-alt` |
| `text-destructive` | `--foreground-default-error` |
| `aria-invalid:border-*` | `--border-input-error` |

## Voorbeeld `globals.css` (gewenste staat)

```css
--background-default: var(--color-white);
--foreground-default: var(--color-neutral-950);
--background-subtle: var(--color-neutral-100);
--foreground-subtle: var(--color-neutral-500);
--foreground-default-error: var(--color-red-600);
--border-input-error: var(--color-red-500);
--background-error: var(--color-red-500);
--foreground-error: var(--color-zinc-50);
--border-default: var(--color-neutral-200);
--border-input: var(--color-neutral-200);
--ring-default: var(--color-neutral-400);
/* … zie token-migratie.md */
```

## Contrast-paren (afgeleid)

**Regel:** `--foreground-{surface}*` testen tegen `--background-{surface}` (zelfde surface-naam).  
**Regel:** `--border-{surface}*` en `--ring-{surface}*` idem, minimum **3:1**.  
**Uitzondering:** `--foreground-subtle` testen tegen `--background-default` **en** `--background-card` (secundaire tekst overal).

### Tekst (4.5:1)

| Background | Foreground |
| --- | --- |
| `--background-default` | `--foreground-default` |
| `--background-default` | `--foreground-subtle` |
| `--background-default` | `--foreground-default-error` |
| `--background-card` | `--foreground-card` |
| `--background-card` | `--foreground-subtle` |
| `--background-card` | `--foreground-default-error` |
| `--background-popover` | `--foreground-popover` |
| `--background-subtle` | `--foreground-default` |
| `--background-subtle` | `--foreground-subtle` |
| `--background-primary` | `--foreground-primary` |
| `--background-primary-hover` | `--foreground-primary` |
| `--background-secondary` | `--foreground-secondary` |
| `--background-secondary-hover` | `--foreground-secondary` |
| `--background-error` | `--foreground-error` |
| `--background-alt` | `--foreground-alt` |
| `--background-item-selected` | `--foreground-item-selected` |
| `--background-item-selected` | `--foreground-default` |
| `--background-item-hover` | `--foreground-default` |

### Border / ring (3:1)

| Background | Border / ring |
| --- | --- |
| `--background-default` | `--border-default` |
| `--background-default` | `--border-input` |
| `--background-default` | `--border-input-error` |
| `--background-default` | `--ring-default` |
| `--background-default` | `--ring-default-error` |
| `--background-card` | `--border-default` |
| `--background-card` | `--border-input` |
| `--background-alt` | `--border-alt` |
| `--background-alt` | `--ring-alt` |

**Totaal:** ~25 core paren + optionele card/alt varianten.

**Geen paren:** disabled (opacity), chart-1…5.

## Twee lagen

```
Foundation   --color-*
Semantic     --background-default, --foreground-default, …   ← gewenste staat
```

## Impact op eerdere besluiten

| Besluit | Gewenste tokens |
| --- | --- |
| [Borders](./borders.md) | `--border-default`, `--border-input` |
| [Invalid / error states](./invalid-error-states.md) | `--foreground-default-error`, `--border-input-error`, `--ring-default-error` |
| [Hover states](./hover-states.md) | `--background-item-hover`, `--background-primary-hover` |
| [Focus ring](./focus-ring.md) | `--ring-default`, `--ring-default-error`, `--ring-alt` |
| [Alt surfaces](./alt-surfaces.md) | `--background-alt`, … |
| [Dark mode](./dark-mode.md) | `DARK_OVERRIDES`; opaque borders; geen `--custom-*` export |
| [`--muted` token](./muted-token.md) | `--background-subtle`, `--foreground-subtle` |

## Afgewezen naamsvarianten

| Variant | Waarom niet |
| --- | --- |
| `--foreground-on-default` | `-on-` grammatica; parallel `--foreground-default` |
| `--background-page`, `--background-canvas` | `page`/`canvas` geen stabiele UI-term; **`default`** preferred |
| `--background-muted`, `--foreground-muted` | verwarrend met shadcn `--muted`; **`subtle`** = emphasis-laag |
| `--error-text`, `--destructive` multi-use | geen rol in naam / multi-use |

## Open vragen

- [ ] `--border-card` apart of zelfde waarde als `--border-default`?
- [x] Alt item-hover: `--background-alt-item-hover` — zie [Alt surfaces](./alt-surfaces.md)
- [ ] Token-migratie: zie [Token-migratie](./token-migratie.md)

## Gerelateerd

- [Hover states](./hover-states.md)
- [Invalid / error states](./invalid-error-states.md)
- [Borders](./borders.md)
- [`--muted` token](./muted-token.md)
- [Alt surfaces](./alt-surfaces.md)
- [Dark mode](./dark-mode.md)
- [Token-migratie overzicht](./token-migratie.md)

## Referenties

```
PARALLEL PAIRS (gewenste staat)
  --background-default  ↔  --foreground-default
  --background-card     ↔  --foreground-card
  --background-error    ↔  --foreground-error

EMPHASIS
  --background-subtle   (inset surfaces)
  --foreground-subtle   (secondary text on default|card)

STROKE
  --border-default, --border-input, --ring-default
  --border-input-error, --ring-default-error

CONTRAST
  foreground-{surface}  ×  background-{surface}   → 4.5:1
  border-{surface}*     ×  background-{surface}   → 3:1
  foreground-subtle     ×  background-default|card → 4.5:1
```
