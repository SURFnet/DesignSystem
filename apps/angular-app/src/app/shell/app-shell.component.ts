import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmSidebarImports } from '@surfnet/curve-angular';
import { AppSidebarComponent } from './app-sidebar.component';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  imports: [AppSidebarComponent, HlmSidebarImports, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {}
