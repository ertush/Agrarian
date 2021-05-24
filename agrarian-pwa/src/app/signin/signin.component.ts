// import { UserModel } from './../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { formValidationMessages } from './validation.messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, HostBinding, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import isMobile from '../shared/deviceUtil';
import * as firebase from 'firebase/app';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { User } from '../models/user';


@Component({
    selector: 'app-signin',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signin.template.html'
})

export class SigninComponent implements OnInit {

    @ViewChild('password') passwordTxtbox: TextBoxComponent;
    @ViewChild('newPassword', {static: true}) newPasswordTxtbox: TextBoxComponent;
    @ViewChild('confirmPassword', {static: true}) confirmTxtbox: TextBoxComponent;

    isMobile = this.deviceDetectorService.isMobile();
    userName = '';
    isSignUp: boolean;
    marginTopExp;
    formValidationMessages = formValidationMessages;
    showDialogue = false;
    year = new Date().getFullYear();

    isSignedIn: boolean;
    googleAuthProvider: any;
    twitterAuthProvider: any;
    error: any;
    errorCode: any;
    isText = false;
    return = '';
    user: firebase.User;

    loginForm: FormGroup = new FormGroup({
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

    signUpForm = new FormGroup({
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

    passwordMatchValidator(g: FormGroup) {
        return g.get('newPassword').value === g.get('confirmPassword').value
           ? null : {'mismatch': true};
     }

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth,
        private deviceDetectorService: DeviceDetectorService,
        ) {
        this.isSignedIn = false;
        this.isSignUp = false;
        this.marginTopExp = 22;
      
        this.error = '';

        this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

        this.afAuth.auth.getRedirectResult()
        .then(result => {
            if(result.user) {
                this.isSignedIn = true;
                this.router.navigate(['./home']);
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
    ngAfterViewInit(): void {
        this.passwordTxtbox.input.nativeElement.type = 'password';
    }

    toggleVisibility(): void {
        const elemPwd = this.passwordTxtbox.input.nativeElement;
        elemPwd.type = elemPwd.type === 'password' ? 'text' : 'password';
        this.isText = elemPwd.type === 'password' ? false : true;

    }

    sendMail(): void{
        this.showDialogue = true;
    }

    onSubmissionDialogClose(): void{
        this.showDialogue = false;
    }

    onLoginClick(formValues: any): void {
        this.isSignedIn = false;
        this.afAuth.auth.signInWithEmailAndPassword(formValues.userEmail, formValues.password)
        .then((success) => {
            if (success.user) { 
                this.isSignedIn = true;
                this.router.navigate(['./home']);
            }
        })
        .catch(error => this.error = error.message);
    }

    onSignUpClick(): void {

        this.isSignUp = true;
        this.marginTopExp = 'auto';
    }

    onCreateAccount(formValues: any): void {
        
        localStorage.setItem('userName', formValues.userName);

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

    submitForm(): void {
        this.loginForm.markAllAsTouched();
    }

    clearForm(): void {
        this.loginForm.reset();
    }

    onGoogleSignIn() {
        this.isSignedIn = false;
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithRedirect(this.googleAuthProvider)
        .catch(error => {
            this.errorCode = error.code;
            this.error = error.message;
        });
    }

    onTwitterSignIn(): void {
        this.isSignedIn = false;
        this.twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
        this.afAuth.auth.signInWithRedirect(this.twitterAuthProvider)
        .catch(error => {
            this.errorCode = error.code;
            this.error = error.message;
        });
    }

    goBack() {
        this.isSignUp = false;
        this.isSignedIn = true;
        this.error = '';
    }

}
