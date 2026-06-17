# Token-migratie overzicht

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien)  
**Betrokken:** Design system / token library / Figma / code

## Samenvatting

> **Huidige staat** = shadcn/shadcndesign-namen in `THEME_BASE`, Figma en component classes. **Gewenste staat** = rol-first tokens ([Token roles](./token-roles.md)). **Geen tussenlaag:** oude namen verdwijnen; overal tegelijk hernoemen, opsplitsen of toevoegen. Dit document is de checklist voor die wijzigingen.

## Context

`THEME_BASE`, de shadcndesign Figma kit, `globals.css`, Tailwind `@theme` en shadcn component classes gebruiken nog shadcn-default (`--background`, `--muted`, `--accent`, …). Besluiten over rol-first namen staan in [Token roles](./token-roles.md), [Hover states](./hover-states.md), [Borders](./borders.md), [Invalid / error states](./invalid-error-states.md) en [`--muted` token](./muted-token.md).

Dit overzicht bundelt **alle wijzigingen** huidig → gewenst, per actietype en per plek waar je moet aanpassen.

## Migratiestrategie

### Twee lagen (geen shadcn-laag meer)

```
Foundation     --color-neutral-200, --color-red-500, …     (ongewijzigd)
Semantic       --background-default, --border-input, …   ← gewenste staat
```

**Niet doen:**

- Geen compatibility-aliassen (`--background: var(--background-default)`)
- Geen parallelle shadcn- en SURF-namen in `THEME_BASE`
- Geen korte tussennamen (`--item-hover` naast `--background-item-hover`)

**Wel doen:** overal dezelfde gewenste naam — token library, Figma Theme, `globals.css`, `@theme inline`, component classes en `TOKEN_USAGE`.

### Actietypes

| Actie | Betekenis |
| --- | --- |
| **Hernoemen** | Oude token verdwijnt; nieuwe naam overal |
| **Opsplitsen** | Eén oude token → meerdere nieuwe (oude verdwijnt) |
| **Toevoegen** | Nieuw token; bestond niet in huidige `THEME_BASE` |
| **Verwijderen** | Token uit theme; vervangen door utility of andere semantic |
| **Ongewijzigd** | Naam blijft gelijk |
| **Niet migreren** | Figma-only / utility; blijft buiten theme tokens |

### Huidige vs gewenste staat

| Systeem | Huidige staat | Gewenste staat |
| --- | --- | --- |
| `token-library.jsx` → `THEME_BASE` | shadcn-namen | Rol-first namen ([Token roles](./token-roles.md)) |
| `globals.css` / `@theme` | shadcn-default | Alleen gewenste namen |
| shadcndesign Figma Theme | `--background`, `--muted`, … | Zelfde gewenste namen als code |
| `CONTRAST_PAIRS` | shadcn paren | Gewenste paren |
| shadcn components | `bg-background`, `text-muted-foreground`, … | `@theme` + classes naar gewenste tokens |

---

## Waar aanpassen (checklist)

| Plek | Wat |
| --- | --- |
| `token-library.jsx` | `THEME_BASE`, `DARK_OVERRIDES`, `THEME_OVERRIDES`, `TOKEN_USAGE`, `CONTRAST_PAIRS` |
| `globals.css` | Alle `--`-definities; `@theme inline` color/radius mapping |
| Figma Theme (Mode → base) | Variabelen hernoemen/toevoegen; component variants |
| Figma plugin export | Exporteert gewenste namen (geen shadcn fallback) |
| Component library | Classes: `bg-background` → `bg-background-default`, `border-border` → `border-default`, enz. (`border-input` blijft gelijk; alleen var `--input` → `--border-input`) |
| Invalid styling | `aria-invalid:border-destructive` → `border-input-error` (via `@theme`) |
| Error text | `text-destructive` → `text-default-error` / `--foreground-default-error` |
| Hover classes | `hover:bg-accent` → `hover:bg-item-hover` → **`background-item-hover`** |
| Documentatie | Besluiten + usage teksten op gewenste namen |

---

## 1. Hernoemd

Kolom **Huidig** verdwijnt volledig; **Gewenst** wordt de enige naam.

### Surfaces & tekst

