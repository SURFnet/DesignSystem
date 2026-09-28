import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInputGroupText],hlm-input-group-text',
})
export class HlmInputGroupText {
  constructor() {
    classes(() => 'curve-input-group-text');
  }
}
