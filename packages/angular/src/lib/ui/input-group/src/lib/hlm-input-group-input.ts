import { Directive } from '@angular/core';
import { HlmInput } from '../../../input/src';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'input[hlmInputGroupInput]',
  hostDirectives: [{ directive: HlmInput, inputs: ['optional', 'aria-required'] }],
  host: { 'data-slot': 'input-group-control' },
})
export class HlmInputGroupInput {
  constructor() {
    // On top of hlmInput's `curve-input`; styling lives in ./hlm-input-group.css.
    classes(() => 'curve-input-group-control');
  }
}
