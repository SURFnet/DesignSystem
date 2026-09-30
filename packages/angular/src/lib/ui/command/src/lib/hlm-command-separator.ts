import { Directive } from '@angular/core';
import { BrnCommandSeparator } from '@spartan-ng/brain/command';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmCommandSeparator],hlm-command-separator',
  hostDirectives: [BrnCommandSeparator],
  host: {
    'data-slot': 'command-separator',
    '[attr.role]': '"presentation"',
    '[attr.aria-hidden]': 'true',
  },
})
export class HlmCommandSeparator {
  constructor() {
    classes(() => 'curve-command-separator');
  }
}
