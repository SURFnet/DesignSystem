import {
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
  themeGlobalTypes,
  themeInitialGlobals,
  themeSwitcher,
} from '@surfnet/curve-storybook-config';

// Pull in Tailwind + the design tokens so stories render with the real styles.
import '../src/index.css';
import './storybook-docs.css';

// Keep this a literal object so Storybook's static analyzer can read `tags`
// (project-level autodocs) — a factory call can't be parsed statically.
export default {
  tags: ['autodocs'],
  initialGlobals: { framework: 'react', ...themeInitialGlobals },
  globalTypes: { ...frameworkGlobalTypes, ...themeGlobalTypes },
  decorators: [frameworkSwitcher('react'), themeSwitcher()],
  parameters: {
    ...sharedParameters,
    // Force the React jsxDecorator to always serialize the rendered JSX for the
    // "Show code" panel. Without this, a story with `render: () => (...)` (no
    // `args` param) is treated as a non-args story, so Storybook prints the whole
    // story object instead of the JSX. See @storybook/react's `skipJsxRender`.
    docs: { source: { type: 'dynamic' } },
    // Must be a literal (Storybook reads it via static analysis, not
    // execution). Keep in sync with packages/angular/.storybook/preview.ts.
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
            'Voor developers',
            'Updates en releases',
            'Changelog en beslissingen',
          ],
          'Toegankelijkheid',
          [
            'Introductie',
            ['Overzicht', 'Regelgeving', "Verschillende beperkingen (persona's)"],
            'Je werk testen',
            ['Overzicht', 'Handmatig testen', 'Geautomatiseerd testen'],
            "Do's en don'ts",
            [
              'Overzicht',
              'Wat vaak mis gaat',
              [
                'Naamloze knoppen',
                'Ontbrekende pagina-structuur',
                'Skiplinks',
                'Afbeeldingen zonder beschrijving',
                'Video die automatisch afspeelt',
                'Vaste breedtes',
                'Te licht contrast',
                'Tekst in afbeeldingen',
                'Geen taal ingesteld op de pagina',
                'Status alleen in kleur',
                'Rood/groen-combinaties',
                'Ongelabelde grafieken',
                'Video zonder ondertiteling',
                'Geen transcript',
                'Kleine klikdoelen',
                'Alleen slepen',
                "Hover-menu's",
                'Korte time-outs',
                'Jargon',
                'Automatische beweging',
                'Tijdsdruk',
                'Vage foutmeldingen',
                'Op het slechtst denkbare moment',
              ],
              'De eerste regel van ARIA',
              'ARIA correct gebruiken',
              'Wanneer je gebruik maakt van AI',
            ],
            'Inhoud en bediening',
            ['Overzicht', 'Voor tekstschrijvers', 'Video en audio', 'Touch en vergroting'],
            'Meer leren',
            ['Overzicht', 'Toegankelijkheid in andere design systems'],
          ],
          'Foundations',
          'Components',
        ],
      },
    },
  },
};
