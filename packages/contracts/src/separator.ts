export const separatorContract = {
  orientations: ['horizontal', 'vertical'],
  defaultOrientation: 'horizontal',
  description: 'A thin rule that visually or semantically divides content.',
  orientationDocs: {
    horizontal: 'A full-width rule between stacked blocks.',
    vertical: 'A full-height rule between inline items.',
  },
} as const;

export type SeparatorOrientationName = (typeof separatorContract.orientations)[number];
