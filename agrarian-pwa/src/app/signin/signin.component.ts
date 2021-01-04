import { Component, ViewEncapsulation, NgModule, HostBinding } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signin.template.html'
})
export class SigninComponent {

    public isSignUp: boolean;

    constructor(private router: Router) {
        this.isSignUp = false;
    }


    @HostBinding('attr.id') protected get id(): string {
        return 'login';
    }

    @HostBinding('class') protected get appClass(): string {
        return 'justify-content-center';
    }

    public onLoginClick(): void {
        this.router.navigate(['/dashboard']);
    }

    public onSignUpClick(): void {
        this.isSignUp = true;
    }

    public onCreateAccount(): void {
        this.isSignUp = false;
    }
}
