import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAvatarGroupCount],hlm-avatar-group-count',
  host: {
    'data-slot': 'avatar-group-count',
  },
})
export class HlmAvatarGroupCount {
  constructor() {
    classes(() => 'curve-avatar-group-count');
  }
}
