import { DestroyRef, Directive, inject, signal } from '@angular/core';
import { BrnResizableGroup } from '@spartan-ng/brain/resizable';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmResizableGroup],hlm-resizable-group',
  exportAs: 'hlmResizableGroup',
  hostDirectives: [
    {
      directive: BrnResizableGroup,
      inputs: ['direction', 'layout'],
      outputs: ['dragEnd', 'dragStart', 'layoutChange'],
    },
  ],
  host: {
    'data-slot': 'resizable-group',
  },
})
export class HlmResizableGroup {
  private readonly _brn = inject(BrnResizableGroup);
  private readonly _isDragging = signal(false);
  private readonly _draggingHandle = signal<HTMLElement | null>(null);

  /** Whether a handle in this group is currently being dragged. */
  readonly isDragging = this._isDragging.asReadonly();

  constructor() {
    classes(
      () =>
        'group flex h-full w-full overflow-hidden data-[panel-group-direction=vertical]:flex-col',
    );

    // Brain does not expose drag state; wrap startResize / dragEnd (emitted from _endResize).
    const startResize = this._brn.startResize.bind(this._brn);
    this._brn.startResize = (handleIndex: number, event: MouseEvent | TouchEvent) => {
      const target = event.target;
      const handle =
        target instanceof Element
          ? (target.closest('[data-slot="resizable-handle"]') as HTMLElement | null)
          : null;
      this._draggingHandle.set(handle);
      this._isDragging.set(true);
      startResize(handleIndex, event);
    };

    const dragEnd = this._brn.dragEnd.subscribe(() => this._clearDrag());
    inject(DestroyRef).onDestroy(() => {
      dragEnd.unsubscribe();
      this._clearDrag();
    });
  }

  /** @internal Whether `handle` is the handle currently being dragged. */
  isHandleDragging(handle: HTMLElement): boolean {
    return this._isDragging() && this._draggingHandle() === handle;
  }

  private _clearDrag() {
    this._isDragging.set(false);
    this._draggingHandle.set(null);
  }
}