| Huidig | Gewenst | Besluit |
| --- | --- | --- |
| `--background` | `--background-default` | [Token roles](./token-roles.md) |
| `--foreground` | `--foreground-default` | [Token roles](./token-roles.md) |
| `--card` | `--background-card` | [Token roles](./token-roles.md) |
| `--card-foreground` | `--foreground-card` | [Token roles](./token-roles.md) |
| `--popover` | `--background-popover` | [Token roles](./token-roles.md) |
| `--popover-foreground` | `--foreground-popover` | [Token roles](./token-roles.md) |
| `--muted` | `--background-subtle` | [`--muted` token](./muted-token.md) |
| `--muted-foreground` | `--foreground-subtle` | [`--muted` token](./muted-token.md) |
| `--sidebar` | `--background-alt` | [Alt surfaces](./alt-surfaces.md) |
| `--sidebar-foreground` | `--foreground-alt` | [Alt surfaces](./alt-surfaces.md) |

### Actions (buttons)

| Huidig | Gewenst | Opmerking |
| --- | --- | --- |
| `--primary` | `--background-primary` | shadcn = button background |
| `--primary-foreground` | `--foreground-primary` | |
| `--secondary` | `--background-secondary` | |
| `--secondary-foreground` | `--foreground-secondary` | |
| `--destructive` | `--background-error` | Alleen filled destructive **button** bg |
| `--destructive-foreground` | `--foreground-error` | Tekst op error button |

### Borders & ring

| Huidig | Gewenst | Besluit |
| --- | --- | --- |
| `--border` | `--border-default` | [Borders](./borders.md) |
| `--input` | `--border-input` | [Borders](./borders.md) |
| `--ring` | `--ring-default` | [Focus ring](./focus-ring.md) |
| `--sidebar-border` | `--border-alt` | [Alt surfaces](./alt-surfaces.md) |
| `--sidebar-ring` | `--ring-alt` | [Focus ring](./focus-ring.md) |

### Alt surface (was sidebar)

| Huidig (shadcn) | Gewenst | Besluit |
| --- | --- | --- |
| `--sidebar-primary` | `--background-alt-emphasis` | [Alt surfaces](./alt-surfaces.md) |
| `--sidebar-primary-foreground` | `--foreground-alt-emphasis` | [Alt surfaces](./alt-surfaces.md) |
| `--sidebar-accent` | `--background-alt-item-hover` | [Alt surfaces](./alt-surfaces.md) |
| `--sidebar-accent-foreground` | `--foreground-alt-item-selected` | [Alt surfaces](./alt-surfaces.md) |

**Vervallen (tussenstap, niet gebruiken):** `--background-sidebar`, `--foreground-sidebar`, `--border-sidebar`, `--ring-sidebar`, `--background-sidebar-*`.

### Tailwind `@theme` (classes)

| Huidig (typisch) | Gewenst |
| --- | --- |
| `bg-background` | `bg-background-default` |
| `text-foreground` | `text-foreground-default` |
| `bg-muted` | `bg-background-subtle` |
| `text-muted-foreground` | `text-foreground-subtle` |
| `border-border` | `border-default` |
| `border-input` | `border-input` *(class gelijk; var `--input` → `--border-input`)* |
| `ring-ring` | `ring-default` |
| `ring-offset-background` | `ring-offset-background-default` |
| `bg-sidebar` | `bg-background-alt` |
| `ring-sidebar-ring` | `ring-alt` |

---

## 2. Opgesplitst

Oude token **verdwijnt**; elk gebruik wijst naar het juiste gewenste token.

### `--destructive` → vier rollen

| Huidig gebruik | Gewenst | Waar |
| --- | --- | --- |
| Button background | `--background-error` | `variant="destructive"` |
| Button text | `--foreground-error` | Destructive button |
| Invalid input border | `--border-input-error` | `aria-invalid` |
| Invalid focus ring | `--ring-default-error` | `aria-invalid` + focus |
| Error label / FieldError | `--foreground-default-error` | Form errors |

Zie [Invalid / error states](./invalid-error-states.md).

### `--accent` → hover + selected

| Huidig gebruik | Gewenst | Waar |
| --- | --- | --- |
| Item / ghost hover | `--background-item-hover` | Menu, list, ghost button |
| Selected nav / row | `--background-item-selected` | Active nav |
| Text on selected | `--foreground-item-selected` | Optioneel |

`--accent` en `--accent-foreground` **verwijderen** uit theme.

Zie [Hover states](./hover-states.md).

---

## 3. Toegevoegd

Nieuw in gewenste `THEME_BASE`; bestonden niet in shadcn-default:

