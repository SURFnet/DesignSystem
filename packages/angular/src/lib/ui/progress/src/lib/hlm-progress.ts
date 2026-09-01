import { Directive, input } from '@angular/core';
import { BrnProgress } from '@spartan-ng/brain/progress';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'hlm-progress,[hlmProgress]',
  hostDirectives: [{ directive: BrnProgress, inputs: ['value', 'max', 'getValueLabel'] }],
  host: {
    role: 'progressbar',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
  },
})
export class HlmProgress {
  /** The aria-label for the progress bar. */
  public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  /** The aria-labelledby for the progress bar. */
  public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });

  constructor() {
    classes(() => 'bg-muted h-1.5 rounded-full relative inline-flex w-full overflow-hidden');
  }
}
