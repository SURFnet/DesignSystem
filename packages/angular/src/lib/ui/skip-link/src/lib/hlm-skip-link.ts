import { DOCUMENT } from '@angular/common';
import { Directive, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'a[hlmSkipLink]',
  host: {
    'data-slot': 'skip-link',
    '[attr.href]': 'href()',
    '(click)': 'onClick($event)',
  },
})
export class HlmSkipLink {
  private readonly _document = inject(DOCUMENT);

  /** Fragment pointing at the id of the element to skip to. */
  public readonly href = input<string>('#main-content');

  constructor() {
    // Styling lives in ./hlm-skip-link.css.
    classes(() => 'curve-skip-link');
  }

  protected onClick(event: MouseEvent): void {
    // Handle the jump ourselves: with a <base href> a bare fragment link resolves against
    // the base URL (a full navigation), and not every browser moves focus to a
    // non-focusable target.
    if (!event.defaultPrevented && this.focusTarget()) event.preventDefault();
  }

  /**
   * Moves focus to the element whose id matches the `#fragment` in `href`. A target that
   * isn't focusable on its own (e.g. `<main>`) gets a temporary `tabindex="-1"`, removed
   * again on blur so it doesn't linger as a click-to-focus region. Returns whether it did.
   */
  private focusTarget(): boolean {
    const href = this.href();
    if (!href.startsWith('#') || href.length < 2) return false;
    const target = this._document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return false;

    if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus();
    return this._document.activeElement === target;
  }
}
