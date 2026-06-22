# Focus ring

**Status:** Voorgesteld  
**Datum:** 2026-06-16  
**Betrokken:** Design system / token library

## Samenvatting

> Keyboard focus via `focus-visible` + Tailwind ring utilities. Kleur: `--ring-default`, `--ring-default-error` (invalid), `--ring-alt` (alt regio). Ring-breedte, offset-breedte en opacity zijn **utilities**, geen theme tokens. Offset-kleur = achtergrond-surface waar het element op staat (`ring-offset-background-default`, enz.). Geen `--ring-offset` token.

## Context

Focus rings geven keyboard-gebruikers een zichtbare positie-indicator (WCAG 2.4.7 Focus Visible). shadcn modelleren focus los van hover: pointer hover → `--background-item-hover`; keyboard focus → `--ring`. De token library had ring-tokens al in een aparte **Ring**-categorie; `--ring-offset` stond als open vraag in meerdere besluiten met inconsistente waarden (`0px` light, kleur-ref dark).

Dit besluit sluit aan op [referentie-shadcn-architectuur.md](../referentie-shadcn-architectuur.md): shadcn blijft technische erfenis (Radix, Tailwind, `focus-visible`-patroon); SURF kiest rol-first token-namen en scheidt kleur (theme) van metriek (utility).

## Probleem / vraag

1. Welke ring-kleurtokens horen in `THEME_BASE`?
2. Is `--ring-offset` een theme token?
3. Welk Tailwind-patroon (`focus-visible`, ring-breedte, opacity)?
4. Hoe relateert focus aan hover, disabled en invalid?
5. Waar staat `--ring` in Figma vs code — en wat met custom ring-tokens?

## Analyse — hoe shadcn het doet

**Semantic token (kleur):**

| Token            | Light (default)              | Dark                         | Gebruik                                                  |
| ---------------- | ---------------------------- | ---------------------------- | -------------------------------------------------------- |
| `--ring`         | `neutral-400` / OKLCH ~0.708 | `neutral-500` / OKLCH ~0.556 | Keyboard focus op controls                               |
| `--sidebar-ring` | zelfde patroon               | zelfde patroon               | Focus op alt tonaliteit                                  |
| `--destructive`  | —                            | —                            | Invalid focus ring (SURF split → `--ring-default-error`) |

**Geen `--ring-offset` in shadcn v4 default theme.** Offset werkt via Tailwind:

| Concept        | Implementatie                             | Theme token?             |
| -------------- | ----------------------------------------- | ------------------------ |
| Ring kleur     | `ring-ring` → `--ring`                    | Ja (`--ring`)            |
| Ring breedte   | `ring-2`, `ring-[3px]`                    | Nee (utility)            |
| Ring opacity   | `ring-ring/50`                            | Nee (utility)            |
| Offset breedte | `ring-offset-2`                           | Nee (utility)            |
| Offset kleur   | `ring-offset-background` → `--background` | Nee (hergebruik surface) |

**Component-patroon (typisch new-york):**

```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
ring-offset-background
```

**shadcn v4 base fallback** (globals.css):

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
}
```

Globale `outline-ring/50` vangt focus op elementen zonder expliciete component-classes.

**Invalid:** `aria-invalid:ring-destructive/20` + `dark:aria-invalid:ring-destructive/40` — ring-kleur en opacity via modifier, niet aparte invalid-ring in shadcn-default.

**Belangrijk:** `focus-visible` (niet `focus`) — ring alleen bij keyboard/tab, niet bij muisklik.

## Overwogen opties

### Optie A — shadcn-conform: kleur-tokens + utilities voor metriek _(gekozen)_

Drie ring-kleurtokens; breedte/offset/opacity via Tailwind. Offset-kleur = bestaande background-token.

| Pro                                                 | Con                                         |
| --------------------------------------------------- | ------------------------------------------- |
| shadcn-pariteit                                     | Offset-kleur per context handmatig kiezen   |
| Geen token-proliferatie                             | Designers moeten opacity in Figma simuleren |
| Consistent met borders (kleur token, dikte utility) |                                             |
| Ring-categorie los van Borders in tool              |                                             |

### Optie B — `--ring-offset` als apart theme token _(afgewezen)_

Dedicated token voor de “gap” tussen element en ring.

| Pro                                | Con                                                    |
| ---------------------------------- | ------------------------------------------------------ |
| Eén plek om offset-kleur te themen | Dupliceert `--background-default` semantiek            |
|                                    | shadcn v4 heeft dit niet                               |
|                                    | Verwarrend naast Tailwind `ring-offset-2` (breedte)    |
|                                    | Light `0px` vs dark kleur-ref in tool was inconsistent |

### Optie C — Geen ring-offset; alleen ring zonder gap _(afgewezen)_

Alleen `ring-2 ring-default`, geen `ring-offset-*`.

| Pro            | Con                                                |
| -------------- | -------------------------------------------------- |
| Minder classes | Ring kan visueel samensmelten met border op inputs |
|                | Wijkt af van stock shadcn button/input             |
|                | Minder contrast op filled buttons                  |

### Optie D — `focus` i.p.v. `focus-visible` _(afgewezen)_

Ring ook bij muisklik.

| Pro         | Con                                                 |
| ----------- | --------------------------------------------------- |
| Eenvoudiger | Ring bij elke klik — visuele ruis                   |
|             | shadcn-standaard gebruikt `focus-visible`           |
|             | WCAG best practice: onderscheid pointer vs keyboard |

## Beslissing

**Optie A — rol-first ring-kleurtokens; metriek en opacity via Tailwind utilities; offset-kleur via background-surface.**

### Token-schema (gewenste staat)

```
Ring (THEME_BASE → categorie "Ring"):
  --ring-default              → keyboard focus (neutral-400 light / neutral-500 dark)
  --ring-default-error        → aria-invalid + focus (red-500)
  --ring-alt              → focus op alt tonaliteit

