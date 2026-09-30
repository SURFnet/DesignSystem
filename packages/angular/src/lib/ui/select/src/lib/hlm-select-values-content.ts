import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({ selector: '[hlmSelectValuesContent],hlm-select-values-content' })
export class HlmSelectValuesContent {
  constructor() {
    classes(() => 'curve-select-values-content');
  }
}
