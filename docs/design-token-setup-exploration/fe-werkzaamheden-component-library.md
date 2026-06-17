# FE-werkzaamheden — shadcn component library (token-migratie)

**Status:** Voorgesteld  
**Datum:** 2026-06-17  
**Betrokken:** Frontend / design system  
**Gerelateerd:** [token-migratie.md](./beslissingen/token-migratie.md) · [token-roles.md](./beslissingen/token-roles.md) · [referentie-shadcn-architectuur.md](./referentie-shadcn-architectuur.md)

## Samenvatting

> Overzicht van het frontend-werk aan de **bestaande shadcn component library** (extern project met `globals.css`, `@theme` en `components/ui/`) wanneer we de [token-migratie](./beslissingen/token-migratie.md) doorvoeren. Per werkzaamheid staat een kant-en-klare prompt om een agent aan de slag te zetten.

## Scope & uitgangspunt

- Deze werkzaamheden gelden voor het **externe component-library project**, niet voor dit repo (dit repo = specificatie/token-tool).
- De migratie is een **directe rename zonder alias-laag**: geen `--background: var(--background-default)`-compat. Alles gaat in **één batch** om, anders breekt de UI.
- Twee lagen blijven: **Foundation** (`--color-*`, ongewijzigd) en **Semantic** (rol-first namen).
- Naamgrammatica: `--{rol}-{surface}[-{qualifier}]`. Tailwind-conventie blijft leidend: de tokennaam ná `--color-` in `@theme inline` ís de utility-suffix.

## Werkzaamheden in één oogopslag

| # | Werk | Aard | Risico |
| --- | --- | --- | --- |
| 1 | `globals.css` — semantic tokens (`:root` / `.dark`) hernoemen, splitsen, toevoegen | Mechanisch, eenmalig | Laag (foutgevoelig bij splits) |
| 2 | `@theme inline` — Tailwind bridge herschrijven | Mechanisch | Laag |
| 3 | `components/ui/*` — class-rewrites | Breed, veel bestanden | Middel |
| 4 | Invalid/error states — `--destructive` opsplitsen | Inhoudelijk, per geval | Hoog |
| 5 | Hover states — opacity-modifiers → hover-tokens | Inhoudelijk | Middel |
| 6 | Visuele regressie-check (light + dark) | Test | Middel |

**Aandachtspunten:**

- **Eén batch:** stap 1–5 tegelijk mergen; een halve migratie geeft kapotte styling.
- **Splits zijn geen find/replace:** `--destructive` (stap 4) en `--accent` (stap 5) vereisen per gebruik de juiste rol-token.
- **shadcn CLI-updates** na de migratie bewust beoordelen — stock-components brengen oude namen terug.
- **Parallel met Figma:** code en Figma implementeren dezelfde spec; namen identiek.

---

## 1. `globals.css` — semantic tokens

Alle shadcn-default custom properties hernoemen naar rol-first namen, splits doorvoeren, nieuwe tokens toevoegen — in `:root` én `.dark`.

- **Hernoemen:** `--background` → `--background-default`, `--foreground` → `--foreground-default`, `--card` → `--background-card`, `--muted` → `--background-subtle`, `--muted-foreground` → `--foreground-subtle`, `--border` → `--border-default`, `--input` → `--border-input`, `--ring` → `--ring-default`, `--primary`/`--secondary` → `--background-primary`/`--background-secondary`, enz.
- **`--sidebar-*` → `--*-alt`:** `--sidebar` → `--background-alt`, `--sidebar-foreground` → `--foreground-alt`, `--sidebar-border` → `--border-alt`, `--sidebar-ring` → `--ring-alt`, `--sidebar-primary` → `--background-alt-emphasis`, `--sidebar-accent` → `--background-alt-item-hover`, enz.
- **Splitsen `--destructive`:** → `--background-error`, `--foreground-error`, `--border-input-error`, `--ring-default-error`, `--foreground-default-error`.
- **Splitsen `--accent`:** → `--background-item-hover` + `--background-item-selected` (+ optioneel `--foreground-item-selected`). `--accent`/`--accent-foreground` verdwijnen.
- **Toevoegen:** `--background-primary-hover`, `--background-secondary-hover`, plus de error- en item-tokens hierboven.
- **Dark:** borders als opaque palette-ref (geen alpha).
- **Ongewijzigd:** `--chart-1…5`, `--radius*`, `--font-*`.

