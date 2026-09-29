import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmMessageHeader],hlm-message-header',
  host: { 'data-slot': 'message-header' },
})
export class HlmMessageHeader {
  constructor() {
    classes(() => 'curve-message-header');
  }
}
