import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-avatar',
  template: `
          <div class="avatar">
            <img *ngIf="user.photoURL !== null; else userInitialAvatar" [src]="user.photoURL"  class="img-circle" />
            <ng-template #userInitialAvatar>
              <div class="initials-avatar p-1"><p class="letter">{{user.displayName ? user.displayName.substr(0,1) : user.email.split('@')[0].substr(0,1)}}</p></div>
            </ng-template>
          </div>
  `
})
export class UserAvatarComponent implements OnInit {

  @Input() user: any;

  constructor() {
    
   }

  ngOnInit(): void {
 
  }

}
