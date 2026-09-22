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
      <div class="bg-border h-6 w-1 rounded-lg z-10 flex shrink-0"></div>
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
    classes(() => [
      'bg-border ring-offset-background focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      'data-[panel-group-direction=horizontal]:hover:cursor-ew-resize data-[panel-group-direction=vertical]:hover:cursor-ns-resize',
    ]);
  }
}
