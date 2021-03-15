import * as firebase from 'firebase';

export interface User {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoUrl: string;
    operationType?: string;
    provdierData?: Array<firebase.UserInfo>;
}
