import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmSeparator } from '../../../separator/src';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-field-separator',
  imports: [HlmSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'field-separator' },
  template: `
    <hlm-separator class="curve-field-separator-line" />
    <span data-slot="field-separator-content" class="curve-field-separator-content">
      <ng-content />
    </span>
  `,
})
export class HlmFieldSeparator {
  constructor() {
    // Styling lives in ./hlm-field.css.
    classes(() => 'curve-field-separator');
  }
}
