# Invalid / error states

**Status:** Voorgesteld  
**Datum:** 2026-06-16  
**Betrokken:** Design system / token library

## Samenvatting

> Invalid = validation state via `aria-invalid`. Geen `--invalid` token. **Gewenste staat:** aparte rol-tokens — `--border-input-error`, `--ring-default-error`, `--foreground-default-error` (invalid); `--background-error` / `--foreground-error` (destructive button). Huidig shadcn hergebruikt `--destructive` voor alles — zie [Token-migratie](./token-migratie.md).

## Context

Form controls hebben naast default, focus, hover en disabled ook een **invalid** state: de waarde voldoet niet aan validatieregels, maar het veld blijft interactief. Dat verschilt van [Disabled state](./disabled-state.md) (afgezwakt, niet bedoeld om te wijzigen) en van [Borders](./borders.md) (normale rand via `--border-input`).

**Huidige staat:** shadcn hergebruikt `--destructive` voor invalid border, ring én error-tekst. **Gewenste staat:** split per paint-rol ([Token roles](./token-roles.md)).

## Probleem / vraag

1. Hebben we een apart `--invalid-border` of `--error` token nodig?
2. Hoe relateert invalid aan `--destructive` (destructive buttons)?
3. Welke attributen (`aria-invalid`, `data-invalid`) horen bij code vs Figma?
4. Hoe tonen we error-tekst naast de control?
5. Hoe scheiden we invalid van disabled, readonly en alerts?

## Analyse — huidige staat (shadcn)

### Tokens (huidig)

| Token                      | Rol bij invalid                                                             |
| -------------------------- | --------------------------------------------------------------------------- |
| `--destructive`            | Border én ring op invalid controls; kleur van error-tekst                   |
| `--destructive-foreground` | Alleen op **filled** destructive surfaces (buttons), niet op invalid inputs |
| `--input`                  | Default border; wordt overschreven bij `aria-invalid`                       |
| `--ring`                   | Default focus; wordt overschreven bij `aria-invalid` + focus                |

Geen `--invalid`, `--error`, `--error-foreground` of `--success`.

### Code-patroon (form controls)

Gedeeld door Input, Textarea, Select, Checkbox (v4 new-york):

```
aria-invalid:border-destructive
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
```

Default border blijft `border-input`. Alleen wanneer `aria-invalid="true"` (of boolean attribute) schakelt de border naar `--destructive`.

**Field-primitives (v4):**

| Onderdeel             | Attribuut / class                  | Effect                                                   |
| --------------------- | ---------------------------------- | -------------------------------------------------------- |
| Control (input, etc.) | `aria-invalid={!!error}`           | Border + ring → destructive                              |
| `Field`               | `data-invalid`                     | Wrapper; `data-[invalid=true]:text-destructive` op label |
| `FieldError`          | `role="alert"`, `text-destructive` | Error-bericht onder het veld                             |
| `FieldDescription`    | blijft `text-muted-foreground`     | Helper text, geen error-kleur                            |

Forms (React Hook Form, TanStack Form) zetten `aria-invalid` op het control wanneer validatie faalt; `FieldError` toont het bericht.

**Destructive button vs invalid input:**

| Gebruik            | Classes                                            | Token                                              |
| ------------------ | -------------------------------------------------- | -------------------------------------------------- |
| Destructive button | `bg-destructive text-destructive-foreground`       | Achtergrond + tekst                                |
| Invalid input      | `aria-invalid:border-destructive` + ring modifiers | Alleen rand/ring; bg blijft transparent/`input/30` |

Zelfde `--destructive` kleur, andere toepassing — geen conflict.

### Wat invalid níet is

| State                  | Verschil                                                                       |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Disabled**           | `opacity-50`; geen validation feedback ([Disabled state](./disabled-state.md)) |
| **Readonly**           | Geen invalid-styling tenzij expliciet invalid; contrast behouden               |
| **Alert (page-level)** | `destructive` Alert-variant voor systeemfouten; geen form field state          |
| **Success / valid**    | Geen `--success` token in shadcn forms; groen niet standaard                   |

### Figma (shadcndesign kit)

- Theme-collectie: `--destructive` (+ foreground) bestaat; geen `--invalid-border`.
- Input-component: geen invalid variant property (wel disabled).
- Field-component: ruimte voor validation messages; designers kiezen stroke `--destructive` voor invalid mockups.
- Geen automatische koppeling zoals `aria-invalid` in code — handmatig ontwerpen of eigen variant toevoegen in team-library.

