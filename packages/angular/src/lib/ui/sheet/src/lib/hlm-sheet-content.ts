import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorX } from '@ng-icons/phosphor-icons/regular';
import { injectExposedSideProvider, injectExposesStateProvider } from '@spartan-ng/brain/core';
import { HlmButton } from '../../../button/src';
import { HlmIconImports } from '../../../icon/src';
import { classes } from '../../../utils/src';
import { HlmSheetClose } from './hlm-sheet-close';

@Component({
  selector: 'hlm-sheet-content',
  imports: [HlmIconImports, HlmButton, HlmSheetClose],
  providers: [provideIcons({ phosphorX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sheet-content',
    '[attr.data-side]': '_sideProvider.side()',
    '[attr.data-state]': 'state()',
  },
  template: `
    <ng-content />

    @if (showCloseButton()) {
      <button hlmBtn variant="ghost" size="icon-sm" class="curve-sheet-close" hlmSheetClose>
        <span class="sr-only">Close</span>
        <ng-icon hlm size="sm" name="phosphorX" />
      </button>
    }
  `,
})
export class HlmSheetContent {
  private readonly _stateProvider = injectExposesStateProvider({ host: true });
  protected readonly _sideProvider = injectExposedSideProvider({ host: true });
  public readonly state = this._stateProvider.state ?? signal('closed');
  private readonly _renderer = inject(Renderer2);
  private readonly _element = inject(ElementRef);

  public readonly showCloseButton = input<boolean, BooleanInput>(true, {
    transform: booleanAttribute,
  });

  constructor() {
    // Styling (incl. slide in/out motion) lives in ./hlm-sheet.css.
    classes(() => 'curve-sheet-content');
    effect(() => {
      this._renderer.setAttribute(this._element.nativeElement, 'data-state', this.state());
    });
  }
}
