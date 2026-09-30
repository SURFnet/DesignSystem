import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAccordionContent } from '@spartan-ng/brain/accordion';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-accordion-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: BrnAccordionContent, inputs: ['style'] }],
  host: {
    'data-slot': 'accordion-content',
  },
  template: `
    <div class="curve-accordion-content-inner">
      <ng-content />
    </div>
  `,
})
export class HlmAccordionContent {
  constructor() {
    classes(() => 'curve-accordion-content');
  }
}