> **Agent-prompt**
>
> ```
> Doel: migreer globals.css van shadcn-default token-namen naar SURF rol-first namen.
> Lees eerst docs/beslissingen/token-migratie.md (§1 Hernoemd, §2 Opgesplitst, §3 Toegevoegd, §7 voorbeeld) en docs/beslissingen/token-roles.md.
>
> Pas in globals.css zowel het :root- als het .dark-blok aan:
> 1. Hernoem alle semantic vars volgens de tabel in token-migratie.md §1
>    (--background → --background-default, --muted → --background-subtle,
>     --input → --border-input, --sidebar* → --*-alt, enz.).
> 2. Vervang --destructive door: --background-error, --foreground-error,
>    --border-input-error, --ring-default-error, --foreground-default-error.
> 3. Vervang --accent/--accent-foreground door: --background-item-hover,
>    --background-item-selected (+ --foreground-item-selected indien gebruikt).
> 4. Voeg toe: --background-primary-hover, --background-secondary-hover.
> 5. Dark-mode borders als opaque palette-ref (geen alpha).
> 6. Laat --chart-*, --radius*, --font-* ongewijzigd.
>
> Géén compatibility-aliassen achterlaten. Géén oude shadcn-namen laten staan.
> Lever een diff op en een lijst van toegevoegde/verwijderde tokens.
> ```

---

## 2. `@theme inline` — Tailwind bridge

De mapping van `--`-variabelen naar Tailwind utilities herschrijven zodat de juiste utility-classes ontstaan (`bg-background-default`, `text-foreground-subtle`, `border-input`, `ring-default`, …). Dit bepaalt welke classes überhaupt bestaan; moet 1:1 sluiten op stap 1.

> **Agent-prompt**
>
> ```
> Doel: herschrijf het @theme inline-blok zodat het mapt op de nieuwe SURF-tokens uit stap 1.
> Lees docs/beslissingen/token-migratie.md §1 (tabel "Tailwind @theme") en §7.
>
> Voor elke semantic var in globals.css een --color-<naam>: var(--<naam>)-regel,
> zodat utilities als bg-background-default, text-foreground-subtle, border-default,
> border-input, ring-default, bg-background-item-hover, bg-background-alt ontstaan.
> Behoud radius-mapping (--radius-sm … --radius-lg) ongewijzigd.
>
> Controleer dat elke utility-class die stap 3 gebruikt, hier bestaat.
> Géén mappings naar verwijderde shadcn-namen (--accent, --destructive, --sidebar*, --muted).
> Lever een diff op.
> ```

---

## 3. `components/ui/*` — class-rewrites

Het meeste handwerk: in elke primitive de Tailwind-classes omzetten. Mechanische renames:

| Huidig | Gewenst |
| --- | --- |
| `bg-background` | `bg-background-default` |
| `text-foreground` | `text-foreground-default` |
| `bg-muted` | `bg-background-subtle` |
| `text-muted-foreground` | `text-foreground-subtle` |
| `border-border` | `border-default` |
| `border-input` | `border-input` *(class gelijk; var veranderde)* |
| `ring-ring` | `ring-default` |
| `bg-sidebar` | `bg-background-alt` |
| `bg-primary` / `bg-secondary` | `bg-background-primary` / `bg-background-secondary` |

> Let op: `hover:bg-accent`, `bg-destructive`, `text-destructive` en `aria-invalid:*` vallen onder **stap 4 en 5** — niet hier blind vervangen.

> **Agent-prompt**
>
> ```
> Doel: hernoem de Tailwind utility-classes in components/ui/* naar de SURF-tokens.
> Lees docs/beslissingen/token-migratie.md §1 ("Waar aanpassen" + tabel "Tailwind @theme").
>
> Voer in alle bestanden onder components/ui/ de mechanische renames door:
>   bg-background → bg-background-default
>   text-foreground → text-foreground-default
>   bg-muted → bg-background-subtle
>   text-muted-foreground → text-foreground-subtle
>   border-border → border-default
>   ring-ring → ring-default
>   bg-sidebar → bg-background-alt (en overige sidebar-* → *-alt)
>   bg-primary/bg-secondary → bg-background-primary/bg-background-secondary
>   (border-input class blijft gelijk)
>
> LAAT STAAN voor stap 4/5 (niet aanraken): hover:bg-accent, bg-destructive,
> text-destructive, aria-invalid:*-destructive, opacity-modifiers op buttons (/80, /90).
>
> Behoud varianten/CVA-structuur en cn()-gebruik. Wijzig geen component-logica.
> Lever per bestand een diff en markeer plekken die naar stap 4/5 doorverwijzen.
> ```

---

## 4. Invalid / error states (`--destructive` opsplitsen)

`--destructive` had meerdere rollen; elk gebruik wijst nu naar het juiste token. Geen find/replace — per geval beoordelen.

