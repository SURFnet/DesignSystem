import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrnFieldControl } from '@spartan-ng/brain/field';
import { BrnSlider, BrnSliderImports, injectBrnSlider } from '@spartan-ng/brain/slider';
import { classes } from '../../../utils/src';
import { injectFieldDescribedBy } from '../../../field/src/lib/hlm-field-a11y';

@Component({
  selector: 'hlm-slider, brn-slider [hlm]',
  imports: [BrnSliderImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: BrnSlider,
      inputs: [
        'id',
        'value',
        'disabled',
        'min',
        'max',
        'step',
        'minStepsBetweenThumbs',
        'inverted',
        'orientation',
        'showTicks',
        'maxTicks',
        'tickLabelInterval',
        'formatTick',
        'draggableRange',
        'draggableRangeOnly',
        'aria-label',
        'aria-labelledby',
      ],
      outputs: ['valueChange'],
    },
  ],
  template: `
    <div class="curve-slider-control">
      <div brnSliderTrack class="curve-slider-track">
        <div class="curve-slider-range" brnSliderRange></div>
      </div>

      @for (i of _slider.thumbIndexes(); track i) {
        <span
          class="curve-slider-thumb"
          brnSliderThumb
          [attr.aria-invalid]="_fieldControl?.invalid() ? 'true' : null"
          [attr.aria-describedby]="_describedBy()"
        ></span>
      }
    </div>

    @if (_slider.showTicks()) {
      <div class="curve-slider-ticks">
        <div
          *brnSliderTick="let tick; let formattedTick = formattedTick"
          class="curve-slider-tick group"
        >
          <div class="curve-slider-tick-mark"></div>
          <div class="curve-slider-tick-label">{{ formattedTick }}</div>
        </div>
      </div>
    }
  `,
})
export class HlmSlider {
  protected readonly _slider = injectBrnSlider();

  // CURVE: a11y (issue #273) — Brain sets aria-invalid on the host; the focusable thumbs need it,
  // and the field's description and error.
  protected readonly _fieldControl = inject(BrnFieldControl, { optional: true });
  protected readonly _describedBy = injectFieldDescribedBy();

  constructor() {
    // Styling lives in ./hlm-slider.css; `group` stays as a hook for consumers' Tailwind.
    classes(() => ['curve-slider group']);
  }
}
