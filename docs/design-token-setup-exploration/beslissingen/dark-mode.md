# Dark mode

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien: borders opaque; alpha/custom niet gebruiken)

**Betrokken:** Design system / token library / Figma

## Samenvatting

> Dark mode = **class-based** `.dark` op `<html>`; **zelfde semantic token-namen** in `:root` en `.dark`, andere waarden. **Alle theme tokens: opaque palette-ref** (inclusief borders — zie [Borders](./borders.md)). Opacity alleen via **utilities** (disabled, ring-zichtbaarheid, invalid ring) — **niet** op achtergrond- of border-tokens. **Figma: alleen Mode → base** (light + dark); alpha/custom **niet gebruiken**. **`alt` ≠ dark mode**.

## Context

Drie werelden moeten aligned blijven:

| Wereld                         | Mechanisme                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Figma** (SURF)               | Collectie **3. Mode → base** alleen (light + dark); alpha/custom **niet binden**                                      |
| **Figma** (stock shadcndesign) | Bevat nog base, alpha, custom — alpha/custom zijn **legacy**, zie [Figma Tailwind-tokens](./figma-tailwind-tokens.md) |
| **Token library**              | `THEME_BASE` + `DARK_OVERRIDES` + `THEME_OVERRIDES.{light,dark}`                                                      |
| **Code** (shadcn)              | `:root` + `.dark` in `globals.css`; ThemeProvider toggelt class                                                       |

Theme overrides bevatten soms `--custom-*` uit oude Figma-imports — dat zijn **geen tokens**; filteren bij export.

## Probleem / vraag

1. Hoe schakelt dark mode technisch?
2. Hoe modelleren we dark-waarden — palette-ref, alpha, of Tailwind `dark:`?
3. Gebruiken we Figma Mode → alpha/custom? _(nee — alleen base)_
4. Hoe relateert dark mode aan **`alt`** surfaces?
5. Hoe genereert de token library `.dark` CSS?

## Analyse — hoe shadcn het doet

**Toggle:** class-based `.dark` op root element (ThemeProvider / `next-themes`).

**CSS-structuur (Tailwind v4):**

```css
@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --border: oklch(0.922 0 0);
  /* … volledige light set … */
}

.dark {
  --background: oklch(0.145 0 0);
  --border: oklch(1 0 0 / 10%); /* alpha, geen palette-ref */
  /* … volledige dark set … */
}
```

**Drie patronen in shadcn-default:**

| Patroon                | Voorbeeld                                                   | Waar                                   |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------- |
| Semantic token switch  | `bg-background`                                             | Waarde wijzigt in `.dark`              |
| Alpha in `.dark` token | `--border: oklch(1 0 0 / 10%)`                              | Borders                                |
| Tailwind modifier      | `dark:bg-input/50`, `dark:aria-invalid:ring-destructive/40` | Waar één token + opacity niet volstaat |

**Figma Mode (stock shadcndesign vs SURF):**

| Subcollectie | In stock kit                       | SURF                                                           |
| ------------ | ---------------------------------- | -------------------------------------------------------------- |
| **base**     | `:root` / `.dark` semantic tokens  | ✅ **Enige bron** — light + dark, opaque refs                  |
| **alpha**    | Simuleerde `bg-muted/90` e.d.      | ❌ **Niet gebruiken** — vervangen door hover-tokens in base    |
| **custom**   | Simuleerde `dark:bg-input/50` e.d. | ❌ **Niet gebruiken** — vervangen door semantic tokens in base |

Zie [Figma Tailwind-tokens](./figma-tailwind-tokens.md) — designer checklist.

## Overwogen opties

### Optie A — Semantic `.dark` overrides + utilities voor randgevallen _(gekozen)_

Eén token-naam per rol; `.dark` overschrijft waarden met **opaque palette-ref**. Geen alpha in theme tokens. Geen `--custom-*` in developer-export. Figma: **alleen Mode → base**.

| Pro                                                 | Con                                                      |
| --------------------------------------------------- | -------------------------------------------------------- |
| shadcn-pariteit (class `.dark`, semantic vars)      | Stock kit moet worden omgebonden (alpha/custom loslaten) |
| Geen token-proliferatie                             |                                                          |
| Consistent met hover, borders, focus-besluiten      |                                                          |
| `bg-background-default` werkt zonder `dark:` prefix |                                                          |

### Optie B — Overal Tailwind `dark:` modifiers _(afgewezen)_

Geen `.dark` token-waarden; alleen `dark:bg-neutral-900`.

| Pro                    | Con                                               |
| ---------------------- | ------------------------------------------------- |
| Expliciet in component | Geen theming via CSS vars; Figma-plugin nutteloos |
|                        | Duplicatie per component                          |
|                        | Wijkt af van shadcn + token library               |

