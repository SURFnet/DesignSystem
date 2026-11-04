import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorImage } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'data-table-image-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  providers: [provideIcons({ phosphorImage })],
  template: `
    @if (imageUrl()) {
      <img [src]="imageUrl()" width="40" height="40" alt="" />
    } @else {
      <ng-icon name="phosphorImage" size="40" aria-hidden="true" />
    }
  `,
})
export class DataTableImageCell {
  public readonly imageUrl = input<string>();
}
