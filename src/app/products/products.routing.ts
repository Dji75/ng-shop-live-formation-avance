import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list').then(c => c.ProductList),
  },
  {
    path: 'create',
    loadComponent: () => import('./product-form/product-form').then(c => c.ProductForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./product-detail/product-detail').then(c => c.ProductDetail),
  }
] satisfies Routes;
