import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmMessageGroup],hlm-message-group',
  host: { 'data-slot': 'message-group' },
})
export class HlmMessageGroup {
  constructor() {
    classes(() => 'gap-2.5 flex min-w-0 flex-col');
  }
}
