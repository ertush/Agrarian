import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { HomeComponent } from './home/home.component';
import { IssuesComponent } from './issues';
import { ProfileComponent } from './profile';
import { SigninComponent } from './signin';

/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */

export const AppRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/signin' },
    { path: 'home',  component: HomeComponent },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'issues',  component: IssuesComponent },
    { path: 'profile',  component: ProfileComponent },
    { path: 'signin',  component: SigninComponent }
];
