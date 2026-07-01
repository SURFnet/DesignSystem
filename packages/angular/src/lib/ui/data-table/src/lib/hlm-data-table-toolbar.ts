import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

/**
 * Layout wrapper for data-table controls (filter inputs, column toggles, actions). Mirrors
 * React's `DataTableToolbar` — a styled flex row above the table.
 */
@Directive({
  selector: '[hlmDataTableToolbar]',
  host: { 'data-slot': 'data-table-toolbar' },
})
export class HlmDataTableToolbar {
  constructor() {
    classes(() => 'flex items-center gap-2 py-4');
  }
}
