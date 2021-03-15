import { AngularFireAuth } from '@angular/fire/auth';
import { formValidationMessages } from './validation.messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, HostBinding, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import isMobileTablet from '../shared/deviceUtil';
import * as firebase from 'firebase/app';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
// import { User } from '../models/user';


@Component({
    selector: 'app-signin',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signin.template.html'
})

export class SigninComponent implements OnInit {

    @ViewChild('password') public passwordTxtbox: TextBoxComponent;
    @ViewChild('newPassword', {static: true}) public newPasswordTxtbox: TextBoxComponent;
    @ViewChild('confirmPassword', {static: true}) public confirmTxtbox: TextBoxComponent;

    public isMobile = isMobileTablet();
    public userName = '';
    public isSignUp: boolean;
    public marginTopExp;
    public formValidationMessages = formValidationMessages;

    isSignedIn: boolean;
    googleAuthProvider: any;
    facebookAuthProvider: any;
    error: any;
    errorCode: any;
    return = '';
    user: firebase.User;


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

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.isSignedIn = false;
        this.isSignUp = false;
        this.marginTopExp = 22;
        this.error = ' ';
      
        this.error = '';

        this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

        this.afAuth.auth.getRedirectResult()
        .then(result => {
            if(result.user) {
                this.isSignedIn = true;
                this.router.navigate(['./dashboard']);
            }
        })
        .catch(error => {
            this.errorCode = error.code;
            this.error = error.message;
        });

       

        this.afAuth.authState.subscribe(auth => {
            if (!auth) {
               this.router.navigateByUrl(this.return);
            }
         });
    }
    ngOnInit(): void {
        this.isSignedIn = true;
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
        this.isSignedIn = false;
        this.afAuth.auth.signInWithEmailAndPassword(formValues.userEmail, formValues.password)
        .then((success) => {
            if (success.user) { 
                this.isSignedIn = true;
                this.router.navigate(['./dashboard']);
            }
        })
        .catch(error => this.error = error.message);
    }

    public onSignUpClick(): void {

        this.isSignUp = true;
        this.marginTopExp = 'auto';
    }

    public onCreateAccount(formValues: any): void {
        console.log({formValues});

        this.afAuth.auth.createUserWithEmailAndPassword(formValues.signUpEmail, formValues.newPassword)
        .then((success) => {
            this.isSignUp = false;
        })
        .catch(err => {
            if (err.code == 'auth/weak-password') this.error = err;
            this.error = err;
            console.error({error: err.message});
            console.log(err.message);
        });
    }

    public submitForm(): void {
        this.loginForm.markAllAsTouched();
    }

    public clearForm(): void {
        this.loginForm.reset();
    }

    public onGoogleSignIn() {
        this.isSignedIn = false;
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithRedirect(this.googleAuthProvider);
    }

    public onFacebookSignIn(): void {
        this.isSignedIn = false;
        this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth.signInWithRedirect(this.facebookAuthProvider);
    }

    public goBack() {
        this.isSignUp = false;
        this.isSignedIn = true;
        this.error = '';
    }
}