| Gewenst | Gebruik | Besluit |
| --- | --- | --- |
| `--background-primary-hover` | Primary button hover | [Hover states](./hover-states.md) |
| `--background-secondary-hover` | Secondary button hover | [Hover states](./hover-states.md) |
| `--background-item-hover` | List/menu/ghost hover | [Hover states](./hover-states.md) |
| `--background-item-selected` | Selected nav/row | [Hover states](./hover-states.md) |
| `--foreground-item-selected` | Tekst op selected *(optioneel)* | [Hover states](./hover-states.md) |
| `--foreground-default-error` | Error-tekst op default/card | [Invalid / error states](./invalid-error-states.md) |
| `--border-input-error` | Invalid input border | [Invalid / error states](./invalid-error-states.md) |
| `--ring-default-error` | Invalid focus ring | [Invalid / error states](./invalid-error-states.md) |
| `--border-card` | Card border *(alleen indien ≠ default)* | Open |

**Niet toevoegen als theme token:**

| Concept | Implementatie | Besluit |
| --- | --- | --- |
| Disabled | `opacity-50` utility | [Disabled state](./disabled-state.md) |
| Border width | `border`, `border-2` classes | [Borders](./borders.md) |
| Ring opacity | `ring-default/50` utility | [Focus ring](./focus-ring.md) |
| Ring breedte / offset-breedte | `ring-2`, `ring-offset-2` classes | [Focus ring](./focus-ring.md) |
| Ring offset-kleur | `ring-offset-background-default` | [Focus ring](./focus-ring.md) |
| Emphasis hover via `/90` | `--background-*-hover` tokens | [Hover states](./hover-states.md) |
| Elevation / shadow | `shadow-*` utilities (geen `--shadow-*` in theme) | [Elevation / shadow](./elevation-shadow.md) |

---

## 4. Verwijderd uit theme

| Huidig | Reden | Vervanging |
| --- | --- | --- |
| `--accent` | Opgesplitst | `--background-item-hover`, `--background-item-selected` |
| `--accent-foreground` | Opgesplitst | `--foreground-item-selected` / `--foreground-default` |
| `--destructive` (na split) | Multi-use opgelost | Zie §2 |
| `--background`, `--muted`, … (na hernoem) | Hernoemd | Gewenste namen §1 |

---

## 5. Ongewijzigd

| Token | Opmerking |
| --- | --- |
| `--chart-1` … `--chart-5` | Dataviz |
| `--radius`, `--radius-sm` … `--radius-4xl` | Structuur |
| `--font-sans`, `--font-mono` | Foundation typography |

Dark-mode: `--border-default` / `--border-input` zijn opaque palette-ref in `.dark` ([Borders](./borders.md)); overige tokens via palette-ref in `DARK_OVERRIDES`. Volledige strategie: [Dark mode](./dark-mode.md).

---

## 6. Niet migreren (Figma-only / utilities)

| Token / collectie | Reden |
| --- | --- |
| Mode → **alpha** | **Niet gebruiken** — vervangen door opaque tokens in base |
| Mode → **custom** | **Niet gebruiken** — vervangen door semantic tokens in base |
| Width / height (Tailwind CSS collectie) | Zelfde schaal als spacing |
| `--invalid`, `--error-border`, `--disabled` | Bewust afgewezen |
| `--border-subtle`, `--border-strong` | Geen border tiers |

Zie [Figma Tailwind-tokens in token library](./figma-tailwind-tokens.md).

---

## 7. Gewenste `globals.css` (voorbeeld)

Enige semantic laag — geen shadcn-namen:

```css
--background-default: var(--color-white);
--foreground-default: var(--color-neutral-950);
--background-subtle: var(--color-neutral-100);
--foreground-subtle: var(--color-neutral-500);
--background-card: var(--color-white);
--foreground-card: var(--color-neutral-950);
--border-default: var(--color-neutral-200);
--border-input: var(--color-neutral-200);
--ring-default: var(--color-neutral-400);
--background-error: var(--color-red-500);
--foreground-error: var(--color-zinc-50);
--border-input-error: var(--color-red-500);
--ring-default-error: var(--color-red-500);
--foreground-default-error: var(--color-red-600);
--background-item-hover: var(--color-neutral-100);
--background-item-selected: var(--color-neutral-900);
--foreground-item-selected: var(--color-neutral-950);
--background-primary-hover: var(--color-neutral-800); /* vaste opaque ref */
--background-secondary-hover: var(--color-neutral-200); /* vaste opaque ref */
/* … overige gewenste tokens */
```

Volledige tokenlijst: [Token roles](./token-roles.md). Dark block: [Dark mode](./dark-mode.md).

```css
.dark {
  --background-default: var(--color-neutral-950);
  --foreground-default: var(--color-zinc-50);
  --border-default: var(--color-neutral-700);
  --border-input: var(--color-neutral-600);
  /* … DARK_OVERRIDES — palette-ref */
}
```

---

## 8. `THEME_BASE` — huidig vs gewenst

### Huidig (shadcn)

