import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./component/customer-list/customer-list.component')
    },

    {
        path: 'nuevo',
        loadComponent: () => import('./component/customer-form/customer-form.component')
    },

    {
        path: ':id/editar',
        loadComponent: () => import('./component/customer-form/customer-form.component')
    }
];
