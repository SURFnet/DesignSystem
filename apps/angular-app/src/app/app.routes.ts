import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { CustomDataTableComponent } from './custom-data-table/custom-data-table.component';

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
  {
    path: 'table',
    pathMatch: 'full',
    component: CustomDataTableComponent,
  },
];
