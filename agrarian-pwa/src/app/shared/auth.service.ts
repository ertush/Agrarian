import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

public user: User;
constructor() {}
}
