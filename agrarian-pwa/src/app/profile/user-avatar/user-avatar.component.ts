import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-avatar',
  template: `
      <div class="container-avatar">
          <div class="avatar">
            <img [src]="user.photoURL === undefined ? '../../../assets/avatar-placeholder.png' : user.photoURL" class="img-circle mx-auto" [ngStyle]="{'max-width': avatarWidth}" alt="Avatar"/>
          </div>
          <div class='user-labels' [ngStyle]="{'margin-left.px': labelMargin}">
            <p class="user-label-name" [ngStyle]="{'font-size.px': labelSize}"> {{ user.displayName == undefined ? user.email.split('@')[0] : user.displayName }} </p>
            <p class="user-label-email mt-sm-auto" [ngStyle]="{'font-size.px': labelSize}"> {{ user.email }} </p>
          </div>
      </div>
  `
})
export class UserAvatarComponent implements OnInit {

  @Input() public user: any;
  public avatarWidth: string;
  public labelSize: Number;
  public labelMargin: Number;

  constructor() {
    
   }

  ngOnInit(): void {
    this.avatarWidth = '40%';
    this.labelSize = 14;
    this.labelMargin = 0; // (isMobileTablet() ? 0 : 10 );
  }

}
