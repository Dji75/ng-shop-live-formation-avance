import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.routing'),
    canMatch: [authGuard],
  }
];
