# Referentie: shadcn, shadcndesign & SURF token library

**Doel:** Dit document is een herbruikbare context voor AI-chats en teamleden. Het beschrijft het **startpunt** (shadcn component library + shadcndesign Figma kit), het **migratieproces** via de token library, en de **nieuwe doelstaat** waarin code en Figma een eigen, op elkaar afgestemde waarheid vormen.

**Laatst bijgewerkt:** 2026-06-16  
**Gerelateerd:** [beslissingen.md](./beslissingen.md) · [token-migratie.md](./beslissingen/token-migratie.md) · [token-roles.md](./beslissingen/token-roles.md)

---

## 0. Projectverhaal — startpunt, migratie, nieuwe waarheid

### Startpunt

We beginnen **niet from scratch**, maar vanuit twee bestaande shadcn-setups:

| Startpunt                       | Wat het is                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------ |
| **shadcn/ui component library** | Copy-paste React components, `globals.css`, Tailwind v4, shadcn-default tokens |
| **shadcndesign Figma kit**      | Gespiegeld design system: componenten, Pro Blocks, variable collections        |

Die twee zijn oorspronkelijk **los van elkaar synchroon** via shadcn-conventies (zelfde token-namen, plugin-export). Dat is het vertrekpunt — geen einddoel.

### Wat we nu doen (omkatten)

Met de **SURF token library** (`token-library.jsx`) leggen we besluiten vast, modelleren we de **gewenste** token-structuur, en valideren we contrast — als **coordinatie-instrument** tijdens de migratie. De tool is geen shadcn-plugin en geen export-pipeline; het is het werkblad waar de nieuwe waarheid wordt gedefinieerd vóórdat die in code én Figma landt.

```
  STARTPUNT (shadcn-default)                    DOEL (SURF design system)
  ─────────────────────────                    ───────────────────────────
  shadcn components          ──┐
  shadcndesign Figma kit     ──┼──►  token library  ──►  component library (aangepast)
                               │      (besluiten,            +
                               │       tokens, contrast)     Figma library (aangepast)
                               │
                               └── parallel aanpassen, zelfde token-namen
```

### Nieuwe waarheid

De **doelstaat leunt niet meer volledig op de initiële shadcn-setups**. shadcn blijft **technische erfenis** (Radix, Tailwind, componentstructuur, utility-patronen), maar:

- **Token-namen, semantiek en states** volgen SURF-besluiten (rol-first, geen shadcn-default meer)
- **Component library én Figma library** worden **parallel** aangepast — niet “Figma exporteert shadcn”, maar “beide implementeren dezelfde SURF-specificatie”
- **Geen alias-laag** tussen shadcn- en SURF-namen; shadcn-namen verdwijnen overal tegelijk ([token-migratie](./beslissingen/token-migratie.md))
- **Figma-only workarounds** (Mode → alpha/custom) blijven buiten developer-export; SURF-code lost hetzelfde op via Tailwind-patronen

|                    | shadcn (startpunt)                          | SURF (doel)                                          |
| ------------------ | ------------------------------------------- | ---------------------------------------------------- |
| Wie is leidend?    | shadcn docs + plugin export                 | Token library + besluiten → code + Figma volgen      |
| Token-naming       | `--background`, `--accent`, `--destructive` | `--background-default`, `--background-item-hover`, … |
| Figma ↔ code       | Plugin exporteert shadcn Theme              | Handmatig aligned; zelfde `--`-namen in beide        |
| Component gedrag   | Stock shadcn classes                        | Aangepaste classes op gewenste tokens                |
| shadcn CLI updates | Drop-in compatible                          | Bewust beoordeeld; niet blind overschrijven          |

**Kort:** shadcn = fundering. SURF design system = wat we er nu van maken, met code en Figma als **twee implementaties van één specificatie**.

---

## 1. Vier lagen — van erfenis naar gezamenlijke waarheid

