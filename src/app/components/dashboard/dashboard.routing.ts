import { Routes } from '@angular/router';
import { usersGuardCanMatch } from './shared/guards/users-guard/users-guard';

export default [
  {
    path: '',
    loadComponent: () => import('./dashboard'),
    providers: [
      // provideState(dashboardFeature),
      // provideEffects(DashboardEffects),
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./core/home/dashboard-home').then(c => c.DashboardHome),
      },
      {
        path: 'users',
        loadComponent: () => import('./users-management/users-management').then(c => c.UsersManagement),
        // canActivate: [usersGuardCanActivate],
        canMatch: [usersGuardCanMatch]
      },
      {
        path: 'products',
        loadComponent: () => import('./products-management/dashboard-product-management').then(c => c.ProductsManagement),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/dashboard-settings').then(c => c.DashboardSettings),
      },
      // {
      //   path: '**',
      //   redirectTo: '',
      //   pathMatch: 'full',
      // },
    ]
  },
] satisfies Routes;
