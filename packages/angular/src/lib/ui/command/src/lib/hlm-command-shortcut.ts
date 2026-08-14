import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmCommandShortcut],hlm-command-shortcut',
  host: {
    'data-slot': 'command-shortcut',
  },
})
export class HlmCommandShortcut {
  constructor() {
    classes(() => 'text-muted-foreground ml-auto text-xs tracking-widest');
  }
}