```
┌─────────────────────────────────────────────────────────────────────────┐
│              SURF design system (doel — gedeelde specificatie)          │
│   Zelfde token-namen, semantiek en states in code én Figma              │
└─────────────────────────────────────────────────────────────────────────┘
         ▲                                          ▲
         │ implementatie                            │ implementatie
         │                                          │
┌────────┴────────┐                        ┌────────┴────────┐
│  SURF Figma     │                        │  SURF component │
│  library        │                        │  library        │
│  (aangepast)    │                        │  (aangepast)    │
└────────▲────────┘                        └────────▲────────┘
         │                                          │
         └──────────────────┬───────────────────────┘
                            │ definieert & valideert
                   ┌────────┴────────┐
                   │  SURF token     │
                   │  library (tool) │
                   └────────▲────────┘
                            │ vertrekt van
         ┌──────────────────┴──────────────────┐
         │                                     │
┌────────┴────────┐                 ┌─────────┴───────┐
│  shadcndesign   │                 │  shadcn/ui      │
│  Figma kit      │                 │  (startpunt)    │
│  (startpunt)    │                 │                 │
└─────────────────┘                 └─────────────────┘
```

| Laag                       | Rol                                                | Relatie tot shadcn                                                          |
| -------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| **shadcn startpunt**       | Bestaande component + Figma kit                    | Vertrekpunt; conventies en structuur blijven nuttig                         |
| **SURF token library**     | Specificatie, besluiten, contrast, theme authoring | Definieert de **nieuwe** waarheid                                           |
| **SURF component library** | Productie-UI                                       | Implementeert specificatie; geen shadcn-default tokens meer                 |
| **SURF Figma library**     | Design                                             | Implementeert dezelfde specificatie; geen blind vertrouwen op plugin-export |

---

## 2. shadcn/ui — standaard codebase-organisatie

shadcn/ui is **geen npm-package** maar een **copy-paste component registry**. De CLI kopieert broncode naar jouw project. Je bezit de code volledig.

### 2.1 Typische mappenstructuur

```
project-root/
├── components.json          ← CLI-config (aliases, tailwind pad, style)
├── package.json
├── tsconfig.json            ← paths: @/* → ./src/*
├── src/                     ← (optioneel; framework-afhankelijk)
│   ├── app/                 ← Next.js App Router
│   │   └── globals.css      ← THEME: :root, .dark, @theme inline
│   ├── components/
│   │   └── ui/              ← shadcn primitives (Button, Input, …)
│   ├── lib/
│   │   └── utils.ts         ← cn() helper (clsx + tailwind-merge)
│   └── hooks/               ← optioneel (use-mobile, etc.)
```

Framework-specifieke varianten (Vite, Astro, Laravel, …) wijken af in waar `globals.css` en `components/` staan, maar het **concept** blijft gelijk.

### 2.2 `components.json` — centrale CLI-config

| Veld                    | Functie                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `style`                 | Componentstijl (`new-york`; `default` is deprecated)        |
| `tailwind.config`       | Pad naar Tailwind config; **leeg (`""`) bij Tailwind v4**   |
| `tailwind.css`          | Pad naar CSS-bestand met Tailwind import                    |
| `tailwind.baseColor`    | Basispalet bij init (neutral, zinc, stone, …)               |
| `tailwind.cssVariables` | `true` = semantic tokens; `false` = inline Tailwind kleuren |
| `aliases.ui`            | Waar UI-components landen (bijv. `@/components/ui`)         |
| `aliases.utils`         | Waar `cn()` staat (bijv. `@/lib/utils`)                     |
| `aliases.components`    | Algemene components-map                                     |
| `aliases.lib` / `hooks` | Overige hulpcode                                            |

### 2.3 Drie lagen in CSS (Tailwind v4)

shadcn scheidt **foundation**, **semantic tokens** en **utilities**:

