import { Directive } from '@angular/core';
import { BrnCommand } from '@spartan-ng/brain/command';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmCommand],hlm-command',
  hostDirectives: [
    {
      directive: BrnCommand,
      inputs: ['id', 'filter', 'search', 'disabled'],
      outputs: ['valueChange', 'searchChange'],
    },
  ],
  host: {
    'data-slot': 'command',
  },
})
export class HlmCommand {
  constructor() {
    classes(() => 'curve-command');
  }
}
