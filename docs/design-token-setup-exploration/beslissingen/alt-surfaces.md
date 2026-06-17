# Alt surfaces

**Status:** Voorgesteld  
**Datum:** 2026-06-16 (herzien: `inverse` → `alt`)  
**Betrokken:** Design system / token library

## Samenvatting

> UI-regio's met een **eigen tonal palette** (sidebar, top nav, hero) krijgen surface **`alt`**: `--background-alt`, `--foreground-alt`, enz. Tokens beschrijven **tonal context**, niet layout — **geen verplichte inversie** t.o.v. `default`. **`sidebar` en `inverse` als surface-namen vervallen.**

## Context

shadcn modelleert dit als `--sidebar-*`. SURF migreerde naar rol-first tokens, eerst `--*-sidebar`, daarna `--*-inverse`.

**Probleem met `inverse`:** de naam impliceert omgekeerde tonaliteit, maar een theme kan de sidebar **niet** inverteren (zelfde grijs als body). De token `--background-inverse` liegt dan over de invulling.

## Probleem / vraag

1. Hoe noemen we een tweede tonal zone zonder “inverse” te beloven?
2. `chrome` / `shell` — beter?
3. Wat gebeurt er met `--*-inverse` en shadcn `--sidebar-*`?

## Overwogen opties

### Optie A — `alt` *(gekozen)*

Tweede tonal zone; geen inverse-implicatie.

| Pro | Con |
| --- | --- |
| Accuraat als sidebar = default toon | Minder beeldend dan “inverse” |
| Geen WCAG-naamconflict | “Alt” is abstract |
| Theme vult in: wél of niet contrast met default | |
| Past bij `--background-default` grammatica | |

### Optie B — `inverse` *(vervallen)*

| Pro | Con |
| --- | --- |
| Dark nav op light app is meteen duidelijk | **Misleidend** als theme niet invertiert |
| | Naam belooft gedrag dat optioneel is |

### Optie C — `chrome` *(afgewezen)*

Nav/header-framing; geen inverse-belofte.

| Pro | Con |
| --- | --- |
| Bekend bij devs (“browser chrome”) | Hero/marketing band past minder |
| Specifieker dan shell | Nog steeds layout-associatie |

### Optie D — `shell` *(afgewezen)*

| Pro | Con |
| --- | --- |
| App-shell term | Voelt allesomvattend (“app zit ín shell”) |

### Optie E — `sidebar` *(vervallen)*

Layout-naam in tokens — zie eerdere besluiten.

## Beslissing

**Optie A — surface `alt`. `inverse` en `sidebar` vervallen als surface-namen.**

### Token-schema (gewenste staat)

```
Alt region (sidebar, top nav, hero, …):
  --background-alt
  --foreground-alt
  --border-alt
  --ring-alt

Emphasis binnen alt (was sidebar-primary):
  --background-alt-emphasis
  --foreground-alt-emphasis

Item-interaction op alt (was sidebar-accent):
  --background-alt-item-hover
  --foreground-alt-item-selected
```

**Semantiek:** `alt` = “eigen palette voor framing-regio's”. Mag **wel** sterk contrasteren met `default` (dark sidebar op light app), maar **hoeft niet** — theme beslist.

| Component | Tokens |
| --- | --- |
| Sidebar | `alt` |
| Top nav / site header | `alt` |
| Page hero (eigen band) | `alt` |

### Huidig → gewenst

| Huidig (shadcn) | Vervallen | Gewenst |
| --- | --- | --- |
| `--sidebar` | `--background-sidebar`, `--background-inverse` | `--background-alt` |
| `--sidebar-foreground` | `--foreground-sidebar`, `--foreground-inverse` | `--foreground-alt` |
| `--sidebar-border` | `--border-sidebar`, `--border-inverse` | `--border-alt` |
| `--sidebar-ring` | `--ring-sidebar`, `--ring-inverse` | `--ring-alt` |
| `--sidebar-primary` | `--background-*-primary`, `-emphasis` | `--background-alt-emphasis` |
| `--sidebar-accent` | `--background-*-item-hover` | `--background-alt-item-hover` |

Zie [Token-migratie](./token-migratie.md).

### Tailwind `@theme` (classes)

| Gewenst |
| --- |
| `bg-background-alt` |
| `text-foreground-alt` |
| `border-alt` |
| `ring-alt` |
| `ring-offset-background-alt` |

## Rationale

1. **Geen valse belofte** — `alt` beschrijft rol (tweede zone), niet visueel resultaat.
2. **Tonal, niet layout** — één palette voor sidebar, top nav, hero.
3. **Theme-flexibiliteit** — alt mag gelijk aan default, subtiel contrasterend, of sterk contrasterend.
4. **`inverse` was te specifiek** — goed voor dashboards, fout voor “sidebar = licht grijs zoals body”.

## Gevolgen

- **Tokens:** `THEME_BASE` → `alt`; `inverse`/`sidebar` suffixen verwijderen
- **token-library.jsx:** rename + Contrast-tab groep “Alt”
- **Figma:** shadcndesign `--sidebar-*` → `--*-alt`
- **Docs:** [Inverse surfaces](./inverse-surfaces.md) vervangen door dit document

## Open vragen

- [ ] Eén alt palette per theme, of later `--background-alt-nav` / `-hero`?
- [ ] `--background-alt-item-hover` vs globale `--background-item-hover`?

## Gerelateerd

- [Token roles](./token-roles.md)
- [Token-migratie](./token-migratie.md)
- [Focus ring](./focus-ring.md) — `--ring-alt`
- [Borders](./borders.md) — `--border-alt`
- [Dark mode](./dark-mode.md) — alt ≠ dark mode

## Referenties

```
SURFACE ASSEN (orthogonaal)
  default     =  page canvas
  alt         =  framing-regio (eigen palette, niet per se inverse)
  dark mode   =  .dark class (global switch)

VOORBEELDEN (allemaal geldig met "alt")
  light default + dark alt sidebar     ← klassiek dashboard
  light default + light alt sidebar    ← sidebar niet geïnverteerd
  dark default + light alt hero        ← marketing band
```
