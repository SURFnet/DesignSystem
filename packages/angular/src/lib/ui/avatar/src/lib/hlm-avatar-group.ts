import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAvatarGroup],hlm-avatar-group',
  host: {
    'data-slot': 'avatar-group',
  },
})
export class HlmAvatarGroup {
  constructor() {
    classes(() => 'curve-avatar-group group/avatar-group');
  }
}
