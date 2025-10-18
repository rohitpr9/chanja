import { Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'list', loadComponent: () => import('./home/components/list/list.component').then(load => load.ListComponent) },
    { path: 'login', loadComponent: () => import('./core/admin.components/login/login.component').then(load => load.LoginComponent) }
];
