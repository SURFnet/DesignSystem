# Design system — beslissingen & suggesties

Dit document is het **overzicht** van architectuur- en designkeuzes voor het SURF design system.

**Startpunt:** shadcn/ui component library + shadcndesign Figma kit (shadcn-default).  
**Proces:** via de token library (`token-library.jsx`) leggen we de **gewenste** staat vast en passen we **parallel** component library én Figma library aan — geen volledige afhankelijkheid meer van de initiële shadcn-setups, wel een op elkaar afgestemde nieuwe waarheid.  
**Uitwerking per besluit:** `[docs/beslissingen/](./beslissingen/)` · **architectuur:** [referentie-shadcn-architectuur.md](./referentie-shadcn-architectuur.md)

---

## Hoe dit werkt

### Statussen


| Status           | Betekenis                                                       |
| ---------------- | --------------------------------------------------------------- |
| **Voorgesteld**  | Richting lijkt goed, nog niet formeel vastgelegd in tokens/code |
| **Geaccepteerd** | Beslissing is actief; tokens, Figma of code volgen dit          |
| **Afgewezen**    | Bewust niet gekozen; rationale staat erbij                      |
| **In onderzoek** | Nog open; opties worden vergeleken                              |
| **Verouderd**    | Vervangen door een latere beslissing                            |


### Nieuwe beslissing toevoegen

