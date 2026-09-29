import { Directive, input } from '@angular/core';
import type { MessageAlignName } from '@surfnet/curve-contracts';
import { classes } from '../../../utils/src';

export type MessageAlign = MessageAlignName;

@Directive({
  selector: '[hlmMessage],hlm-message',
  host: {
    'data-slot': 'message',
    '[attr.data-align]': 'align()',
    // Prevent the legacy HTML `align` attribute from forcing text-align.
    '[attr.align]': 'null',
  },
})
export class HlmMessage {
  public readonly align = input<MessageAlign>('start');

  constructor() {
    classes(() => 'group/message curve-message');
  }
}
