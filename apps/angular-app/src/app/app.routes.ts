import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppShellComponent } from './shell/app-shell.component';
import { BrowseAppsComponent } from './browse-apps/browse-apps.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'browse-apps',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: 'browse-apps',
        component: BrowseAppsComponent,
      },
    ],
  },
];
