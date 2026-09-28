import {
  a11yParameters,
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
  simplifyAngularDocsSource,
  themeGlobalTypes,
  themeInitialGlobals,
  themeSwitcher,
} from '@surfnet/curve-storybook-config';

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'angular', ...themeInitialGlobals },
  globalTypes: { ...frameworkGlobalTypes, ...themeGlobalTypes },
  decorators: [frameworkSwitcher('angular'), themeSwitcher()],
  parameters: {
    ...sharedParameters,
    ...a11yParameters,
    docs: {
      source: {
        // Drop brackets around plain string args (e.g. `[variant]="variant"`
        // -> `variant="outline"`) in the "Show code" snippet only — see
        // simplifyAngularDocsSource for why the live story keeps binding them.
        transform: (code: string, { args }: { args: Record<string, unknown> }) =>
          simplifyAngularDocsSource(code, args),
      },
    },
    // Must be a literal (Storybook reads it via static analysis, not
    // execution). Keep in sync with packages/react/.storybook/preview.ts.
    options: {
      storySort: {
        // `includeNames` is required: without it Storybook sorts on title only,
        // so a page whose title has no subgroup always sorts before the groups,
        // whatever `order` says.
        // `configure` leaves anything not listed below in file order, which
        // keeps each component's stories in the sequence they were authored.
        method: 'configure',
        includeNames: true,
        order: [
          'Curve',
          [
            'Overzicht',
            'Voor designers',
            [
              'Overzicht',
              'Toegankelijk ontwerpen',
              'Microcopy',
              'Validatie van formulieren',
              'Touch en vergroting',
              'Meer leren',
              ['Overzicht', 'Toegankelijkheid in andere design systems'],
            ],
            'Voor developers',
            [
              'Curve gebruiken',
              'Toegankelijk bouwen',
              'Je werk testen',
              [
                'Overzicht',
                'Handmatig testen',
                'Geautomatiseerd testen',
                'Wanneer je gebruik maakt van AI',
              ],
              'Wat vaak mis gaat',
              [
                'Naamloze knoppen',
                'Teveel ARIA',
                'Verkeerde ARIA',
                'Ontbrekende pagina-structuur',
                'Ontbrekende skiplinks',
                'Ontbreken van unieke pagina-titel',
                'Tabellen zonder koppen',
                'Afbeeldingen zonder beschrijving',
                'Slechte alt-tekst',
                'Ontbrekende bijschriften',
                'Video die automatisch afspeelt',
                'Vaste breedtes',
                'Te licht contrast',
                'Tekst in afbeeldingen',
                'Taalwissels zonder markering',
                'Status alleen in kleur',
                'Rood/groen-combinaties',
                'Ongelabelde grafieken',
                'Video zonder ondertiteling',
                'Geen transcript',
                'Kleine klikdoelen',
                'Alleen slepen',
                "Hover-menu's",
                'Korte time-outs',
                'Automatische beweging',
                'Tijdsdruk',
                'Vage foutmeldingen',
                'Onduidelijke validatie',
                'Op het slechtst denkbare moment',
              ],
              'Meer leren',
            ],
            'Toegankelijkheid',
            'Updates en releases',
            'Changelog en beslissingen',
          ],
          'Foundations',
          'Components',
        ],
      },
    },
  },
};
