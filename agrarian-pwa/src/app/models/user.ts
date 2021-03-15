import * as firebase from 'firebase';

export interface UserModel {
    userName: string;
    fireUser?: firebase.User;
}