### Optie C — Figma alpha/custom als CSS tokens exporteren _(afgewezen)_

`--custom-accent-dark-input50` in `globals.css`.

| Pro       | Con                                                          |
| --------- | ------------------------------------------------------------ |
| 1:1 Figma | Parallel token-systeem                                       |
|           | Botst met [Hover states](./hover-states.md) (hover = tokens) |
|           | Onderhoudsnightmare                                          |

### Optie D — Overal opaque palette-ref _(onderdeel van gekozen model)_

Alle semantic kleurtokens — inclusief borders en dark surfaces — als `{ ref: "--color-neutral-*" }`. shadcn dark alpha borders en `bg-*/90`-hovers **niet** overnemen.

| Pro                                 | Con                               |
| ----------------------------------- | --------------------------------- |
| Eén `{ ref }`-mechanisme light/dark | Wijkt af van stock shadcn-default |
| Contrast testbaar in token library  |                                   |
| Geen Figma alpha/custom nodig       |                                   |

## Beslissing

**Optie A — class-based `.dark`, semantic overrides, drie waarde-types.**

### 1. Toggle & structuur

```
globals.css
  :root          ← THEME_BASE (light default)
  .dark          ← DARK_OVERRIDES (+ theme dark overrides)
  .theme-{name}  ← named theme light overrides (optioneel)
  .dark.theme-{name}  ← named theme dark overrides
```

- **Class-based** `.dark` op `<html>` — shadcn-default.
- **Zelfde token-namen** in light en dark — geen `--background-default-dark`.
- **Partial overrides:** tokens niet in `.dark` erven van `:root` (CSS custom property inheritance).

### 2. Twee waarde-types in theme tokens

| Type                           | Wanneer                                                    | Vorm                           | Voorbeeld                                  |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------ | ------------------------------------------ |
| **Palette-ref**                | Alle semantic kleurtokens (surfaces, text, borders, rings) | `{ ref: "--color-neutral-*" }` | `--border-default` → `neutral-700` in dark |
| **Utility (geen theme token)** | Opacity-modifiers, disabled, invalid ring                  | Tailwind class                 | `opacity-50`, `ring-default-error/40`      |

**Borders:** opaque ref in light **en** dark — [Borders](./borders.md). Geen `oklch(… / 10%)` op border-tokens (shadcn dark alpha **niet** overnemen).

### 3. Figma ↔ code alignment

**Regel: alleen Mode → base.** Light- en dark-waarden zijn opaque palette-refs — dezelfde token-namen als `:root` / `.dark` in code.

| Figma                             | Code / token library                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Mode → **base** (light)           | `:root` / `THEME_BASE`                                                                                           |
| Mode → **base** (dark)            | `.dark` / `DARK_OVERRIDES`                                                                                       |
| Mode → **alpha**                  | **Niet gebruiken** — was stock-kit workaround voor `bg-*/90`; vervangen door `--background-*-hover` e.d. in base |
| Mode → **custom**                 | **Niet gebruiken** — was stock-kit workaround voor `dark:bg-*/*`; vervangen door semantic tokens in base         |
| `--custom-*` in `THEME_OVERRIDES` | Import-artefact; **niet** in gewenste `globals.css`                                                              |

**Migratie van stock-kit bindings (historisch → SURF base):**

| Stock shadcn / Figma patroon          | SURF (Mode → base)                                         |
| ------------------------------------- | ---------------------------------------------------------- |
| `hover:bg-primary/90`                 | `--background-primary-hover` (light + dark waarde in base) |
| `hover:bg-accent` / alpha hover       | `--background-item-hover`                                  |
| `dark:bg-input/50` (outline hover)    | `--background-item-hover` in dark base                     |
| `dark:border` alpha (`oklch … / 10%`) | `--border-default` → opaque `neutral-700` in dark base     |
| `custom-ring-*`                       | `--ring-default` + `ring-default/50` utility in code       |

Hover in dark: **tokens in base**, geen opacity-modifiers — [Hover states](./hover-states.md).

### 4. Wanneer wél `dark:` prefix in components

**Standaard: niet nodig** — semantic utilities volgen `.dark`:

```tsx
className = 'bg-background-default text-foreground-default border-input';
```

**Wél `dark:` (of state-modifier) wanneer:**

| Geval                                 | Patroon             | Voorbeeld                                                                    |
| ------------------------------------- | ------------------- | ---------------------------------------------------------------------------- |
| Zelfde token, andere opacity per mode | modifier op utility | `aria-invalid:ring-default-error/20 dark:aria-invalid:ring-default-error/40` |
| Geen semantic token (bewust)          | utility-only        | zeldzaam; vermijden                                                          |
| Stock shadcn migreren                 | tijdelijk           | vervangen door SURF tokens                                                   |

**Niet als hoofdstrategie:** `dark:bg-input/50`, `hover:bg-primary/90` — vervangen door `--background-item-hover`, `--background-primary-hover`.

