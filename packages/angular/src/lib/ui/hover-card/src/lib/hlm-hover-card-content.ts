import { Directive, ElementRef, Renderer2, effect, inject, signal } from '@angular/core';
import { injectExposedSideProvider, injectExposesStateProvider } from '@spartan-ng/brain/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmHoverCardContent],hlm-hover-card-content',
  host: {
    'data-slot': 'hover-card-content',
  },
})
export class HlmHoverCardContent {
  private readonly _renderer = inject(Renderer2);
  private readonly _element = inject(ElementRef);

  public readonly state =
    injectExposesStateProvider({ host: true }).state ?? signal('closed').asReadonly();
  public readonly side =
    injectExposedSideProvider({ host: true }).side ?? signal('bottom').asReadonly();

  constructor() {
    effect(() => {
      this._renderer.setAttribute(this._element.nativeElement, 'data-state', this.state());
      this._renderer.setAttribute(this._element.nativeElement, 'data-side', this.side());
    });

    classes(() => 'curve-hover-card-content');
  }
}
