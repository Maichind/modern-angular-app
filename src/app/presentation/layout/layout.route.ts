import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { authGuard } from '@core/infrastructure/auth/guards/auth.guard';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('../../presentation/feed/pages/feed').then(m => m.Feed),
      },
      {
        path: 'profile/:username',
        loadComponent: () =>
          import('../../presentation/profile/profile-page').then(m => m.ProfilePage),
      },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  },
];
