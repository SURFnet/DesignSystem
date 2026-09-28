import { Directive, inject } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmCarousel } from './hlm-carousel';

@Directive({
  selector: '[hlmCarouselContent],hlm-carousel-content',
  host: {
    'data-slot': 'carousel-content',
  },
})
export class HlmCarouselContent {
  private readonly _orientation = inject(HlmCarousel).orientation;

  constructor() {
    // Styling lives in ./hlm-carousel.css.
    classes(() => [
      'curve-carousel-content',
      this._orientation() === 'horizontal'
        ? 'curve-carousel-content--horizontal'
        : 'curve-carousel-content--vertical',
    ]);
  }
}
