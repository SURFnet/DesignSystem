import { computed, Directive } from '@angular/core';
import { injectBrnCommand } from '@spartan-ng/brain/command';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmCommandEmpty],hlm-command-empty',
  host: {
    'data-slot': 'command-empty',
    role: 'option',
    'aria-disabled': 'true',
    'aria-selected': 'false',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[hidden]': '!_isEmpty()',
  },
})
export class HlmCommandEmpty {
  private readonly _command = injectBrnCommand();
  protected readonly _isEmpty = computed(
    () => !this._command.items().some((item) => item.visible()),
  );

  constructor() {
    classes(() => 'py-6 text-center text-sm text-muted-foreground');
  }
}
