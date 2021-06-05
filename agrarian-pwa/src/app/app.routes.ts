import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';

/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */

export const AppRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/signin' },
    { path: 'home',  component: HomeComponent },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'reports',  component: ReportsComponent },
    { path: 'settings',  component: ProfileComponent },
    { path: 'signin',  component: SigninComponent }
];
