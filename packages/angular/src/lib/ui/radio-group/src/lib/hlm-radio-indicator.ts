import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-radio-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'radio-group-indicator',
  },
  template: ` <div class="curve-radio-indicator-dot"></div> `,
})
export class HlmRadioIndicator {
  constructor() {
    classes(() => 'curve-radio-indicator');
  }
}
