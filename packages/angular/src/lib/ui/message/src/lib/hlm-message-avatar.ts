import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmMessageAvatar],hlm-message-avatar',
  host: { 'data-slot': 'message-avatar' },
})
export class HlmMessageAvatar {
  constructor() {
    classes(() => 'curve-message-avatar');
  }
}
