# Curve — frictie & voorstellen

**Doel:** Waar shadcn code + Figma kit tegenaan liepen, wat we aanpassen en waarom.  
**Status:** Voorgesteld · **In detail:** [beslissingen.md](./beslissingen.md)

---

## Context

- Startpunt: shadcn/ui + shadcndesign Figma kit (synchroon via shadcn-conventies)
- Doel: SURF token library definieert gewenste staat → code én Figma passen **parallel** aan
- shadcn blijft technisch (Radix, Tailwind, components); tokens en states worden SURF-specifiek
- Geen alias-laag tussen shadcn- en SURF-namen

**Kernfrictie:** code gebruikt opacity/alpha; Figma simuleert dat met alpha/custom; plugin exporteert dat niet → design ≠ code, contrast moeilijk te checken.

---

## Voorstellen

### Token naming: rol-first

- shadcn-tokens zoals `--accent` en `--destructive` zijn onduidelijk in gebruik
- Is het accentkleur? Tekst of achtergrond? Dezelfde `--destructive` voor button, border én error-tekst
- Patroon: `--{rol}-{element}[-{state}]` — bijv. `--background-default`, `--border-input`
- Tokens die zichzelf uitleggen: `--background-item-hover`, `--foreground-default-error`
- shadcn-namen verdwijnen overal tegelijk; geen alias-laag → [token-migratie](./beslissingen/token-migratie.md)

### Alpha/custom in Figma — alleen Mode → base

- Stock kit heeft Mode → base, alpha en custom; alpha simuleert `bg-muted/90`, custom simuleert `dark:bg-input/50`
- Designers waarderen alpha: met 2 kleuren een hele reeks tweaken bij theme-setup
- Alpha/custom exporteert **niet** naar CSS; developers zien andere kleuren dan Figma
- Semi-transparante tokens blenden met achtergrond → WCAG-checks in Figma/token library falen
- Kleurtweaks na setup zijn zeldzaam; flexibiliteit weegt niet op tegen design-code kloof
- **Voorstel:** alleen Mode → base; opaque tokens light + dark; alpha/custom loslaten

### Hover states: twee tracks

- shadcn: filled buttons via opacity (`hover:bg-primary/90`); lists/menus via `--accent`
- `--accent` klinkt als branding, is interactie-highlight; hover (grijs) en selected (brand) in één token
- Figma bootst opacity na via alpha-collectie — komt niet in code
- **Emphasis:** `--background-primary-hover`, `--background-secondary-hover`
- **Items:** `--background-item-hover`, `--background-item-selected`
- Geen opacity-modifiers als hoofdstrategie; `--accent` verdwijnt
- **item-hover ≠ subtle:** in default theme viel `subtle`/`secondary`/`accent` samen op `neutral-100`; item-hover moet zichtbaar blijven (`neutral-200` light, `neutral-700` dark)
- **Geen auto-generatie:** `-hover` tokens zijn vaste opaque palette-refs per theme/mode (OKLCH-math zou code/Figma-kloof terugbrengen); OKLCH-generatie alleen voor foundation-kleurschalen

### Borders: volle kleuren, voor light en dark

- shadcn light: `neutral-200`; dark: semi-transparant wit — asymmetrisch, slecht testbaar
- **Voorstel:** `--border-default` (structuur) + `--border-input` (form controls)
- Light `neutral-300`, dark: `neutral-700`; nog testen: WCAG 3:1 op default, card én subtle

### Invalid / error

- shadcn: `--destructive` voor destructive button én invalid input; Figma heeft geen invalid variant
- Invalid = interactief; disabled = afgezwakt — moet visueel én semantisch scheiden
- **Invalid:** `--border-input-error`, `--ring-default-error`, `--foreground-default-error`
- **Destructive button:** `--background-error` / `--foreground-error`
- Figma: invalid als component variant (`default | invalid | disabled`)

### Disabled

- Geen kleur-token; shadcn: `opacity-50` + pointer lock op alle varianten
- Figma: disabled variant met 50% layer opacity — geen aparte fill
- Niet koppelen aan `--muted` of `--background-subtle`

### `--muted` → subtle

- `--muted` werd verward met disabled en hover
- shadcn: subtiele **niet-interactieve** vlakken + secundaire tekst — andere intentie
- **Voorstel:** `--background-subtle` + `--foreground-subtle`
- Disabled = `opacity-50`; hover = item-tokens — apart houden

### Alt surfaces

- shadcn `--sidebar-`\* is layout-specifiek; `inverse` belooft omkering die theme niet hoeft te doen
- **Voorstel:** surface `alt` — `--background-alt`, `--foreground-alt`, `--border-alt`, `--ring-alt`
- Sidebar, top nav, hero binden aan `alt`; theme beslist contrast met default

### Dark mode

