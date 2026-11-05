import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';
import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createMenuPosition, type MenuAlign, type MenuSide } from '@spartan-ng/brain/core';
import { injectHlmContextMenuConfig } from './hlm-context-menu-token';

@Directive({
  selector: '[hlmContextMenuTrigger]',
  hostDirectives: [
    {
      directive: CdkContextMenuTrigger,
      inputs: [
        'cdkContextMenuTriggerFor: hlmContextMenuTrigger',
        'cdkContextMenuTriggerData: hlmContextMenuTriggerData',
        'cdkContextMenuDisabled: disabled',
      ],
      outputs: [
        'cdkContextMenuOpened: hlmContextMenuOpened',
        'cdkContextMenuClosed: hlmContextMenuClosed',
      ],
    },
  ],
  host: {
    'data-slot': 'context-menu-trigger',
    // Focusable so keyboard users can open the menu with Shift+F10 or the Menu key (WCAG 2.1.1).
    '[attr.tabindex]': 'disabled() ? null : 0',
    '(keydown)': '_onKeydown($event)',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class HlmContextMenuTrigger {
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _cdkTrigger = inject(CdkContextMenuTrigger, { host: true });
  private readonly _config = injectHlmContextMenuConfig();

  public readonly disabled = input<boolean, BooleanInput>(this._cdkTrigger.disabled, {
    transform: booleanAttribute,
  });

  public readonly align = input<MenuAlign>(this._config.align);
  public readonly side = input<MenuSide>(this._config.side);

  private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

  /**
   * Shift+F10 or the Menu key opens the menu. Not every browser fires `contextmenu` for these
   * keys, so fire it ourselves, positioned at the bottom-left corner of the trigger.
   */
  protected _onKeydown(event: KeyboardEvent): void {
    const isMenuKey = event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10');
    if (event.defaultPrevented || !isMenuKey || this.disabled()) return;
    event.preventDefault();
    const element = this._host.nativeElement;
    const rect = element.getBoundingClientRect();
    element.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: rect.left,
        clientY: rect.bottom,
      }),
    );
  }

  constructor() {
    // once the trigger opens we wait until the next tick and then grab the last position
    // used to position the menu. we store this in our trigger which the brnMenu directive has
    // access to through DI
    this._cdkTrigger.opened.pipe(takeUntilDestroyed()).subscribe(() =>
      setTimeout(
        () =>
          // eslint-disable-next-line
          ((this._cdkTrigger as any)._spartanLastPosition = // eslint-disable-next-line
            (this._cdkTrigger as any).overlayRef._positionStrategy._lastPosition),
      ),
    );

    effect(() => {
      this._cdkTrigger.menuPosition = this._menuPosition();
    });

    // Return focus to the trigger when the menu closes and focus was left on the page body
    // (WCAG 2.4.3), as React's Base UI context menu does.
    this._cdkTrigger.closed.pipe(takeUntilDestroyed()).subscribe(() =>
      setTimeout(() => {
        const active = document.activeElement;
        if (!active || active === document.body) this._host.nativeElement.focus();
      }),
    );
  }
}
