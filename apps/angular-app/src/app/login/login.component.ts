import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  HlmButtonImports,
  HlmCardImports,
  HlmFieldImports,
  HlmInputImports,
} from '@surfnet/curve-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [HlmButtonImports, HlmCardImports, HlmFieldImports, HlmInputImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly router = inject(Router);

  protected readonly pending = signal(false);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.pending.set(true);
    this.router.navigateByUrl('/browse-apps');
  }
}
