import { Directive } from '@angular/core';
import { BrnAvatarFallback } from '@spartan-ng/brain/avatar';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAvatarFallback]',
  exportAs: 'avatarFallback',
  hostDirectives: [BrnAvatarFallback],
  host: {
    'data-slot': 'avatar-fallback',
  },
})
export class HlmAvatarFallback {
  constructor() {
    classes(() => 'curve-avatar-fallback');
  }
}
