import { Login } from './pages/login';
import { Routes } from '@angular/router';
import { Register } from './pages/register';
import { provideAuthFeature } from './store/auth.provider';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [...provideAuthFeature],
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