```css
@import 'tailwindcss';
@import 'shadcn/tailwind.css';

/* Laag 1 — Semantic tokens (thema-waarden) */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --radius: 0.625rem;
  /* … */
}
.dark {
  --background: oklch(0.145 0 0);
  --border: oklch(1 0 0 / 10%); /* dark borders vaak alpha */
  /* … */
}

/* Laag 2 — Tailwind bridge (@theme inline) */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-lg: var(--radius);
  /* … */
}

/* Laag 3 — Base styles */
@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

**Belangrijk:**

- Semantic tokens leven in `:root` / `.dark` — **niet** in `@layer base`
- `@theme inline` mapt `--`-variabelen naar Tailwind utilities (`bg-background`, `text-primary`)
- **Geen** parallel `--spacing-4` systeem — spacing/radius/opacity komen uit Tailwind utilities
- Dark mode: class-based (`.dark` op `<html>`) via ThemeProvider

### 2.4 Token-conventie (shadcn-default)

shadcn gebruikt **background/foreground pairs** zonder expliciete rol-prefix:

| Token                 | Paar                   | Gebruik                                                                                                                   |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `background`          | `foreground`           | App shell, body                                                                                                           |
| `card`                | `card-foreground`      | Cards, panels                                                                                                             |
| `popover`             | `popover-foreground`   | Dropdowns, overlays                                                                                                       |
| `primary`             | `primary-foreground`   | Primary buttons, brand                                                                                                    |
| `secondary`           | `secondary-foreground` | Secondary buttons                                                                                                         |
| `muted`               | `muted-foreground`     | Subtiele vlakken + secundaire tekst                                                                                       |
| `accent`              | `accent-foreground`    | Hover/selected states (menu, ghost)                                                                                       |
| `destructive`         | —                      | Destructive buttons + invalid states                                                                                      |
| `border`              | —                      | Structuurborders                                                                                                          |
| `input`               | —                      | Form control borders                                                                                                      |
| `ring`                | —                      | Focus rings                                                                                                               |
| `sidebar-*`           | —                      | shadcn startpunt → SURF **`alt`** surface ([Alt surfaces](./beslissingen/alt-surfaces.md)); `sidebar`/`inverse` vervallen |
| `chart-1` … `chart-5` | —                      | Datavisualisatie                                                                                                          |
| `radius`              | —                      | Basis radius; afgeleiden via `@theme`                                                                                     |

**Componentpatroon:** Primitives in `components/ui/` combineren Radix UI + Tailwind classes die semantic utilities gebruiken (`bg-primary`, `hover:bg-accent`, `border-input`).

**Dependencies:** Radix UI primitives, `class-variance-authority` (variants), `tailwind-merge` + `clsx` (`cn()`), Lucide icons.

---

## 3. shadcndesign — Figma kit organisatie

De [shadcndesign Figma kit](https://www.shadcndesign.com/) spiegelt shadcn/ui. Componenten refereren **niet** direct hex-waarden of ruwe Tailwind-primitives — ze gebruiken variable collections als routing-laag.

### 3.1 Variable collections (genummerd)

De kit gebruikt **genummerde collecties** die corresponderen met shadcn-lagen:

| Collectie           | Naam in Figma        | shadcn equivalent                                    | ~Aantal tokens  |
| ------------------- | -------------------- | ---------------------------------------------------- | --------------- |
| **1. Tailwind CSS** | Utility-schalen      | Tailwind classes (`p-4`, `rounded-lg`, `opacity-50`) | ~496            |
| **2. Theme**        | Brand/thema-kolommen | `:root` / `.dark` CSS variables                      | per theme-kolom |
| **3. Mode**         | Light/dark routing   | `.dark` selector + semantic utilities                | ~80             |

#### 1. Tailwind CSS — foundation utilities

Bevat schalen die in code **Tailwind classes** zijn, geen CSS custom properties:

| Subgroep               | Voorbeelden                | Code-equivalent                            |
| ---------------------- | -------------------------- | ------------------------------------------ |
| Spacing (35)           | `spacing/4` → 16px         | `p-4`, `m-4`, `gap-4`, `w-4`               |
| Width / Height (33+33) | `width/12`                 | `w-12`, `h-12` (zelfde schaal als spacing) |
| Border radius (10)     | `border-radius/rounded-lg` | `rounded-lg` → `var(--radius-lg)`          |
| Border width (9)       | `border-width/border`      | `border`, `border-2`                       |
| Stroke width (12)      | icon strokes               | SVG stroke utilities                       |
| Opacity (21)           | `opacity/opacity-50`       | `opacity-50`                               |
| Leading (20)           | line-height schaal         | `leading-tight`, etc.                      |
| Min/max width (14+15)  | container schalen          | `max-w-7xl`, `min-w-sm`                    |

#### 2. Theme — brand layer

- **Kolommen** = verschillende themes (Default, custom brands, Amber, …)
- Elke kolom definieert het volledige semantic token-set
- Tokens matchen shadcn CSS-variabelenamen: `background`, `primary`, `muted`, `border`, …
- Waarden kunnen verwijzen naar Tailwind color primitives (`neutral/200`) of hex/OKLCH
- Light **en** dark varianten per token (bijv. `primary` + `primary-dark`) voor routing via Mode

#### 3. Mode — light/dark routing layer

Subcollecties binnen Mode:

| Subcollectie | Doel                             | Code-equivalent                          | Exporteren?         |
| ------------ | -------------------------------- | ---------------------------------------- | ------------------- |
| **base**     | Semantic tokens voor componenten | `bg-background`, `text-muted-foreground` | ✅ Ja               |
| **alpha**    | Opacity op aliased colors        | `bg-muted/90`                            | ❌ Figma-workaround |
| **custom**   | Dark-mode combinaties            | `dark:bg-input/50`                       | ❌ Figma-workaround |

**Waarom alpha/custom bestaan:** Figma kan geen opacity op aliased variables en geen `dark:` prefix in één variable. De kit simuleert dit met aparte tokens (`--custom-accent-dark-input50`, etc.).

### 3.2 Component-structuur in Figma

```
Tailwind Primitives / Hex
        ↓
