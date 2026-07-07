import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'data-table-image-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    @if (imageUrl()) {
      <img [src]="imageUrl()" width="40" height="40" />
    } @else {
      <ng-icon name="phosphorImage" size="40" />
    }
  `,
})
export class DataTableImageCell {
  public readonly imageUrl = input<string>();
}
