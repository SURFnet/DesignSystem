import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import { injectMicrocopy } from '../../../../microcopy';

@Directive({
  selector: '[hlmPagination],hlm-pagination',
  host: {
    'data-slot': 'pagination',
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class HlmPagination {
  /** The aria-label for the pagination component. */
  public readonly ariaLabel = input<string>(injectMicrocopy()['pagination.label'], {
    alias: 'aria-label',
  });

  constructor() {
    classes(() => 'curve-pagination');
  }
}
