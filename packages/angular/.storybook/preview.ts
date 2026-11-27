import type { Decorator } from '@storybook/angular';
import {
  a11yParameters,
  frameworkGlobalTypes,
  frameworkSwitcher,
  languageInitialGlobals,
  languageSwitcher,
  sharedParameters,
  storyLocale,
  simplifyAngularDocsSource,
  themeGlobalTypes,
  themeInitialGlobals,
  themeSwitcher,
} from '@surfnet/curve-storybook-config';

import { CURVE_MICROCOPY, microcopy } from '../src/lib/microcopy';

// Gives every story the texts of the language picked in the toolbar (English / Nederlands).
// The texts go in `moduleMetadata` on purpose: Storybook rebuilds the Angular story when
// that changes, so inputs that read their default text at creation pick up the new language.
// A story's own `provideCurveMicrocopy()` on a component still wins.
const microcopyDecorator: Decorator = (storyFn, { globals }) => {
  const story = storyFn();
  return {
    ...story,
    moduleMetadata: {
      ...story.moduleMetadata,
      providers: [
        ...(story.moduleMetadata?.providers ?? []),
        { provide: CURVE_MICROCOPY, useValue: microcopy[storyLocale(globals)] },
      ],
    },
  };
};

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'angular', ...themeInitialGlobals, ...languageInitialGlobals },
  globalTypes: { ...frameworkGlobalTypes, ...themeGlobalTypes },
  decorators: [
    microcopyDecorator,
    frameworkSwitcher('angular'),
    themeSwitcher(),
    languageSwitcher(),
  ],
  parameters: {
    ...sharedParameters,
    ...a11yParameters,
    docs: {
      codePanel: true,
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
              'Verplichte en optionele velden',
              'Touch en vergroting',
              'Meer leren',
              ['Overzicht', 'Toegankelijkheid in andere design systems'],
            ],
            'Voor developers',
            [
              'Curve gebruiken',
              'Formulieren bouwen',
              'Microcopy',
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
          'Examples',
        ],
      },
    },
  },
};
