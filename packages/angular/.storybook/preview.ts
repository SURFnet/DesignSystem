import {
  frameworkGlobalTypes,
  frameworkSwitcher,
  sharedParameters,
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
    // Must be a literal (Storybook reads it via static analysis, not
    // execution). Keep in sync with packages/react/.storybook/preview.ts.
    options: {
      storySort: {
        // `includeNames` is required: without it Storybook sorts on title only,
        // so a page whose title has no subgroup (e.g. Toegankelijkheid / Meer
        // leren) always sorts before the groups, whatever `order` says.
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
            [
              'Overzicht',
              "Verschillende beperkingen (persona's)",
              'Toegankelijkheid in andere design systems',
            ],
            'Je werk testen',
            ['Overzicht', 'Handmatig testen', 'Geautomatiseerd testen'],
            "Do's en don'ts",
            [
              'Overzicht',
              'De eerste regel van ARIA',
              'ARIA correct gebruiken',
              'Wanneer je gebruik maakt van AI',
            ],
            'Inhoud en bediening',
            [
              'Overzicht',
              'Voor tekstschrijvers',
              'Video en audio',
              'Skiplinks',
              'Touch en vergroting',
            ],
            'Meer leren',
          ],
          'Foundations',
          'Components',
        ],
      },
    },
  },
};
