import { Directive, input, signal } from '@angular/core';
import { injectExposesStateProvider } from '@spartan-ng/brain/core';
import type { AlertDialogSizeName } from '@surfnet/curve-contracts';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertDialogContent],hlm-alert-dialog-content',
  host: {
    'data-slot': 'alert-dialog-content',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
  },
})
export class HlmAlertDialogContent {
  private readonly _stateProvider = injectExposesStateProvider({ optional: true, host: true });
  public readonly state = this._stateProvider?.state ?? signal('closed');

  public readonly size = input<AlertDialogSizeName>('default');

  constructor() {
    classes(() => 'curve-alert-dialog-content group/alert-dialog-content');
  }
}
