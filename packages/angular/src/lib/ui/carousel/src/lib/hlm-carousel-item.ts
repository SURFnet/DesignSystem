import { Directive, inject } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmCarousel } from './hlm-carousel';

@Directive({
  selector: '[hlmCarouselItem],hlm-carousel-item',
  host: {
    'data-slot': 'carousel-item',
    role: 'group',
    'aria-roledescription': 'slide',
  },
})
export class HlmCarouselItem {
  private readonly _orientation = inject(HlmCarousel).orientation;

  constructor() {
    classes(() => [
      'curve-carousel-item',
      this._orientation() === 'horizontal'
        ? 'curve-carousel-item--horizontal'
        : 'curve-carousel-item--vertical',
    ]);
  }
}
