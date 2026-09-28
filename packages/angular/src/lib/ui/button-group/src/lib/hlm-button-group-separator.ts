import { Directive } from '@angular/core';
import { BrnSeparator, provideBrnSeparatorConfig } from '@spartan-ng/brain/separator';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmButtonGroupSeparator],hlm-button-group-separator',
  providers: [provideBrnSeparatorConfig({ orientation: 'vertical' })],
  hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }],
  host: {
    'data-slot': 'button-group-separator',
  },
})
export class HlmButtonGroupSeparator {
  constructor() {
    // Styling lives in ./hlm-button-group.css.
    classes(() => 'curve-button-group-separator');
  }
}