```
Backgrounds:  --background, --card, --popover, --primary, --secondary, --muted, --accent, --destructive
Foregrounds:  --foreground, --card-foreground, …, --muted-foreground, --accent-foreground, --destructive-foreground
Borders:      --border, --input, --ring
Sidebar:      --sidebar, --sidebar-foreground, --sidebar-primary, --sidebar-accent, --sidebar-border, --sidebar-ring
Chart / Radius: ongewijzigd
```

### Gewenst

```
Surfaces:      --background-default, --background-subtle, --background-card, --background-popover, --background-alt
Foregrounds:   --foreground-default, --foreground-subtle, --foreground-card, …
Actions:       --background-primary, --background-primary-hover, --background-secondary, --background-secondary-hover
               --background-error, --foreground-error
Interaction:   --background-item-hover, --background-item-selected, --foreground-item-selected
Borders/ring:  --border-default, --border-input, --border-input-error, --ring-default, --ring-default-error, --ring-alt
Error text:    --foreground-default-error
Alt:       --background-alt, --foreground-alt, --border-alt, --background-alt-emphasis, --background-alt-item-hover, …
Chart / Radius: ongewijzigd
```

### `CONTRAST_PAIRS`

| Actie | Detail |
| --- | --- |
| Hernoemen | Alle `--background` → `--background-default`, enz. |
| Toevoegen | `--foreground-subtle` × `--background-default` **en** `--background-card` |
| Toevoegen | Error-, item- en emphasis-hover paren |
| Verwijderen | Oude shadcn paren (`--muted` × `--muted-foreground` als enige muted-logica) |

---

## 9. Figma

| Actie | Huidig | Gewenst |
| --- | --- | --- |
| Hernoemen | `--background`, `--muted`, … | Zelfde namen als code §1 |
| Toevoegen | — | `--background-item-hover`, `-selected`, `-hover` tokens |
| Opsplitsen | `--destructive` op invalid mockups | `--border-input-error`, `--foreground-default-error` |
| Verwijderen | `--accent` | Vervangen door item-tokens |
| Niet gebruiken | alpha, custom | Herbinden naar Mode → base; niet exporteren |

---

## 10. Default theme — collision secondary / subtle / item-hover

Huidig (light): `--secondary`, `--muted`, `--accent` → allemaal `--color-neutral-100`.

Gewenst: **drie semantics; function-first waarden**

| Gewenst | Semantiek | Default light | Default dark |
| --- | --- | --- | --- |
| `--background-subtle` | Inset, niet-interactief | `neutral-100` | `neutral-800` |
| `--background-secondary` | Secondary button | `neutral-100` *(mag = subtle)* | `neutral-800` |
| `--background-item-hover` | Interactieve hover | `neutral-200` *(≠ subtle)* | `neutral-700` |

Besluit: [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md).

---

## Rationale

1. **Eén naamensysteem** — geen dubbele mental model (shadcn + SURF).
2. **Directe migratie** — checklist huidig → gewenst; geen alias-fase.
3. **Traceerbaar** — elke oude naam heeft één duidelijke bestemming of verdwijnt.
4. **Rol-first** — contrast, Figma en code gebruiken dezelfde tokens.

## Gevolgen

- **Implementatie:** één migratie-batch over alle plekken in § checklist
- **shadcn stock:** component classes en `@theme` moeten mee; geen stille fallback op oude namen
- **Breaking:** projecten die `--background` importeren moeten updaten

## Open vragen

- [ ] `--border-card` apart of zelfde waarde als `--border-default`?
- [x] OKLCH auto-generatie voor `-hover` tokens? → Nee, vaste opaque tokens — zie [Hover-tokens: geen auto-generatie](./hover-token-generatie.md)

## Gerelateerd

- [Token roles](./token-roles.md) — gewenste token architectuur
- [Alt surfaces](./alt-surfaces.md)
- [Dark mode](./dark-mode.md) — `DARK_OVERRIDES`; `--custom-*` niet exporteren
- [Hover states](./hover-states.md)
- [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md)
- [Borders](./borders.md)
- [Focus ring](./focus-ring.md)
- [Invalid / error states](./invalid-error-states.md)
- [`--muted` token](./muted-token.md)
- `token-library.jsx`

## Referenties

```
DIRECTE MIGRATIE (geen tussenlaag)
  HUIDIG              →  GEWENST
  --background        →  --background-default
  --muted             →  --background-subtle
  --muted-foreground  →  --foreground-subtle
  --destructive       →  --background-error (+ split invalid tokens)
  --accent            →  --background-item-hover (+ --background-item-selected)
  (nieuw)             →  --background-primary-hover
```
