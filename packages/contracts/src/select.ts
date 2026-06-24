export const selectContract = {
  sizes: ['sm', 'default'],
  defaultSize: 'default',
  description: 'A control for picking a single value from a list shown in a popup.',
  sizeDocs: {
    sm: 'Compact trigger for dense toolbars and filter bars.',
    default: 'Standard trigger height.',
  },
} as const;

export type SelectTriggerSizeName = (typeof selectContract.sizes)[number];
