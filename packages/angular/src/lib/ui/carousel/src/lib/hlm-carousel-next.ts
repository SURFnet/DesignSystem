import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight } from '@ng-icons/phosphor-icons/regular';
import { HlmButton, provideBrnButtonConfig } from '../../../button/src';
import { HlmIcon } from '../../../icon/src';
import { hlm } from '../../../utils/src';
import { HlmCarousel } from './hlm-carousel';

@Component({
  selector: 'button[hlm-carousel-next], button[hlmCarouselNext]',
  imports: [NgIcon, HlmIcon],
  providers: [
    provideIcons({ phosphorArrowRight }),
    provideBrnButtonConfig({ variant: 'outline', size: 'icon' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
  host: {
    'data-slot': 'carousel-next',
    '[disabled]': 'isDisabled()',
    '(click)': '_carousel.scrollNext()',
  },
  template: `
    <ng-icon hlm size="sm" name="phosphorArrowRight" class="curve-carousel-nav-icon" />
    <span class="sr-only">Next slide</span>
  `,
})
export class HlmCarouselNext {
  private readonly _button = inject(HlmButton);
  protected readonly _carousel = inject(HlmCarousel);
  private readonly _computedClass = computed(() =>
    hlm(
      'curve-carousel-nav curve-carousel-nav--next',
      this._carousel.orientation() === 'horizontal'
        ? 'curve-carousel-nav--horizontal'
        : 'curve-carousel-nav--vertical',
    ),
  );
  protected readonly isDisabled = () => !this._carousel.canScrollNext();

  constructor() {
    effect(() => {
      const computedClass = this._computedClass();

      untracked(() => this._button.setClass(computedClass));
    });
  }
}
