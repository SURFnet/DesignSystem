import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAvatarBadge],hlm-avatar-badge',
  host: {
    'data-slot': 'avatar-badge',
  },
})
export class HlmAvatarBadge {
  constructor() {
    classes(() => 'curve-avatar-badge');
  }
}
