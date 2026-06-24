export const avatarContract = {
  sizes: ['sm', 'default', 'lg'],
  defaultSize: 'default',
  description:
    'A small image representing a user or entity, with a text fallback when the image is unavailable.',
  sizeDocs: {
    sm: 'Compact — dense lists and inline mentions.',
    default: 'Standard size for most contexts.',
    lg: 'Large — profile headers and prominent placements.',
  },
} as const;

export type AvatarSizeName = (typeof avatarContract.sizes)[number];
