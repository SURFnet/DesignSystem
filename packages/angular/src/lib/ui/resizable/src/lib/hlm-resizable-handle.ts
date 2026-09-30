import { ChangeDetectionStrategy, Component, computed, ElementRef, inject } from '@angular/core';
import { BrnResizableGroup, BrnResizableHandle } from '@spartan-ng/brain/resizable';
import { classes } from '../../../utils/src';
import { HlmResizableGroup } from './hlm-resizable-group';

@Component({
  selector: 'hlm-resizable-handle',
  exportAs: 'hlmResizableHandle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: BrnResizableHandle, inputs: ['withHandle', 'disabled'] }],
  host: {
    'data-slot': 'resizable-handle',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-grabbed]': 'isDragging() ? "true" : "false"',
    '[attr.aria-valuenow]': '_valueNow()',
  },
  template: `
    @if (_brnResizableHandle.withHandle()) {
      <div class="curve-resizable-grip"></div>
    }
  `,
})
export class HlmResizableHandle {
  protected readonly _brnResizableHandle = inject(BrnResizableHandle);
  private readonly _el = inject(ElementRef<HTMLElement>);
  private readonly _brnGroup = inject(BrnResizableGroup);
  private readonly _group = inject(HlmResizableGroup, { optional: true });

  /** Whether this handle is currently being dragged. */
  readonly isDragging = computed(
    () => this._group?.isHandleDragging(this._el.nativeElement) ?? false,
  );

  private readonly _handleIndex = computed(() => {
    const panels = this._brnGroup.panels();
    const prev = this._el.nativeElement.previousElementSibling;
    if (!prev) {
      return -1;
    }
    return panels.findIndex((panel) => panel.el.nativeElement === prev);
  });

  protected readonly _valueNow = computed(() => {
    const index = this._handleIndex();
    if (index < 0) {
      return 0;
    }
    return Math.round(this._brnGroup.layout()[index] ?? 0);
  });

  constructor() {
    classes(() => ['curve-resizable-handle']);
  }
}
