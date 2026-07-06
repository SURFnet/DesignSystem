import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HlmSelectImports } from '@surfnet/curve-angular';
import { APP_CATEGORIES, type AppCategoryFilter } from '../lib/mock-data';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  imports: [HlmSelectImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
  public readonly category = input.required<AppCategoryFilter>();
  public readonly categoryChange = output<AppCategoryFilter>();

  protected readonly categories = APP_CATEGORIES;

  protected onValueChange(value: AppCategoryFilter | null | undefined): void {
    if (value) {
      this.categoryChange.emit(value);
    }
  }
}
