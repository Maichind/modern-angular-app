import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./presentation/layout/layout.route').then((m) => m.LAYOUT_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./presentation/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./presentation/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