1. Kopieer `[beslissingen/TEMPLATE.md](./beslissingen/TEMPLATE.md)` naar `beslissingen/[onderwerp].md` (kebab-case, bijv. `hover-states.md`)
2. Vul het volledige document in
3. Voeg een regel toe aan de [index](#index)
4. Voeg een samenvatting toe onder [Beslissingen](#beslissingen) — met **Frictie**, **Oplossing** en **Reden**

---

## Index


| Onderwerp                                                                         | Status      | Datum      |
| --------------------------------------------------------------------------------- | ----------- | ---------- |
| [Hover states](./beslissingen/hover-states.md)                                    | Voorgesteld | 2026-06-16 |
| [Disabled state](./beslissingen/disabled-state.md)                                | Voorgesteld | 2026-06-16 |
| `[--muted` token](./beslissingen/muted-token.md)                                  | Voorgesteld | 2026-06-16 |
| [Figma Tailwind-tokens in token library](./beslissingen/figma-tailwind-tokens.md) | Voorgesteld | 2026-06-16 |
| [Borders](./beslissingen/borders.md)                                              | Voorgesteld | 2026-06-16 |
| [Invalid / error states](./beslissingen/invalid-error-states.md)                  | Voorgesteld | 2026-06-16 |
| [Token roles](./beslissingen/token-roles.md)                                      | Voorgesteld | 2026-06-16 |
| [Token-migratie overzicht](./beslissingen/token-migratie.md)                      | Voorgesteld | 2026-06-16 |
| [Focus ring](./beslissingen/focus-ring.md)                                        | Voorgesteld | 2026-06-16 |
| [Alt surfaces](./beslissingen/alt-surfaces.md)                                      | Voorgesteld | 2026-06-16 |
| [Dark mode](./beslissingen/dark-mode.md)                                            | Voorgesteld | 2026-06-16 |
| [Elevation / shadow](./beslissingen/elevation-shadow.md)                            | Voorgesteld | 2026-06-16 |
| [Secondary vs subtle vs item-hover](./beslissingen/secondary-subtle-item-hover.md) | Voorgesteld | 2026-06-16 |
| [Hover-tokens: geen auto-generatie](./beslissingen/hover-token-generatie.md)        | Voorgesteld | 2026-06-17 |
| [Inverse surfaces](./beslissingen/inverse-surfaces.md)                              | Verouderd   | 2026-06-16 |


### Backlog

Onderwerpen die nog uitgewerkt worden.


| Onderwerp | Prioriteit | Notities |
| --------- | ---------- | -------- |
| `--border-card` apart of gelijk aan `--border-default` | Medium | Open in token-roles, token-migratie, borders |
| OKLCH schaal-generatie voor brand-paletten | Laag | Foundation-versneller; onvolledige schalen (bijv. Studielink 3-staps blauw). Niet voor hover — zie [Hover-tokens](./beslissingen/hover-token-generatie.md) |
| Success / valid states | Laag | shadcn heeft geen success token — bewust toevoegen? |
| Loading & readonly states | Laag | Naast disabled opacity-regel; spinner, `aria-disabled` |
| Outline button dark hover | Laag | `dark:hover:bg-input/50` → `--background-item-hover` bevestigen |
| `prefers-color-scheme` vs class `.dark` | Laag | Alleen class, of systeem-fallback? |
| Input-group / composite focus | Laag | Ring op wrapper vs inner control |
| Alt surface splits (`-nav` / `-hero`) | Laag | Eén alt palette of later splitsen |
| Per-theme `@theme` shadow overrides | Laag | Wanneer default Tailwind-schaal te zwak in dark/brand |
---

## Beslissingen

### [Hover states](./beslissingen/hover-states.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** shadcn modelleren hover op twee inconsistente manieren: opacity-modifiers op filled buttons (`/80`, `/90`) en `--accent` voor list/menu/ghost-interactie. `--accent` klinkt als branding, maar is in de praktijk een interactie-highlight — hover (grijs) en selected (brand) zitten in één token, terwijl filled-button hover weer een ander patroon is. Figma simuleert dit met alpha-workarounds die niet 1:1 naar CSS exporteren.

**Oplossing:** Twee expliciete tracks. **Emphasis:** `--background-primary-hover`, `--background-secondary-hover` voor filled controls. **Items:** `--accent` vervangen door `--background-item-hover` (neutrale hover) en `--background-item-selected` (brand/actief). `--accent` verdwijnt uit theme. Geen opacity-modifiers als hoofdstrategie; keyboard focus → `--ring-default`.

**Reden:** Rol-first namen; hover en selected visueel scheiden. Item-tokens werken op default, card én popover. Directe migratie — zie [Token-migratie](./beslissingen/token-migratie.md).

**Open:** `--foreground-item-selected` nodig? OKLCH auto-generatie?

---

### [Disabled state](./beslissingen/disabled-state.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** Onduidelijk of disabled een kleur-token verdient (`--disabled`, `--muted`) of een aparte variant per button-type. Eerdere documentatie koppelde disabled ten onrechte aan `--muted`, wat twee verschillende intenties vermengde: afgezwakte interactie vs subtiel niet-interactief vlak.

**Oplossing:** Disabled = `opacity-50` op het hele component + cursor/pointer lock (`pointer-events-none` of `cursor-not-allowed`). Geen theme token. Figma: disabled variant met 50% layer opacity boven default/hover appearance.

**Reden:** shadcn-pariteit — één universele regel voor alle varianten zonder token-proliferatie. Disabled is afzwakking, geen kleurintentie; scheiding van `--muted` (surface) en van hover/selected-tokens (actieve interactiestates).

**Open:** Loading state, readonly inputs, `aria-disabled` op custom elements.

---

### `[--muted` token](./beslissingen/muted-token.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** `--muted` werd gebruikt alsof het disabled states of interactieve hover kon dragen. In shadcn is het bedoeld voor subtiele, **niet-interactieve** vlakken (TabsList, skeleton) en secundaire tekst — een andere semantic dan disabled, hover of selected.

**Oplossing:** `--muted` → `--background-subtle`, `--muted-foreground` → `--foreground-subtle`. Oude namen verdwijnen. `--foreground-subtle` = secundaire tekst op default én card. Item-hover en disabled blijven apart.

**Reden:** Rol-first namen ([Token roles](./beslissingen/token-roles.md)); één naamensysteem na migratie. `subtle` scheidt emphasis van shadcn `--muted`-verwarring.

**Open:** — (collision → [Secondary vs subtle vs item-hover](./secondary-subtle-item-hover.md))

---

### [Figma Tailwind-tokens in token library](./beslissingen/figma-tailwind-tokens.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** De shadcndesign Figma kit bevat ~500 Tailwind-variabelen die niet in de token library stonden, terwijl designers ze wél dagelijks gebruiken. Tegelijk exporteert de Figma-plugin alleen Theme-kleuren naar CSS — niet alles hoort als `--`-variable in code. Mode → alpha/custom zijn Figma-workarounds.

**Oplossing:** Gelaagde documentatie. **Foundation:** Tailwind utility-schalen als referentietabellen. **Themes:** semantic CSS variables — **alleen Mode → base**. **Niet gebruiken:** Mode → alpha/custom (stock-kit legacy); width/height (zelfde schaal als spacing).

**Reden:** Eén opaque kleursysteem; geen parallel alpha/custom in Figma of CSS. Designers migreren bindings naar base — checklist in het besluit.

**Open:** — (elevation → [Elevation / shadow](./beslissingen/elevation-shadow.md))

---

### [Elevation / shadow](./beslissingen/elevation-shadow.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** Onduidelijk of elevation semantic theme tokens verdient (`--shadow-card`, `--elevation-popover`) of Tailwind utilities blijft. Figma Theme-collectie exporteert geen shadows; shadcn gebruikt wél `shadow-xs` t/m `shadow-lg` op cards, popovers en outline buttons — los van kleur-tokens.

**Oplossing:** Elevation = Tailwind shadow utilities in Foundation (referentietabel). Vaste component-conventies: outline button → `shadow-xs`, card → `shadow-sm`, popover → `shadow-md`, dialog → `shadow-lg`. Geen `--shadow-*` in Themes. Optioneel schaal tweaken via `@theme { --shadow-* }`.

**Reden:** shadcn-pariteit; consistent met [Figma Tailwind-tokens](./beslissingen/figma-tailwind-tokens.md) Optie C. Diepte (utility) gescheiden van surface-kleur (token) en focus (ring).

**Open:** Per-theme `@theme` shadow override nodig? `inset-shadow-*` in Foundation?

---

### [Secondary vs subtle vs item-hover](./beslissingen/secondary-subtle-item-hover.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** shadcn-default laat `--muted`, `--secondary` en `--accent` op `neutral-100` vallen. Na migratie naar `--background-subtle`, `--background-secondary` en `--background-item-hover` blijven drie semantics bestaan, maar de default theme had dezelfde swatch — hover op TabsList/inset-vlakken werd onzichtbaar.

**Oplossing:** Function-first: **item-hover moet altijd ≠ subtle** (`neutral-200` light, `neutral-700` dark). Secondary mag in neutraal default theme gelijk blijven aan subtle (shadcn-pariteit); brand themes differentiëren secondary met kleur. Per-theme checklist: hover zichtbaar op default én subtle.

**Reden:** Interactie gaat voor shadcn-collapse; minimale palette-diff; brand themes volgen al het patroon colored secondary + neutral subtle.

**Open:** `--background-alt-item-hover` spiegelen of tunen?

---

### [Hover-tokens: geen auto-generatie](./beslissingen/hover-token-generatie.md)

**Status:** Voorgesteld · **Datum:** 2026-06-17

**Frictie:** Backlog vroeg om OKLCH-auto-generatie van `-hover` tokens (lichtheids-shift i.p.v. handmatig per theme). Maar Figma kan geen OKLCH-math op aliased variables — een afgeleide hover bestaat dan alleen in code, niet in Figma. Dat brengt dezelfde dev-library ≠ Figma-library kloof terug die we elders juist sluiten.

**Oplossing:** `-hover` tokens zijn **vaste opaque palette-refs per theme/mode** — geen runtime afleiding. OKLCH-generatie blijft voorbehouden aan foundation **kleurschalen** (één bron → code én Figma, geen divergentie).

**Reden:** Geen nieuwe code/Figma-kloof; consistent met opaque-palette-ref model ([Borders](./beslissingen/borders.md), [Dark mode](./beslissingen/dark-mode.md)); hover blijft expliciete designkeuze, schaal-generatie versnelt alleen foundation.

**Open:** OKLCH-schaal-generator voor onvolledige brand-paletten — apart backlog-item?

---

### [Focus ring](./beslissingen/focus-ring.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** shadcn gebruikt `--ring` voor keyboard focus, maar ring-breedte, offset en opacity zitten in Tailwind utilities — niet in theme. `--ring-offset` stond als open vraag in meerdere besluiten met inconsistente waarden. Onduidelijk hoe focus zich verhoudt tot hover, invalid en de globale `outline-ring/50` base style.

**Oplossing:** Drie ring-kleurtokens: `--ring-default`, `--ring-default-error`, `--ring-alt`. Altijd `focus-visible` (niet `focus`). Ring-breedte (`ring-2`), opacity (`ring-default/50`) en offset-breedte (`ring-offset-2`) blijven utilities. Offset-kleur = achtergrond-surface (`ring-offset-background-default`, `ring-offset-background-alt`) — geen `--ring-offset` token. Invalid focus via `--ring-default-error` ([Invalid / error states](./beslissingen/invalid-error-states.md)).

**Reden:** shadcn-pariteit met rol-first namen; scheiding kleur (token) vs metriek (utility), consistent met borders en hover. Ring-categorie in tool blijft los van Borders.

**Open:** Input-group focus op wrapper vs control? `ring-1` vs `ring-2` harmoniseren?

---

### [Alt surfaces](./beslissingen/alt-surfaces.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** shadcn `--sidebar-*` is component-specifiek. Eerder koos SURF `inverse`, maar die naam belooft omkering terwijl een theme de sidebar **niet** hoeft te inverteren.

**Oplossing:** Surface **`alt`**: `--background-alt`, `--foreground-alt`, `--border-alt`, `--ring-alt`, plus emphasis- en item-hover tokens. Sidebar, top nav en hero binden aan `alt`-tokens. **`sidebar` en `inverse` vervallen.**

**Reden:** `alt` = tweede tonal zone zonder valse inverse-belofte. Theme beslist of alt contrasteert met default.

**Open:** Eén alt palette per theme, of later splits (`-nav` / `-hero`)?

---

### [Dark mode](./beslissingen/dark-mode.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** Stock Figma kit gebruikt alpha/custom voor shadcn-patronen; onduidelijk wat exporteert naar code.

**Oplossing:** Class `.dark`; **alle theme tokens opaque palette-ref** (inclusief borders). Opacity alleen utilities (disabled, ring). **Figma: alleen Mode → base** — alpha/custom niet binden. **Alt ≠ dark mode.**

**Reden:** Eén mechanisme light/dark; geen achtergrond-opacity; contrast testbaar in token library.

**Open:** `--custom-*` filteren bij CSS-export? `prefers-color-scheme`?

---

### [Borders](./beslissingen/borders.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16 (herzien)

**Frictie:** Onduidelijk hoeveel border-tokens; light vs dark (opaque vs alpha); border op `--background-subtle` (`100`) te zwak met `neutral-200`.

**Oplossing:** `--border-default` + `--border-input`. **Light én dark: opaque palette-ref** (geen alpha). Default light: `neutral-300` (≥3:1 op default én subtle). Contrast-tab test borders op subtle/card/default.

**Reden:** Symmetrisch model; eenvoudige WCAG-checks; geen shadcn dark-alpha mix.

**Open:** Outline dark hover via `--background-item-hover`?

---

### [Invalid / error states](./beslissingen/invalid-error-states.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** Validatiefouten lijken een eigen kleur-token te verdienen (`--invalid`, `--error-border`), terwijl shadcn `--destructive` hergebruikt. Onderscheid met disabled (niet interactief) en destructive buttons (bewuste actie) was onduidelijk. Figma kit heeft geen ingebouwde invalid-variant.

**Oplossing:** Invalid = `aria-invalid` + rol-specifieke tokens: `--border-input-error`, `--ring-default-error`, `--foreground-default-error`. Destructive buttons: `--background-error` / `--foreground-error`. Geen `--invalid`. Oude `--destructive` multi-use verdwijnt.

**Reden:** Invalid blijft interactief; disabled niet. Elke paint-rol eigen token. Directe migratie — zie [Token-migratie](./beslissingen/token-migratie.md).

**Open:** Success state? Form-level errors via Alert?

---

### [Token roles](./beslissingen/token-roles.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** shadcn-tokens zoals `--destructive` hebben geen vaste paint-rol — dezelfde variabele voor achtergrond, tekst en border. Contrast-checks, Figma-pickers en component authoring worden onduidelijk; `-foreground` betekent “tekst op surface”, niet “de error-tekstkleur”.

**Oplossing:** Parallelle tokens per surface: `--background-default` + `--foreground-default`, emphasis `--background-subtle` / `--foreground-subtle`, containers `--background-card` + `--foreground-card`, enz. Patroon `--{rol}-{surface}[-{qualifier}]`. Borders/rings: `--border-default`, `--border-input`. **Gewenste staat** vervangt shadcn-namen overal — geen alias-laag.

**Reden:** Rol altijd expliciet; contrast = zelfde surface-naam. Directe migratie huidig → gewenst ([Token-migratie](./beslissingen/token-migratie.md)).

**Open:** `--border-card` apart of zelfde waarde als `--border-default`?

---

### [Token-migratie overzicht](./beslissingen/token-migratie.md)

**Status:** Voorgesteld · **Datum:** 2026-06-16

**Frictie:** Besluiten over gewenste token-namen staan verspreid; `THEME_BASE`, Figma en contrast tooling gebruiken nog shadcn-default. Geen centraal overzicht van wijzigingen huidig → gewenst.

**Oplossing:** Changelog met actietypes (hernoemen, opsplitsen, toevoegen, verwijderen), tabellen huidig → gewenst, checklist per plek (code, Figma, `@theme`, components). **Geen tussenlaag** — oude shadcn-namen verdwijnen.

**Reden:** Eén referentie voor directe migratie; traceerbaar naar eerdere besluiten.

**Open:** Sidebar naming; `--border-card`; OKLCH hover-generatie.

---

