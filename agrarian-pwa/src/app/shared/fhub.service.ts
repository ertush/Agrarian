import { Injectable } from '@angular/core';
import { Fuser } from './fuser';
import { users } from './fakeuserdata';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FhubService {

constructor() { }

public getUsers(): Observable<Fuser[]> {
   return of(users);
}

}
