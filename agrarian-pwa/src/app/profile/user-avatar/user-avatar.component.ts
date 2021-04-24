import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-avatar',
  template: `
      <div class="container-avatar">
          <div class="avatar">
            
            <img *ngIf="user.photoURL !== null; else userInitialAvatar" [src]="user.photoURL"  style="max-width: 100px; max-height:100px;" class="img-circle mx-auto " />
            <ng-template #userInitialAvatar>
              <div class="initials-avatar"><p>{{user.displayName ? user.displayName.substr(0,2) : user.email.split('@')[0].substr(0,2)}}</p></div>
            </ng-template>
          </div>

          <div class='user-labels' [ngStyle]="{'margin-left.px': labelMargin}">
            <p class="user-label-name" [ngStyle]="{'font-size.px': labelSize}"> {{ user.displayName == undefined ? user.email.split('@')[0] : user.displayName }} </p>
            <p class="user-label-email mt-sm-auto" [ngStyle]="{'font-size.px': labelSize}"> {{ user.email }} </p>
          </div>
      </div>
  `
})
export class UserAvatarComponent implements OnInit {

  @Input() user: any;
  avatarWidth: string;
  labelSize: Number;
  labelMargin: Number;

  constructor() {
    
   }

  ngOnInit(): void {
    this.avatarWidth = '40%';
    this.labelSize = 14;
    this.labelMargin = 0; 
  }

}
