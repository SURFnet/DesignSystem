import { Directive, input } from '@angular/core';
import { injectMicrocopy } from '../../../../microcopy';

@Directive({
  selector: '[hlmBreadcrumb]',
  host: {
    'data-slot': 'breadcrumb',
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class HlmBreadcrumb {
  public readonly ariaLabel = input<string>(injectMicrocopy()['breadcrumb.label'], {
    alias: 'aria-label',
  });
}