## Overwogen opties

### Optie A — `aria-invalid` + `--destructive` _(shadcn-default, gekozen)_

Bestaand token; state via HTML + Tailwind modifiers.

| Pro                                           | Con                                                         |
| --------------------------------------------- | ----------------------------------------------------------- |
| shadcn-pariteit; stock components werken      | Figma ≠ code zonder handmatige invalid frames               |
| Geen extra tokens                             | `--destructive` dekt buttons én errors (semantisch geladen) |
| Toegankelijk (`aria-invalid`, `role="alert"`) | Ring-opacity (`/20`, `/40`) is utility, geen token          |
| Al consistent in v4 registry                  |                                                             |

### Optie B — Aparte error tokens (`--invalid`, `--invalid-foreground`) _(afgewezen)_

| Pro                                    | Con                                           |
| -------------------------------------- | --------------------------------------------- |
| Semantisch scherper dan "destructive"  | shadcn heeft dit niet; plugin export mismatch |
| Invalid visueel los van delete-buttons | Dubbel onderhoud per theme                    |
|                                        | Figma kit zou extra variables vereisen        |

### Optie C — Invalid via border-token override (`--input` → red ref per theme) _(afgewezen)_

Theme wijzigt `--input` bij error.

| Pro              | Con                                     |
| ---------------- | --------------------------------------- |
| Eén border-token | Geen state-aware CSS variable zonder JS |
|                  | Verliest scheiding default vs invalid   |
|                  | Past niet bij shadcn class-model        |

### Optie D — Alleen error-tekst, border ongewijzigd _(afgewezen)_

Rode `FieldError`, normale `--input` border.

| Pro       | Con                                                                   |
| --------- | --------------------------------------------------------------------- |
| Subtieler | shadcn toont wél rode border                                          |
|           | Minder scanbaar; WCAG: kleur alleen is onvoldoende, maar border helpt |

## Beslissing

**Geen `--invalid` token.** Invalid via `aria-invalid` + **rol-specifieke error-tokens** (gewenste staat). Destructive buttons gebruiken `--background-error` / `--foreground-error`.

### Token-schema (gewenste staat)

```
Invalid field:
  --border-input             → default form border
  --border-input-error       → aria-invalid border
  --ring-default             → default focus
  --ring-default-error       → aria-invalid focus ring
  --foreground-default-error → FieldError, invalid label

Destructive button:
  --background-error
  --foreground-error
```

### Huidig → gewenst

| Huidig                           | Gewenst                      | Gebruik                |
| -------------------------------- | ---------------------------- | ---------------------- |
| `--destructive` (invalid border) | `--border-input-error`       | `aria-invalid`         |
| `--destructive` (invalid ring)   | `--ring-default-error`       | `aria-invalid` + focus |
| `text-destructive`               | `--foreground-default-error` | Error-tekst            |
| `--destructive` (button bg)      | `--background-error`         | Destructive button     |
| `--destructive-foreground`       | `--foreground-error`         | Button text            |
| `--input`                        | `--border-input`             | Default border         |
| `--ring`                         | `--ring-default`             | Default focus          |

Zie [Token-migratie](./token-migratie.md).

### Code-contract (gewenste staat)

**Op het control:**

```tsx
aria-invalid={!!error}   // of aria-invalid wanneer true
// + stock classes op Input/Textarea/Select/Checkbox
```

**Op Field (wrapper):**

```tsx
<Field data-invalid={!!error}>
  <FieldLabel>...</FieldLabel>
  <Input aria-invalid={!!error} />
  <FieldError errors={fieldState.error} />
</Field>
```

**Styling (gewenste classes via `@theme`):**

```
aria-invalid:border-input-error
aria-invalid:ring-default-error/20
dark:aria-invalid:ring-default-error/40
```

Ring-opacity blijft Tailwind utility ([Figma Tailwind-tokens](./figma-tailwind-tokens.md)).

**Error-tekst:** `FieldError` met `text-default-error` (`--foreground-default-error`) en `role="alert"`. Geen `--foreground-error` op platte tekst — dat token is voor tekst _op_ `--background-error`.

### Figma-richtlijn (gewenste staat)

