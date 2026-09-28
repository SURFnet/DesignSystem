import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmBreadcrumbList]',
  host: {
    'data-slot': 'breadcrumb-list',
  },
})
export class HlmBreadcrumbList {
  constructor() {
    // Styling lives in ./hlm-breadcrumb.css.
    classes(() => 'curve-breadcrumb-list');
  }
}
