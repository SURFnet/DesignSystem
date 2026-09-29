import { defineContract } from './define-contract.js';

export const messageContract = defineContract({
  props: {
    aligns: ['start', 'end'],
  },
  defaults: {
    aligns: 'start',
  },
  docs: {
    description:
      'A single chat message: avatar, content, header and footer, aligned to the start or end of a conversation.',
    aligns: {
      start: 'Aligned to the start edge — messages from others (e.g. the assistant).',
      end: 'Aligned to the end edge, avatar mirrored — messages from the current user.',
    },
  },
});

export type MessageAlignName = (typeof messageContract.props.aligns)[number];
