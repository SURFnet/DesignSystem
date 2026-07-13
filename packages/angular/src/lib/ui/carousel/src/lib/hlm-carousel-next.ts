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
    <ng-icon hlm size="sm" name="phosphorArrowRight" class="rtl:rotate-180" />
    <span class="sr-only">Next slide</span>
  `,
})
export class HlmCarouselNext {
  private readonly _button = inject(HlmButton);
  protected readonly _carousel = inject(HlmCarousel);
  private readonly _computedClass = computed(() =>
    hlm(
      'rounded-full absolute h-8 w-8',
      this._carousel.orientation() === 'horizontal'
        ? '-end-12 top-1/2 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
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
