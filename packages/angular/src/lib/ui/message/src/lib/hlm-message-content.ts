import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmMessageContent],hlm-message-content',
  host: { 'data-slot': 'message-content' },
})
export class HlmMessageContent {
  constructor() {
    classes(() => 'curve-message-content');
  }
}
