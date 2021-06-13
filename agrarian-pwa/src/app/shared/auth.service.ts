import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

public user: UserModel;
constructor() {}
}
