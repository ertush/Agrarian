import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-avatar',
  template: `
          <div class="avatar">
            <img *ngIf="user.photoURL;else userInitialAvatar" [src]="user.photoURL"  class="img-circle" />
            <ng-template #userInitialAvatar>
              <div [ngClass]="getUserTheme((user.displayName ? user.displayName.substr(0, 1) : user.email.split('@')[0].substr(0, 1)))" class="initials-avatar p-1"><p class="letter">{{user.displayName ? user.displayName.substr(0, 1) : user.email.split('@')[0].substr(0, 1)}}</p></div>
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

  getUserTheme(letter: string): string {

  let theme = 'default-theme';
  const themes = [
      'theme-1',
      'theme-2',
      'theme-3',
      'theme-4',
      'theme-5',
      'theme-6',
  ];

    const l = letter.toLowerCase();

    const themeExpressions = [
      `'abcd'.includes('${l}') ? 1 : 0`,
      `'efgh'.includes('${l}') ? 2 : 0`,
      `'ijkl'.includes('${l}') ? 3 : 0`,
      `'mnop'.includes('${l}') ? 4 : 0`,
      `'qrst'.includes('${l}') ? 5 : 0`,
      `'uvwxyz'.includes('${l}') ? 6 : 0`,
    ] ;

    themeExpressions.map( expr => {

      const val = eval(expr);
      if (val !== 0) {
        theme = themes[val - 1];
      }

    });

    return theme;


  }

}
