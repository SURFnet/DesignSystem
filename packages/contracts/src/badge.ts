import { defineContract } from './define-contract.js';

export const badgeContract = defineContract({
  props: {
    variants: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'A small label for status, category, or count.',
    variants: {
      default: 'Primary brand fill — the most prominent badge style.',
      secondary: 'Muted fill — general-purpose secondary label.',
      destructive: 'Danger tint — errors, warnings, or destructive states.',
      outline: 'Bordered, transparent fill — low-emphasis label.',
      ghost: 'No background or border — minimal label.',
      link: 'Looks like a hyperlink — inline actionable label.',
    },
  },
});

export type BadgeVariantName = (typeof badgeContract.props.variants)[number];