### 5. Dark mode ≠ alt

|            | Dark mode                     | Alt surface                     |
| ---------- | ----------------------------- | ------------------------------- |
| **Wat**    | Globale light/dark switch     | Framing-regio met eigen palette |
| **Tokens** | Zelfde namen, `.dark` waarden | `--background-alt`, …           |

Zie [Alt surfaces](./alt-surfaces.md). Alt tokens hebben **eigen** light én dark waarden in `DARK_OVERRIDES`.

### 6. Token library gedrag

| Feature            | Gedrag                                           |
| ------------------ | ------------------------------------------------ |
| `THEME_BASE`       | Light default (`:root`)                          |
| `DARK_OVERRIDES`   | Partial `.dark` set voor default theme           |
| `THEME_OVERRIDES`  | Per theme: `light` + `dark` override blocks      |
| Mode switcher (UI) | **Display filter** — toont light of dark waarden |
| CSS editor         | Altijd **beide** blocks (`:root` + `.dark`)      |
| Contrast-tab       | Test per actieve mode (light/dark switcher)      |

**Named themes:** dark overrides mergen conceptueel met default `DARK_OVERRIDES` bij implementatie in app; in tool staan ze als override-only blocks.

## Rationale

1. **shadcn-pariteit** — class `.dark`, semantic vars; plugin exporteert Mode → base.
2. **Eén waarheid per token-naam** — geen parallel dark-token namespace.
3. **Geen alpha in theme tokens** — surfaces, borders, hovers: opaque ref; zie [Borders](./borders.md), [Hover states](./hover-states.md).
4. **Figma: alleen base** — alpha/custom uit stock kit niet binden; geen parallel kleursysteem.
5. **Hover/focus/alt blijven orthogonaal** — dark mode verandert waarden, niet het naamensysteem.

## Gevolgen

- **Docs:** dit besluit koppelt Borders, Figma-tokens, Hover, Focus ring, Alt
- **token-library.jsx:** `DARK_OVERRIDES` blijft partial; opaque palette-ref borders; `--custom-*` in imports = niet exporteren naar `globals.css` _(open: filter in `tokensToCss`)_
- **Figma:** componenten en variabelen **herbinden naar Mode → base** (light + dark); alpha/custom loslaten — checklist in [Figma Tailwind-tokens](./figma-tailwind-tokens.md)
- **Code:** ThemeProvider; SURF tokens in beide blocks; migreer stock `dark:bg-input/*` naar semantic tokens
- **Contrast-tab:** check light én dark (bestaand gedrag)

## Open vragen

- [x] `tokensToCss` filteren op `--custom-*` bij export — geïmplementeerd in `token-library.jsx`
- [ ] Outline button: `dark:hover:bg-input/50` definitief → `--background-item-hover`? (zie [Borders](./borders.md))
- [ ] Volledige `.dark` block (shadcn) vs partial overrides (token library) — implementatie merged set nodig in app?
- [ ] `prefers-color-scheme` fallback naast class-toggle?

## Gerelateerd

- [Figma Tailwind-tokens](./figma-tailwind-tokens.md) — alleen Mode → base; alpha/custom niet gebruiken
- [Borders](./borders.md) — opaque borders light én dark
- [Hover states](./hover-states.md) — geen `/90` hover; tokens in `.dark`
- [Focus ring](./focus-ring.md) — ring opacity utilities; `dark:aria-invalid:` modifiers
- [Alt surfaces](./alt-surfaces.md) — orthogonaal aan dark mode
- [Token-migratie](./token-migratie.md) — `DARK_OVERRIDES` checklist
- [referentie-shadcn-architectuur.md](../referentie-shadcn-architectuur.md) — §2.3, §3.1 Mode

## Referenties

```
DRIE WERELDEN
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Figma Mode  │     │ Token lib   │     │ globals.css │
│  base ✅    │ ──► │ THEME_BASE  │ ──► │ :root       │
│  alpha ❌   │     │ DARK_OVERR. │     │ .dark       │
│  custom ❌  │     │ (no custom) │     │ (no custom) │
└─────────────┘     └─────────────┘     └─────────────┘
  alpha/custom = stock-kit legacy; SURF bindt ze niet

WAARDE-TYPES (theme tokens)
  palette-ref     →  { ref: "--color-neutral-*" }  (surfaces, borders, rings, hovers)

WAARDE-TYPES (utilities — geen theme token)
  opacity-50                    →  disabled
  ring-default/50               →  focus ring zichtbaarheid
  ring-default-error/20, /40    →  invalid ring

GEEN opacity op: achtergronden, borders, hover-tokens

ALT vs DARK
  Dark mode     =  global switch (.dark class)
  Alt           =  framing-regio (eigen palette, niet per se inverse)
```
