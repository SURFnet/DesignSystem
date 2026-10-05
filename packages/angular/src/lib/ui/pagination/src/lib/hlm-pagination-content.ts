import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'ul[hlmPaginationContent]',
  host: { 'data-slot': 'pagination-content' },
})
export class HlmPaginationContent {
  constructor() {
    classes(() => 'curve-pagination-content');
  }
}
