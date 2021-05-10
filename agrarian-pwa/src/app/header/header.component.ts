import isMobileTablet from '../../../src/app/shared/deviceUtil';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <div id="header" class="row">
    <div class="col-sm">
        <h4>{{title}}</h4>
        <p class="h2">{{range1 | date}} - {{range2 | date}}</p>
    </div>
    <div class="col-sm text-sm-right mp-0 p-sm-3 mr-0 mt-4">
            <div class="group-header-icons">
              <span (click)="openNotification($event)"
              *ngIf="alerts > 0"
              class="ml-0 icon-button mt-1"
              id="alerts"
              title="Alerts">
                <i class="k-icon k-i-notification"></i>
                <span *ngIf="alerts > 0" class="dot counter counter-lg">{{alerts > 5 ? '5+' : alerts}}</span>
              </span>
              <div class="alerts popup k-shadow px-2 pb-2" *ngIf="notificationType === 'alerts' && showNotification
              ">
              <h3 class="popup-header py-2">Alerts</h3>
                <ul>
                  <li class="p-2" *ngFor="let user of users">
                    
                    <!-- <app-user-avatar [user]="user"></app-user-avatar> -->
                    <!-- <div class="alert-icon p-1"> -->
                      <!-- <img src="../../assets/issue-open.png"  alt="alert"/> -->
                      <!-- </div> -->
                      <div [ngSwitch]="user.notification">
                        <div class="alert-icon p-1" *ngSwitchCase="'alert'">
                          <img src="../../assets/issue-open.png"  alt="alert"/>
                        </div>
                        <div class="alert-icon p-1" *ngSwitchCase="'info'">
                          <img src="../../assets/issueclosed.png"  alt="info"/>
                        </div>
                        <div class="alert-icon p-1" *ngSwitchCase="'action'">
                          <img src="../../assets/issueclosed.png"  alt="action"/>  
                        </div>
          
                    </div>

                    <div class="ml-2">{{user.message}}</div>
                  </li>
                  <hr>
                </ul>
              </div>



              <span  (click)="openNotification($event)"
              *ngIf="reports > 0"
              class="ml-5 icon-button mt-1"
              id="reports" title="Reports">
                <i class="k-icon k-i-file-txt"></i>
                <span *ngIf="reports > 0" class="dot counter counter-lg">{{reports > 5 ? '5+' : reports}}</span>
              </span>
              <div class="reports popup k-shadow p-2" *ngIf="notificationType === 'reports' && showNotification
              ">
              <h3 class="popup-header">Reports</h3>
                <ul>
                  <li class="p-2" *ngFor="let user of users">
                    <i class="fa-2x fa fa-file"></i>
                 
                    <div class="ml-1">{{user.message.length > 31 ? user.message.substr(0, 31).concat(' ...') : user.message}}</div>
                  </li>
                  <hr>
                </ul>
              </div>



              <span (click)="openNotification($event)"
              *ngIf="messages > 0"
              class="ml-5 icon-button mt-1"
              id="messages" title="Messages">
                <i class="k-icon k-i-email"></i>
                <span *ngIf="messages > 0" class="dot counter counter-lg">{{messages > 5 ? '5+' : messages}}</span>
              </span>
              <div class="messages popup k-shadow p-2" *ngIf="notificationType === 'messages' && showNotification
              ">
              <h3 class="popup-header">Messages</h3>
                <ul>
                  <li class="p-2" *ngFor="let user of users">
                    
                    <app-user-avatar [user]="user"></app-user-avatar>

                    <div class="ml-2">{{user.message.length > 29 ? user.message.substr(0, 29).concat(' ...') : user.message}}</div>
                  </li>
                  <hr>
                </ul>
              </div>


          </div>
    </div>
    <div class="col-sm text-sm-right mp-0 p-sm-3 mr-0 mt-4" *ngIf="!_isMobileTablet">
        <kendo-buttongroup [disabled]="isLoading" [selection]="'single'">
            <button   kendoRippleContainer kendoButton [disabled]="isLoading"  [selected]="false">3 Months</button>
            <button   kendoRippleContainer kendoButton [disabled]="isLoading"  [selected]="false">6 Months</button>
            <button   kendoRippleContainer kendoButton [disabled]="isLoading"  [selected]="true">1 Year</button>
        </kendo-buttongroup>
    </div>
</div>


  `,
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Input() isLoading;
  @Input() range1;
  @Input() range2;
  @Input() title;

  _isMobileTablet;
  alerts = 10;
  reports = 3;
  messages = 1;
  showNotification = false;
  notificationType = '';

  users = [
    {
    id: '1',
    displayName: 'alex',
    email: 'alex@gmail.com',
    message: ' I need some assistance. When are you available?',
    themeColor: 'tomatoe',
    notification: 'alert'
  },
    {
      id: '1',
      displayName: 'tom',
      email: 'tomly@gmail.com',
      message: ' hi, there!',
      themeColor: 'lightgreen',
      notification: 'info'
    },
    {
      id: '1',
      displayName: 'patrick',
      email: 'patrick@yahoo.com',
      message: ' Like the dashboard 😎',
      themeColor: 'skyblue',
      notification: 'action'
    },
    {
      id: '1',
      displayName: 'bob',
      email: 'bob@hotmail.com',
      message: ' Not cool 😣',
      themeColor: 'purple',
      notification: 'alert'
    }

  ];
  

  ngOnInit(): void {
    this._isMobileTablet = isMobileTablet();
  }



  openNotification(e): void {
    this.showNotification = !this.showNotification;  
    this.notificationType = e.target.parentNode.id;
  }


}
