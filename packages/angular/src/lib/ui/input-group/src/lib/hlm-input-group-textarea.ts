import { Directive } from '@angular/core';
import { HlmTextarea } from '../../../textarea/src';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'textarea[hlmInputGroupTextarea]',
  hostDirectives: [HlmTextarea],
  host: { 'data-slot': 'input-group-control' },
})
export class HlmInputGroupTextarea {
  constructor() {
    // On top of hlmTextarea's `curve-textarea`; styling lives in ./hlm-input-group.css.
    classes(() => 'curve-input-group-control curve-input-group-control--textarea');
  }
}
