import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';
import { HlmInputGroupImports } from '@surfnet/curve-angular';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-apps-search',
  templateUrl: './apps-search.component.html',
  imports: [HlmInputGroupImports, NgIcon],
  providers: [provideIcons({ phosphorMagnifyingGlass })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppsSearchComponent {
  public readonly search = input('');
  public readonly searchChange = output<string>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly input$ = new Subject<string>();

  constructor() {
    const subscription = this.input$.pipe(debounceTime(250)).subscribe((value) => {
      this.searchChange.emit(value);
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.input$.next(value);
  }
}
