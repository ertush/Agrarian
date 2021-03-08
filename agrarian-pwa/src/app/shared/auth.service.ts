import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

public providerData: Array<firebase.UserInfo>;
public userInfo: firebase.auth.AdditionalUserInfo;
public userProfile: any;
public opType: string;

constructor(public afAuth: AngularFireAuth) { }

doFacebookLogin() {
  return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      this.opType = res.operationType;
      this.userInfo = res.additionalUserInfo;
      this.providerData = res.user.providerData;
      this.userProfile = this.userInfo.profile;


      resolve(res);
    }, err => {
      console.log(err);
      reject(err);
    });
  });
}

doGoogleLogin() {
  return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      this.opType = res.operationType;
      this.userInfo = res.additionalUserInfo;
      this.providerData = res.user.providerData;
      this.userProfile = this.userInfo.profile;

      resolve(res);
    })
    .catch(err => reject(err));

  });

}

doRegister(value) {
  return new Promise<firebase.auth.UserCredential>((resolve, reject) => {

    this.afAuth.auth.createUserWithEmailAndPassword(value.signUpEmail, value.newPassword)
    .then(res => {
      resolve(res);
    }, err => reject(err));
  });

}

doLogOut() {
  return new Promise<void>((resolve, reject) => {
    this.afAuth.auth.signOut()
    .then(res => {
      resolve(res);
    }, err => reject(err));
  });
}

doEmailLogin(value) {
  return new Promise<firebase.auth.UserCredential>((resolve, reject) => {

    this.afAuth.auth.signInWithEmailAndPassword(value.userEmail, value.password)
    .then(res => {
      this.opType = res.operationType;
      this.userInfo = res.additionalUserInfo;
      this.providerData = res.user.providerData;
      this.userProfile = this.userInfo.profile;
      resolve(res);
    }, err => reject(err));
  });

}

getUserProfile(): any {
  return this.userProfile;
}

getUserInfo(): firebase.auth.AdditionalUserInfo {
  return this.userInfo;
}

getProviderData(): Array<firebase.UserInfo> {
  return this.providerData;
}




}