| Huidig gebruik | Gewenst |
| --- | --- |
| Destructive button background | `bg-background-error` |
| Destructive button text | `text-foreground-error` |
| Invalid input border (`aria-invalid`) | `border-input-error` |
| Invalid focus ring (`aria-invalid` + focus) | `ring-default-error` |
| Error label / FieldError tekst | `text-default-error` (`--foreground-default-error`) |

> **Agent-prompt**
>
> ```
> Doel: splits het multi-use --destructive op in rol-specifieke error-tokens.
> Lees docs/beslissingen/invalid-error-states.md en token-migratie.md §2.
>
> Beoordeel ELK gebruik van destructive/aria-invalid in components/ui/* en map het:
>   - destructive button-variant background → bg-background-error
>   - destructive button-variant tekst → text-foreground-error
>   - aria-invalid input border → border-input-error
>   - aria-invalid focus ring → ring-default-error
>   - error-tekst (FieldError/label) → text-default-error (--foreground-default-error)
>
> Dit is GEEN zoek-vervang: bepaal per voorkomen de juiste rol. Let op button.tsx,
> input.tsx, textarea.tsx, select.tsx, form/field-componenten.
> Lever per voorkomen: bestand, oude class, nieuwe class, korte motivatie.
> ```

---

## 5. Hover states (opacity-modifiers → hover-tokens)

Filled buttons gebruikten opacity-modifiers (`/90`, `/80`); item/ghost hover gebruikte `--accent`. Vervangen door expliciete tokens.

| Huidig | Gewenst |
| --- | --- |
| `hover:bg-primary/90` (filled primary) | `hover:bg-background-primary-hover` |
| `hover:bg-secondary/80` (filled secondary) | `hover:bg-background-secondary-hover` |
| `hover:bg-accent` (item/ghost/menu) | `hover:bg-background-item-hover` |
| Selected nav/row | `bg-background-item-selected` |

> **Agent-prompt**
>
> ```
> Doel: vervang opacity-gebaseerde en --accent hover door expliciete SURF hover-tokens.
> Lees docs/beslissingen/hover-states.md en token-migratie.md §2 (--accent) + §3 (toegevoegd).
>
> In components/ui/*:
>   - filled primary hover (hover:bg-primary/90 of vergelijkbaar) → hover:bg-background-primary-hover
>   - filled secondary hover (hover:bg-secondary/80 e.d.) → hover:bg-background-secondary-hover
>   - item/ghost/menu hover (hover:bg-accent) → hover:bg-background-item-hover
>   - selected nav/row → bg-background-item-selected (+ text-foreground-item-selected indien nodig)
>
> Disabled blijft opacity-50 (NIET omzetten naar een token).
> Lever per voorkomen: bestand, oude class, nieuwe class.
> ```

---

## 6. Verificatie (visuele regressie)

Na stap 1–5: controleren dat er geen oude namen resteren en de UI in light én dark klopt.

> **Agent-prompt**
>
> ```
> Doel: verifieer de token-migratie in de component library.
> 1. Grep de hele codebase op resterende shadcn-namen die weg moeten:
>    --background(niet -default), --muted, --accent, --destructive, --sidebar,
>    --input(als var), bg-muted, text-muted-foreground, hover:bg-accent,
>    bg-destructive, border-border, ring-ring. Verwacht: 0 hits (m.u.v. --color-* foundation).
> 2. Controleer dat elke utility-class uit components/ui/ een mapping heeft in @theme inline.
> 3. Start de dev build; los build/Tailwind-warnings over onbekende classes op.
> 4. Loop de hoofd-componenten na in light en dark (button incl. destructive, input
>    incl. aria-invalid, card, popover, menu/hover, sidebar/alt) en rapporteer afwijkingen.
> Lever een checklijst met status per item.
> ```

---

## Gevolgen

- **Code:** één migratie-batch over `globals.css`, `@theme inline` en alle `components/ui/*`.
- **Breaking:** projecten die oude shadcn-namen importeren moeten mee.
- **Figma:** parallel dezelfde namen ([token-migratie](./beslissingen/token-migratie.md) §9).

## Open vragen

- [ ] `--border-card` apart of gelijk aan `--border-default`?
- [ ] `--foreground-item-selected` daadwerkelijk nodig in components?

## Gerelateerd

- [Token-migratie overzicht](./beslissingen/token-migratie.md)
- [Token roles](./beslissingen/token-roles.md)
- [Hover states](./beslissingen/hover-states.md)
- [Invalid / error states](./beslissingen/invalid-error-states.md)
- [referentie-shadcn-architectuur.md](./referentie-shadcn-architectuur.md)
