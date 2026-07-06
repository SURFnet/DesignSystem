import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo',
  },
  {
    path: 'demo',
    pathMatch: 'full',
    component: DemoComponent,
  },
];