2. Theme (brand values per kolom)
        ↓
3. Mode (light/dark routing: base | alpha | custom)
        ↓
Components + Pro Blocks
```

- **Componenten** binden aan **Mode → base** variabelen, nooit aan hex of Theme direct
- **Pro Blocks** = kant-en-klare pagina-secties (marketing, dashboard, auth, …)
- Themes wisselen via Theme-kolom; light/dark via Mode-switch

### 3.3 Figma-to-shadcn/ui plugin

| Functie             | Gedrag                                                                       |
| ------------------- | ---------------------------------------------------------------------------- |
| **Code generatie**  | Figma frame → shadcn/ui React code                                           |
| **Variable export** | Exporteert Theme-kleuren uit collectie **2. Theme** → CSS voor `globals.css` |
| **Variable import** | CSS variables terug naar Figma                                               |
| **Pro Blocks CLI**  | CLI-commando's voor Pro Block installatie                                    |

**Beperkingen (belangrijk):**

- Plugin draaien in het **MAIN shadcn/ui kit bestand**, niet in een consumer file
- Export bevat primair **color group** uit **2. Theme** — geen volledige Tailwind CSS-collectie
- Alpha/custom tokens worden **niet** geëxporteerd als developer-tokens
- Geen ingebouwde invalid-variant op Input (handmatig mockuppen)

---

## 4. SURF token library — tool-organisatie

De token library is een **React/Vite lookup-tool** (`token-library.jsx`). Geen build-pipeline; bedoeld om designers en developers tokens te laten opzoeken en contrast te valideren.

### 4.1 Tabs

| Tab            | Inhoud                                                         | Figma/shadcn equivalent                  |
| -------------- | -------------------------------------------------------------- | ---------------------------------------- |
| **Foundation** | Typography, breakpoints, containers + Tailwind utility-schalen | Collectie 1 + `@theme` radius/typography |
| **Colors**     | Foundation palettes (`--color-*`)                              | Tailwind color primitives                |
| **Themes**     | Semantic tokens per theme + light/dark                         | Collectie 2 + 3.base                     |
| **Contrast**   | WCAG-checks op token-paren                                     | —                                        |

### 4.2 Data-structuur in code

| Constante                     | Functie                                          |
| ----------------------------- | ------------------------------------------------ |
| `FOUNDATION_TOKENS`           | CSS vars + utility referentietabellen            |
| `COLOR_PALETTE_GROUPS`        | Foundation kleuren (SURF, Tailwind, brand)       |
| `THEME_BASE`                  | Default semantic tokens (categorised)            |
| `DARK_OVERRIDES`              | Dark-mode waarden voor default theme             |
| `THEME_OVERRIDES`             | Named themes (studielink-aii, shadcn-default, …) |
| `TOKEN_USAGE`                 | Usage descriptions per token                     |
| `CONTRAST_PAIRS`              | WCAG paren (text 4.5:1, border 3:1)              |
| `TAILWIND_UTILITY_CATEGORIES` | Secties die **geen** CSS vars zijn               |

### 4.3 Gelaagde documentatie (besluit)

De tool volgt **Optie C** uit [figma-tailwind-tokens.md](./beslissingen/figma-tailwind-tokens.md):

| Type                                | In tool?      | Vorm                             |
| ----------------------------------- | ------------- | -------------------------------- |
| Semantic CSS variables              | ✅ Themes tab | `--background-default`, …        |
| Foundation colors                   | ✅ Colors tab | `--color-neutral-200`            |
| Typography, breakpoints, containers | ✅ Foundation | CSS variables                    |
| Tailwind utility-schalen            | ✅ Foundation | Referentietabel (class → waarde) |
| Width/height                        | ❌            | Zelfde schaal als Spacing        |
| Mode → alpha/custom                 | ❌            | Gedocumenteerd als Figma-only    |

**Info-banner** in Foundation-tab waarschuwt dat Spacing t/m Leading geen CSS custom properties zijn.

### 4.4 Theme-systeem in de tool

- **default theme:** volledige token-set via `THEME_BASE` + `DARK_OVERRIDES`
- **Named themes:** override-only (`THEME_OVERRIDES`) — alleen afwijkende tokens
- Theme values: `{ ref: "--color-x" }` (link naar Colors) of plain string (hardcoded/alpha)
- CSS editor: plak `:root` + `.dark` blocks; parser vult Themes tab
- Light/dark switcher = display filter, niet editor filter

---

## 5. Mapping: Figma ↔ token library ↔ shadcn code

### 5.1 Collectie → tab mapping

| Figma (shadcndesign)                  | Token library                                | shadcn code                        |
| ------------------------------------- | -------------------------------------------- | ---------------------------------- |
| 1. Tailwind CSS / spacing             | Foundation → Spacing                         | `p-4`, `gap-4`                     |
| 1. Tailwind CSS / border-radius       | Foundation → Border radius + Themes → Radius | `rounded-lg`, `--radius-lg`        |
| 1. Tailwind CSS / opacity             | Foundation → Opacity                         | `opacity-50`                       |
| 1. Tailwind CSS / colors (primitives) | Colors → Tailwind palettes                   | `--color-neutral-200` in `@theme`  |
| 2. Theme / color group                | Themes tab                                   | `:root { --background: … }`        |
| 3. Mode → base                        | Themes tab                                   | `bg-background`, `text-foreground` |
| 3. Mode → alpha                       | **Niet in tool**                             | `bg-muted/90`                      |
| 3. Mode → custom                      | **Niet in tool**                             | `dark:bg-input/50`                 |

### 5.2 Semantic token mapping (shadcn-default → SURF gewenst)

SURF migreert van shadcn-naming naar **rol-first** tokens. Zie [token-migratie.md](./beslissingen/token-migratie.md).

| shadcn (huidig)      | SURF gewenst                            | Reden                                                                 |
| -------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| `--background`       | `--background-default`                  | Expliciete surface                                                    |
| `--foreground`       | `--foreground-default`                  | Parallel pair                                                         |
| `--muted`            | `--background-subtle`                   | Geen verwarring met disabled                                          |
| `--muted-foreground` | `--foreground-subtle`                   | Secundaire tekst                                                      |
| `--accent`           | `--background-item-hover`               | Hover ≠ branding                                                      |
| —                    | `--background-item-selected`            | Selected apart van hover                                              |
| `--destructive`      | `--background-error` + error-rol tokens | Multi-use opsplitsen                                                  |
| `--border`           | `--border-default`                      | Rol expliciet                                                         |
| `--input`            | `--border-input`                        | Form vs structuur                                                     |
| `--ring`             | `--ring-default`                        | Consistent patroon                                                    |
| `--sidebar`          | `--background-alt`                      | Alt tonal region — zie [Alt surfaces](./beslissingen/alt-surfaces.md) |
| `--sidebar-*`        | `--*-alt`                               | `sidebar` als surface-naam vervalt                                    |

**Naamgrammatica SURF:** `--{rol}-{surface}[-{qualifier}]`  
Voorbeeld: `--border-input`, `--border-input-error`, `--foreground-default-error`

### 5.3 Wat wél 1:1 blijft

| Concept                    | shadcn                         | Figma                     | SURF                                  |
| -------------------------- | ------------------------------ | ------------------------- | ------------------------------------- |
| Foundation palette         | `@theme` color scale           | 1. Tailwind CSS colors    | Colors tab                            |
| Radius afgeleiden          | `--radius-sm` … `--radius-4xl` | border-radius group       | Themes → Radius                       |
| Dark mode borders (opaque) | `neutral-700` / `600`          | custom tokens in Mode     | palette-ref in DARK_OVERRIDES         |
| Disabled                   | `opacity-50` utility           | 50% layer opacity variant | Geen theme token                      |
| Button hover (filled)      | opacity modifiers `/80`        | alpha collectie           | → `--background-primary-hover` (SURF) |

---

## 6. Praktische richtlijnen

### Voor designers (Figma)

1. **Leidend:** SURF token-namen uit de token library / besluiten — niet blind shadcn-default uit de kit
2. Figma library **aanpassen** (Theme-variabelen hernoemen, component variants) parallel aan code
3. Gebruik **Mode → base** variabelen op componenten; spacing/radius via **1. Tailwind CSS**
4. Alpha/custom tokens zijn Figma-hulpmiddelen; verwacht ze **niet** in developer-export
5. Invalid states: handmatig mockuppen met SURF error-tokens (kit heeft geen Input invalid variant)

### Voor developers (code)

1. **Leidend:** token library + besluiten — niet stock shadcn token-namen of plugin-export
2. Component library **aanpassen** (classes, variants) parallel aan Figma
3. Semantic tokens in `globals.css` met SURF-namen (`:root` / `.dark`)
4. `@theme inline` mapt gewenste tokens naar utilities
5. shadcn CLI-updates bewust beoordelen — niet blind overschrijven na migratie

### Voor token library onderhoud

1. **Dit is de specificatie** — wijzigingen hier drijven aanpassingen in code én Figma
2. Nieuwe semantic tokens → `THEME_BASE`, `TOKEN_USAGE`, `CONTRAST_PAIRS`
3. Theme overrides → `THEME_OVERRIDES` met `{ ref }` naar Colors waar mogelijk
4. Besluiten documenteren in `docs/beslissingen/`

---

## 7. Architectuurdiagram (doelstaat)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ SURF design system — gedeelde specificatie (token library + besluiten)   │
└──────────────────────────────────────────────────────────────────────────┘
         ▲                                          ▲
         │                                          │
┌────────┴────────┐                        ┌────────┴────────┐
│ SURF Figma      │                        │ SURF component  │
│ library         │                        │ library         │
│ (aangepast)     │                        │ (aangepast)     │
└────────▲────────┘                        └────────▲────────┘
         │ vertrokken van                            │ vertrokken van
         └──────────────────┬────────────────────────┘
                            │
                   ┌────────┴────────┐
                   │ shadcn start-   │
                   │ punt (kit + ui) │
                   └─────────────────┘

Implementatiedetail (component library):
┌──────────────────────────────────────────────────────────────────────────┐
│  components/ui/          Radix + CVA + SURF semantic Tailwind classes    │
│  lib/utils.ts            cn()                                            │
│  globals.css             SURF tokens (:root / .dark / @theme inline)     │
│  Tailwind utilities      p-4, rounded-lg, opacity-50, border           │
└──────────────────────────────────────────────────────────────────────────┘

---

## 8. Externe referenties

| Onderwerp | URL |
| --- | --- |
| shadcn theming | https://ui.shadcn.com/docs/theming |
| shadcn Tailwind v4 | https://ui.shadcn.com/docs/tailwind-v4 |
| shadcn components.json | https://ui.shadcn.com/docs/components-json |
| shadcndesign docs | https://www.shadcndesign.com/docs |
| shadcndesign variables | https://www.shadcndesign.com/docs/variables |
| shadcndesign theming | https://www.shadcndesign.com/docs/theming |
| Figma-to-shadcn plugin | https://www.shadcndesign.com/plugin |
| Figma community plugin | https://www.figma.com/community/plugin/1427238109341529865 |

---

## 9. SURF-specifieke besluiten (kort)

Volledige uitwerking in [beslissingen.md](./beslissingen.md).

| Onderwerp | Kern |
| --- | --- |
| Token roles | Rol-first naming; geen shadcn multi-use tokens |
| Hover states | `--background-item-hover` + `--background-primary-hover` i.p.v. `--accent` + opacity |
| Disabled | `opacity-50` utility; geen theme token |
| Borders | `--border-default` + `--border-input`; light én dark opaque ref |
| Invalid/error | Rol-specifieke error tokens; geen `--destructive` multi-use |
| Figma utilities | Gelaagde docs; alpha/custom niet exporteren |
| Migratie | Direct huidig → gewenst; geen alias-laag |
| Focus ring | `--ring-default`, `--ring-alt`; utilities voor breedte/opacity/offset |
| Alt surfaces | `--background-alt`; framing-regio; `sidebar`/`inverse` vervallen |
| Dark mode | Class `.dark`; palette-ref; opacity alleen utilities |

---

## 10. Snelle lookup — "waar hoort X?"

| Ik zoek… | Kijk in… |
| --- | --- |
| Spacing waarde voor `p-6` | Token library → Foundation → Spacing; Figma → 1. Tailwind CSS |
| Primary button kleur | Token library → Themes; Figma → 2. Theme kolom; code → `:root --primary` |
| Hover kleur menu item | SURF: `--background-item-hover`; shadcn: `--accent`; Figma: Mode → base |
| Dark border | `--border-default: neutral-700` (SURF opaque) / `oklch(…/10%)` (shadcn) |
| Focus ring | `--ring-default` (SURF) / `--ring` (shadcn) |
| Alt regio | `--background-alt` (SURF) / `--sidebar` (shadcn) |
| Font family | Foundation → Font; Theme override `--font-sans` |
| WCAG contrast | Token library → Contrast tab |
| Button component code | `components/ui/button.tsx` (shadcn CLI) |
| Design component | Figma kit → Components page |
```
