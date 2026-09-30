import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowLeft } from '@ng-icons/phosphor-icons/regular';
import { HlmButton, provideBrnButtonConfig } from '../../../button/src';
import { HlmIcon } from '../../../icon/src';
import { hlm } from '../../../utils/src';
import { HlmCarousel } from './hlm-carousel';

@Component({
  selector: 'button[hlm-carousel-previous], button[hlmCarouselPrevious]',
  imports: [NgIcon, HlmIcon],
  providers: [
    provideIcons({ phosphorArrowLeft }),
    provideBrnButtonConfig({ variant: 'outline', size: 'icon' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
  host: {
    'data-slot': 'carousel-previous',
    '[disabled]': 'isDisabled()',
    '(click)': '_carousel.scrollPrev()',
  },
  template: `
    <ng-icon hlm size="sm" name="phosphorArrowLeft" class="curve-carousel-nav-icon" />
    <span class="sr-only">Previous slide</span>
  `,
})
export class HlmCarouselPrevious {
  private readonly _button = inject(HlmButton);

  protected readonly _carousel = inject(HlmCarousel);

  private readonly _computedClass = computed(() =>
    hlm(
      'curve-carousel-nav curve-carousel-nav--previous',
      this._carousel.orientation() === 'horizontal'
        ? 'curve-carousel-nav--horizontal'
        : 'curve-carousel-nav--vertical',
    ),
  );
  protected readonly isDisabled = () => !this._carousel.canScrollPrev();

  constructor() {
    effect(() => {
      const computedClass = this._computedClass();
      untracked(() => this._button.setClass(computedClass));
    });
  }
}
