import { defineContract } from './define-contract.js';

export const curvePageHeaderContract = defineContract({
  props: {
    mediaVariants: ['default', 'icon', 'image'],
  },
  defaults: {
    mediaVariants: 'default',
  },
  docs: {
    description:
      'The top section of a page, composed from parts: a breadcrumb, media, title, badges, description, page actions and tab navigation. Only the title is required. On narrow containers the actions move below the description and extra actions collapse into a "More actions" menu.',
    mediaVariants: {
      default: 'No styling — the media renders as-is.',
      icon: 'Square tile with a muted background for an icon.',
      image: 'Square thumbnail with rounded corners; the image covers the tile.',
    },
  },
});

export type CurvePageHeaderMediaVariantName =
  (typeof curvePageHeaderContract.props.mediaVariants)[number];
