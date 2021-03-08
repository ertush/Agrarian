import { formValidationMessages } from './validation.messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, HostBinding, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import isMobileTablet from '../shared/deviceUtil';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-signin',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signin.template.html'
})

export class SigninComponent {

    @ViewChild('password') public passwordTxtbox: TextBoxComponent;
    @ViewChild('newPassword') public newPasswordTxtbox: TextBoxComponent;
    @ViewChild('confirmPassword') public confirmTxtbox: TextBoxComponent;

    public isMobile = isMobileTablet();
    public userName = '';
    public isSignUp: boolean;
    public marginTopExp;
    public formValidationMessages = formValidationMessages;


    public loginForm: FormGroup = new FormGroup({
        userEmail: new FormControl('', Validators.compose([
            Validators.required,
            Validators.email  // '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\@\!\#\%\^\&\*a-zA-Z0-9]+$'
        ])),
        password: new FormControl('', Validators.compose([
            Validators.minLength(5),
	 	    Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]))
    }
    );

    public signUpForm = new FormGroup({
        userName: new FormControl(''),
        signUpEmail: new FormControl('', Validators.compose([
            Validators.required,
            Validators.email
        ])),
        newPassword: new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])),
        confirmPassword: new FormControl('', Validators.compose([
             Validators.required
        ]))
     },
        this.passwordMatchValidator
    );

    public passwordMatchValidator(g: FormGroup) {
        return g.get('newPassword').value === g.get('confirmPassword').value
           ? null : {'mismatch': true};
     }

    constructor(private router: Router, private authService: AuthService) {
        this.isSignUp = false;
        this.marginTopExp = 22;
    }

    @HostBinding('attr.id') protected get id(): string {
        return 'login';
    }

    @HostBinding('class') protected get appClass(): string {
        return 'justify-content-center';
    }

    // tslint:disable-next-line: use-life-cycle-interface
    public ngAfterViewInit(): void {
        this.passwordTxtbox.input.nativeElement.type = 'password';
    }

    public toggleVisibility(): void {
        const elemPwd = this.passwordTxtbox.input.nativeElement;
        elemPwd.type = elemPwd.type === 'password' ? 'text' : 'password';

    }


    public onLoginClick(formValues: any): void {
        // console.log({formValues});

        this.authService.doEmailLogin(formValues)
        .then(res => console.log({emailLoginResponse: res}))
        .catch(err => console.log({emailLoginError: err}));
        
        // this.router.navigate(['./dashboard']);
    }

    public onSignUpClick(): void {

        this.isSignUp = true;
        this.marginTopExp = 'auto';
    }

    public onCreateAccount(formValues: any): void {
        console.log({formValues});
        // this.isSignUp = false;
        // this.marginTopExp = 22;
    }

    public submitForm(): void {
        this.loginForm.markAllAsTouched();
    }

    public clearForm(): void {
        this.loginForm.reset();
    }

    public onGoogleSignIn(): void {
        this.authService.doGoogleLogin()
        .then(res => {

            if (this.authService.opType === res.operationType && this.authService.userProfile.verified_email){
                this.router.navigate(['./dashboard']);
            }
            // console.log({LoginResponse: res}); // Debug

        })    
        .catch(err => console.log({googleLoginError: err}));
    }

    public onFacebookSignIn(): void {
        this.authService.doFacebookLogin()
        .then(res => console.log({facebookLoginResponse: res}))
        .catch(err => console.log({facebookLoginError: err}))
    }

    public onRegister() {

    }
}
