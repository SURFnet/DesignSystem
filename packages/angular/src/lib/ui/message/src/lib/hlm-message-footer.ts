import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmMessageFooter],hlm-message-footer',
  host: { 'data-slot': 'message-footer' },
})
export class HlmMessageFooter {
  constructor() {
    classes(() => 'curve-message-footer');
  }
}
