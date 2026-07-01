import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretUpDown,
  phosphorMagnifyingGlass,
  phosphorSubtractSquare,
  phosphorTerminalWindow,
} from '@ng-icons/phosphor-icons/regular';
import {
  HlmBreadcrumbImports,
  HlmSidebarImports,
  HlmSeparatorImports,
  HlmInputGroupImports,
} from '@surfnet/angular';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  imports: [
    HlmSidebarImports,
    HlmBreadcrumbImports,
    HlmInputGroupImports,
    HlmSeparatorImports,
    NgIcon,
  ],
  providers: [
    provideIcons({
      phosphorCaretUpDown,
      phosphorMagnifyingGlass,
      phosphorSubtractSquare,
      phosphorTerminalWindow,
    }),
  ],
})
export class DemoComponent {}
