import { Directive } from '@angular/core';
import { BrnCommandItem } from '@spartan-ng/brain/command';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'button[hlmCommandItem],button[hlm-command-item]',
  hostDirectives: [
    {
      directive: BrnCommandItem,
      inputs: ['value', 'disabled', 'id'],
      outputs: ['selected'],
    },
  ],
  host: {
    'data-slot': 'command-item',
    role: 'option',
  },
})
export class HlmCommandItem {
  constructor() {
    classes(() => 'curve-command-item');
  }
}
