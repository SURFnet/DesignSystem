import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretUpDown,
  phosphorSignOut,
  phosphorTerminalWindow,
} from '@ng-icons/phosphor-icons/regular';
import {
  HlmAvatarImports,
  HlmDropdownMenuImports,
  HlmSidebarImports,
} from '@surfnet/curve-angular';
import { MOCK_USER } from '../lib/mock-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  imports: [
    HlmAvatarImports,
    HlmDropdownMenuImports,
    HlmSidebarImports,
    NgIcon,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [
    provideIcons({
      phosphorCaretUpDown,
      phosphorSignOut,
      phosphorTerminalWindow,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {
  private readonly router = inject(Router);

  protected readonly user = MOCK_USER;

  protected readonly userInitials = this.user.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  protected signOut(): void {
    this.router.navigateByUrl('/login');
  }
}
