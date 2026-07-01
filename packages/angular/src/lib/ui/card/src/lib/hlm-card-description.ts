import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmCardDescription]',
  host: { 'data-slot': 'card-description' },
})
export class HlmCardDescription {
  constructor() {
    classes(() => 'text-muted-foreground text-sm');
  }
}