| Element                             | Invalid styling                                  |
| ----------------------------------- | ------------------------------------------------ |
| Input / Select / Textarea stroke    | `--border-input-error`                           |
| Checkbox border (unchecked invalid) | `--border-input-error`                           |
| Error message                       | `--foreground-default-error`                     |
| Label                               | Optioneel `--foreground-default-error`           |
| Focus ring (mockup)                 | `--ring-default-error` @ ~20–40% opacity visueel |

Invalid als **component variant** in team-library (`default | invalid | disabled`).

### States-overzicht (gewenste staat)

| State    | Border                    | Ring (focus)                   | Interactief | Token                                        |
| -------- | ------------------------- | ------------------------------ | ----------- | -------------------------------------------- |
| Default  | `--border-input`          | `--ring-default` /50           | Ja          | input + ring                                 |
| Focus    | `--ring-default` (border) | `--ring-default` /50           | Ja          | ring                                         |
| Invalid  | `--border-input-error`    | `--ring-default-error` /20–/40 | Ja          | error tokens                                 |
| Disabled | control @ opacity-50      | —                              | Nee         | geen ([Disabled state](./disabled-state.md)) |

Invalid en focus kunnen tegelijk: `aria-invalid` classes blijven actief; focus-visible ring blijft destructive-tinted.

## Rationale

1. **Geen `--invalid` token** — invalid is een state; kleur per paint-rol.
2. **Rol-first** — border, ring en tekst elk eigen token; geen multi-use `--destructive`.
3. **Toegankelijkheid** — `aria-invalid` + zichtbare border + `role="alert"` op error-tekst.
4. **Scheiding disabled ≠ invalid** — disabled zwakt af; invalid benadrukt terwijl input bruikbaar blijft.
5. **Directe migratie** — shadcn stock classes aanpassen; zie [Token-migratie](./token-migratie.md).

## Gevolgen

- **Tokens:** gewenste namen [Token roles](./token-roles.md): `--foreground-default-error`, `--border-input-error`, `--ring-default-error`, `--background-error`, `--foreground-error`
- **token-library.jsx:** `TOKEN_USAGE` op gewenste namen
- **Contrast-tab:** paren op gewenste tokens na migratie
- **Figma:** `--destructive` op invalid mockups → `--border-input-error`, `--foreground-default-error`
- **Code:** component classes + `@theme` naar gewenste tokens (`border-input-error`, `text-default-error`, …)

## Open vragen

- [ ] Success / valid state (`--success` of groen border)? shadcn standaard niet — bewust buiten scope?
- [ ] Form-level errors (niet veld-specifiek): Alert destructive vs inline summary?
- [ ] Invalid variant toevoegen aan shadcndesign Input in eigen Figma library?

## Gerelateerd

- [Token roles](./token-roles.md) — gewenste error tokens
- [Token-migratie](./token-migratie.md) — `--destructive` split
- [Borders](./borders.md) — default border via `--border-input`; invalid overschrijft
- [Disabled state](./disabled-state.md) — disabled ≠ invalid
- [Figma Tailwind-tokens](./figma-tailwind-tokens.md) — ring opacity als utility
- [Focus ring](./focus-ring.md) — default vs invalid focus; focus vs hover
- shadcn Input docs: [https://ui.shadcn.com/docs/components/input](https://ui.shadcn.com/docs/components/input)
- shadcn Forms: [https://ui.shadcn.com/docs/forms/react-hook-form](https://ui.shadcn.com/docs/forms/react-hook-form)

## Referenties

```
INVALID INPUT (gewenst)              DESTRUCTIVE BUTTON
┌─────────────────────────┐          ┌─────────────────────────┐
│  border: border-input-  │          │  bg: background-error   │
│    error                │          │  text: foreground-error │
│  ring: ring-default-    │          │  (filled surface)       │
│    error/20             │          │  variant="destructive"  │
│  bg: transparent        │          │                         │
│  aria-invalid="true"    │          │                         │
└─────────────────────────┘          └─────────────────────────┘
Aparte tokens per rol.               Aparte button tokens.

FIGMA invalid mockup                 CODE
┌─────────────────────────┐          ┌─────────────────────────┐
│  stroke: border-input-  │    ≈     │  aria-invalid:border-   │
│    error                │          │    input-error            │
│  error text: foreground-│          │  + FieldError             │
│    default-error        │          │                           │
└─────────────────────────┘          └─────────────────────────┘
Geen --invalid token.
```
