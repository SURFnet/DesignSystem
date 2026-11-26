import { Directive, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmCarousel } from './hlm-carousel';

@Directive({
  selector: '[hlmCarouselItem],hlm-carousel-item',
  host: {
    'data-slot': 'carousel-item',
    role: 'group',
    '[attr.aria-roledescription]': 'roleDescription()',
  },
})
export class HlmCarouselItem {
  /** What a screen reader calls one item, instead of "group". */
  public readonly roleDescription = input<string>('slide', { alias: 'aria-roledescription' });
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