- Twee werelden (Figma alpha/custom, shadcn dark alpha) met verschillende waarden
- **Voorstel:** class `.dark`; zelfde token-namen, andere opaque waarden
- Opacity alleen utilities (`opacity-50`, `ring-default/50`) — niet op achtergrond/border tokens
- **Alt ≠ dark mode** — orthogonale assen (framing-regio vs. globale switch)

### Focus ring

- Kleur in theme; breedte, offset en opacity in Tailwind utilities
- **Tokens:** `--ring-default`, `--ring-default-error`, `--ring-alt`
- **Utilities:** `ring-2`, `ring-offset-2`, `ring-default/50`
- Offset-kleur = surface (`ring-offset-background-default`) — geen `--ring-offset` token
- Altijd `focus-visible`; focus ≠ hover ≠ invalid

### Elevation / shadow

- shadcn gebruikt `shadow-xs` t/m `shadow-lg`; geen `--shadow-`\* in theme; Figma Theme exporteert geen shadows
- **Voorstel:** Tailwind utilities in Foundation; conventies: outline `shadow-xs`, card `shadow-sm`, popover `shadow-md`, dialog `shadow-lg`
- Diepte = utility; kleur = theme token; focus = ring

### Tailwind-kleuren: bijgeleverd, niet automatisch ons systeem

- Shadcn theme-tokens zijn **hardcoded** `oklch(…)`, géén link naar `--color-neutral-`\*
- Bij `init` worden deze eenmalig geseed uit een gekozen grijsfamilie, daarna ingebakken
- Het volledige Tailwind default-palet is enkel beschikbaar omdat Tailwind het **meelevert** voor utility classes — geen bewuste design system-keuze
- Beschikbaarheid ≠ onderdeel van het systeem: `bg-fuchsia-700` bestaat technisch, maar hoort niet bij SURF
- **Voorstel:** ons design system = **curated foundation-palet** (brand-schalen + gekozen neutrals) + semantic tokens; alleen die foundation-kleuren zijn de bron-laag
- Anders dan shadcn leggen wij de link foundation → semantic **wél expliciet** vast (`{ ref: "--color-*" }`), zodat code en Figma dezelfde bron delen — Figma aliast al naar primitives, shadcn-CSS niet

### Figma Tailwind-tokens

- Kit: ~500 utility-variabelen; niet alles hoort als `--`-variable in code
- **Foundation:** utility-referentietabellen (spacing, opacity, radius, shadow)
- **Themes:** semantic tokens — alleen Mode → base
- Width/height niet dupliceren (zelfde schaal als spacing)

---

## Kosten & baten

> "Is dit de moeite waard?" — niet alleen de baten, ook de prijs.

### Baten

- **Testbaar contrast:** opaque tokens → WCAG-checks kloppen in Figma, code én token library. Voor SURF (hoger onderwijs) is EN 301 549 / WCAG wettelijk verplicht — geen nice-to-have
- **Design = code:** geen alpha/custom-kloof meer; wat de designer ziet is wat de developer bouwt
- **Één naamsysteem:** rol-first tokens leggen gebruik vast; geen `--accent`/`--destructive` multi-use-verwarring
- **Correcte semantiek:** error/invalid, hover/selected en disabled zijn nu apart i.p.v. samengevouwen

### Kosten

- **Eenmalige migratiebatch:** alle tokens tegelijk hernoemen over `token-library.jsx`, `globals.css`, `@theme`, component-classes én Figma — geen tussenfase
- **Doorlopende CLI-divergentie:** zonder compat-shim levert elke `npx shadcn add <component>` code met oude namen (`bg-accent`, `bg-muted`) die handmatig gepatcht moet worden — terugkerende kost, geen eenmalige
- **Figma handmatig aligned:** plugin-export niet meer leidend; Theme-variabelen + component-variants met de hand bijhouden
- **Leercurve:** team moet nieuwe namen aanleren; bestaande shadcn-kennis sluit niet 1:1 aan

### Doorslaggevende afweging

- Grootste terugkerende kost zit in **CLI-divergentie** (zie [token-migratie](./beslissingen/token-migratie.md)): zonder compat-shim levert elke `shadcn add` code met oude namen die handmatig gepatcht moet worden
- **Keuze: geen shim (optie A).** We hosten onze eigen code; shadcn is ownership-by-design (kopiëren → zelf verder bouwen). Nieuwe componenten vergen dan wat extra handwerk, maar bij de verwachte lage toevoeg-frequentie weegt dat niet op tegen één schoon naamsysteem zonder dubbele namen
- Eenmalige migratie + testbaar contrast + één naamsysteem wegen ruim op tegen de kosten

---

## Per rol

- **Designers:** herbind alpha/custom → base; SURF token-namen; invalid variant; shadows via Tailwind-collectie
- **Developers:** rol-first tokens in `globals.css`; classes aanpassen; plugin-export niet blind vertrouwen
- **Iedereen:** token library = specificatie; contrast-tab = validatie; Figma + code = zelfde namen

_2026-06-17_