Niet in theme:
  ring-breedte                → ring-2, ring-[3px] (utility)
  ring-opacity                → ring-default/50 (utility)
  offset-breedte              → ring-offset-2, ring-offset-0 (utility)
  offset-kleur                → ring-offset-background-default (hergebruik --background-default)
```

**Offset-kleur per context** (geen apart token):

| Context                | Offset utility (gewenst)         | Token                  |
| ---------------------- | -------------------------------- | ---------------------- |
| App / default controls | `ring-offset-background-default` | `--background-default` |
| Op card                | `ring-offset-background-card`    | `--background-card`    |
| In alt regio           | `ring-offset-background-alt`     | `--background-alt`     |
| Popover/dropdown       | `ring-offset-background-popover` | `--background-popover` |

### Huidig → gewenst

| Huidig (shadcn)                   | Gewenst                          | Gebruik                |
| --------------------------------- | -------------------------------- | ---------------------- |
| `--ring`                          | `--ring-default`                 | Default keyboard focus |
| `--sidebar-ring`                  | `--ring-alt`                     | Alt regio focus        |
| `--destructive` (invalid ring)    | `--ring-default-error`           | `aria-invalid` + focus |
| `ring-ring`                       | `ring-default`                   | Tailwind `@theme`      |
| `ring-offset-background`          | `ring-offset-background-default` | Offset gap-kleur       |
| `--ring-offset` _(tool, foutief)_ | **verwijderen**                  | Geen theme token       |

Zie [Token-migratie](./token-migratie.md).

### Code-contract (gewenste staat)

**Standaard op interactieve controls** (Button, Checkbox, TabsTrigger, …):

```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-default
focus-visible:ring-offset-2
ring-offset-background-default
```

**Form controls** (Input, Textarea, Select) — shadcn gebruikt soms `ring-[3px]`:

```
focus-visible:outline-none
focus-visible:ring-[3px]
focus-visible:ring-default/50
```

Geen `ring-offset` op inputs waar de ring direct op de border zit (shadcn-input patroon).

**Invalid** (blijft [Invalid / error states](./invalid-error-states.md)):

```
aria-invalid:ring-default-error/20
dark:aria-invalid:ring-default-error/40
```

Bij invalid + focus-visible: error-ring classes blijven actief; default ring wordt overschreven.

**Sidebar:**

```
focus-visible:ring-alt
ring-offset-background-alt
```

**Globals.css base layer** (shadcn v4-pariteit):

```css
@layer base {
  * {
    @apply border-default outline-ring-default/50;
  }
}
```

**Principes:**

| Interactie     | Mechanisme                                        | Token                                          |
| -------------- | ------------------------------------------------- | ---------------------------------------------- |
| Pointer hover  | background hover tokens                           | `--background-item-hover`, `-primary-hover`, … |
| Keyboard focus | `focus-visible` + ring utilities                  | `--ring-default`                               |
| Invalid focus  | `aria-invalid` + ring modifier                    | `--ring-default-error`                         |
| Disabled       | geen focus (niet tabbaar / `pointer-events-none`) | — ([Disabled state](./disabled-state.md))      |

Focus en hover zijn **orthogonaal**: een menu-item kan tegelijk `:hover` (grijs vlak) en `:focus-visible` (ring) zijn.

### Component-overzicht (shadcn-conform → gewenst)

| Component / patroon           | Ring token                  | Ring (utility)           | Offset                                             |
| ----------------------------- | --------------------------- | ------------------------ | -------------------------------------------------- |
| Button (alle varianten)       | `ring-default`              | `ring-2`                 | `ring-offset-2` + `ring-offset-background-default` |
| Input, Textarea, Select       | `ring-default/50`           | `ring-[3px]`             | —                                                  |
| Checkbox, Radio, Switch       | `ring-default`              | `ring-2`                 | `ring-offset-2`                                    |
| TabsTrigger, Toggle           | `ring-default`              | `ring-2`                 | `ring-offset-2`                                    |
| DropdownMenuItem, CommandItem | `ring-default`              | `ring-2`                 | contextafhankelijk                                 |
| Nav item (alt)                | `ring-alt`                  | `ring-2`                 | `ring-offset-background-alt`                       |
| Invalid control + focus       | `ring-default-error/20–/40` | `ring-[3px]` of `ring-2` | —                                                  |

### Figma-richtlijn

| Element              | Focus styling                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Button / control     | Stroke of outer glow `--ring-default`; offset visueel ~2px gap in `--background-default` |
| Input focus          | `--ring-default` @ ~50% opacity, 3px spread                                              |
| Invalid + focus      | `--ring-default-error` @ ~20–40% opacity                                                 |
| Control in alt regio | `--ring-alt`                                                                             |

**Figma-only:** `--custom-ring-dark-input-dark*` (Mode → custom) simuleren dark input focus — **niet exporteren** naar developers ([Figma Tailwind-tokens](./figma-tailwind-tokens.md)).

### Contrast

Ring kleur testen tegen achtergrond-surface waar het element op staat — minimaal **3:1** (non-text contrast). Contrast-tab: `--ring-default`, `--ring-default-error`, `--ring-alt` tegen `--background-default`, `--background-card`, `--background-alt`.

## Rationale

1. **shadcn-pariteit** — `focus-visible`, ring utilities en base `outline-ring/50` blijven herkenbaar na token-rename.
2. **Rol-first** — `--ring-default` i.p.v. `--ring`; invalid ring apart ([Token roles](./token-roles.md)).
3. **Geen `--ring-offset` token** — offset-kleur _is_ surface-kleur; geen duplicaat naast `--background-default`.
4. **Scheiding kleur vs metriek** — consistent met borders (kleur token, dikte utility) en hover (token vs opacity utility).
5. **Focus ≠ hover ≠ invalid** — drie orthogonale interacties; elk eigen mechanisme.
6. **Ring-categorie in tool** — semantisch los van Borders ([Borders](./borders.md)); alleen organisatorisch gegroepeerd in contrast-tab.

## Gevolgen

- **Tokens:** `--ring-default`, `--ring-default-error`, `--ring-alt` in `THEME_BASE`; **`--ring-offset` verwijderen**
- **token-library.jsx:** Ring-categorie behouden; `TOKEN_USAGE` op gewenste namen; contrast-paren ongewijzigd
- **Figma:** `--ring` → `--ring-default`, `--sidebar-ring` → `--ring-alt`; geen `--ring-offset` variabele
- **Code:** component focus-classes + `@theme` (`--color-ring-default`, …); `ring-offset-background-default` i.p.v. `ring-offset-background`
- **Globals.css:** `outline-ring-default/50` in base layer

## Open vragen

- [ ] Input-group / composite controls: ring op wrapper vs inner control — shadcn `input-group.tsx` patroon volgen?
- [ ] `ring-1` vs `ring-2` harmoniseren over alle components na migratie?
- [ ] Focus binnen `--background-subtle` vlakken: altijd `ring-offset-background-default` of context-specifiek?

## Gerelateerd

- [Token roles](./token-roles.md) — `--ring-default`, `--ring-default-error`, `--ring-alt`
- [Alt surfaces](./alt-surfaces.md) — `sidebar` als surface-naam vervalt
- [Dark mode](./dark-mode.md) — ring opacity per mode
- [Token-migratie](./token-migratie.md) — `--ring` → `--ring-default`
- [Hover states](./hover-states.md) — focus los van hover
- [Invalid / error states](./invalid-error-states.md) — `--ring-default-error`, invalid + focus
- [Disabled state](./disabled-state.md) — disabled krijgt geen focus ring
- [Borders](./borders.md) — ring staat niet in Borders-categorie
- [Figma Tailwind-tokens](./figma-tailwind-tokens.md) — ring opacity als utility; custom ring Figma-only
- [referentie-shadcn-architectuur.md](../referentie-shadcn-architectuur.md) — shadcn focus-erfenis

## Referenties

```
FOCUS STACK (gewenste staat)
┌─────────────────────────────────────────┐
│  ring-default/50  ← kleur (theme token) │
│  ring-2           ← breedte (utility)   │
│  ring-offset-2    ← gap (utility)     │
│  ring-offset-bg-default ← offset kleur  │
│         (hergebruik background token)   │
├─────────────────────────────────────────┤
│  focus-visible: alleen keyboard         │
│  hover: --background-item-hover (apart) │
│  aria-invalid: --ring-default-error     │
└─────────────────────────────────────────┘

LIGHT / DARK
  --ring-default:     neutral-400  →  neutral-500
  --ring-alt:     neutral-400  →  neutral-600 (theme override)
  --ring-default-error: red-500 (both)
```
