import { Component, Input, OnInit } from '@angular/core';
import isMobileTablet from 'src/app/shared/deviceUtil';

@Component({
  selector: 'app-user-avatar',
  template: `
      <div class="container-avatar">
          <div class="avatar">
            <img [src]="user.avatar_url" class="img-circle mx-auto" [ngStyle]="{'max-width': avatarWidth}" alt="Avatar"/>
          </div>
          <div class='user-labels' [ngStyle]="{'margin-left.px': labelMargin}">
            <p class="user-label-name" [ngStyle]="{'font-size.px': labelSize}"> {{ user.name }} </p>
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

  constructor() { }

  ngOnInit(): void {
    this.avatarWidth = (isMobileTablet() ? '70%' : '100%');
    this.labelSize = (isMobileTablet() ? 15 : 12 );
    this.labelMargin = (isMobileTablet() ? 0 : 10 );
  }

}
