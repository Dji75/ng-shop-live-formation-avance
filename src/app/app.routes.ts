import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';
import { usersFeature } from './users/store/users.reducer';
import { UsersEffects } from './users/store/users.effects';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.routing'),
    canMatch: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.routing'),
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users').then(c => c.Users),
    providers: [
      provideState(usersFeature),
      provideEffects(UsersEffects),
    ]
  },
  {
    path: 'signals',
      loadComponent: () => import('./signals/signals').then(c => c.Signals),
  },
];
