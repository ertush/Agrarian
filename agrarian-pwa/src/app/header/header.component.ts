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
              <div class="alerts popup k-shadow p-2" *ngIf="notificationType === 'alerts' && showNotification
              ">
              <h3 class="popup-header py-2">{{alerts > 1 ? 'Alerts': 'Alert'}}</h3>
                <ul>
                  <li class="p-2" *ngFor="let user of users">
                    
                      <div [ngSwitch]="user.notification">
                        <div [ngStyle]="{'background': 'rgb(221, 143, 97)'}" class="alert-icon p-1" *ngSwitchCase="'alert'">
                         <i class="fas fa-exclamation"></i>
                        </div>
                        <div [ngStyle]="{'background': 'rgb(97, 205, 221)'}" class="alert-icon p-1" *ngSwitchCase="'info'">
                          <i class="fas fa-info"></i>
                        </div>
                        <div [ngStyle]="{'background': 'rgb(114, 221, 97)'}" class="alert-icon p-1" *ngSwitchCase="'action'">
                          <i class="fas fa-check"></i>
                        </div>
          
                    </div>

                    <div class="ml-2">{{user.alert}}</div>
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
              <h3 class="popup-header py-2">{{reports > 1 ? 'Reports' : 'Report'}}</h3>
                <ul>
                  <li  class="p-2" *ngFor="let user of users">
                    <i  class="fas fa-file"></i>
                 
                    <div *ngIf="user.report" class="ml-1">{{user.report}}</div>
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
              <h3 class="popup-header  py-2">{{messages > 1 ? 'messages' : 'message'}}</h3>
                <ul>
                  <li class="p-2" *ngFor="let user of users">
                    
                    <app-user-avatar *ngIf="user.message" [user]="user"></app-user-avatar>

                    <div *ngIf="user.message" class="ml-2">{{user.message}}</div>
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
  alerts = 1;
  reports = 0;
  messages = 0;
  showNotification = false;
  notificationType = '';

  users = [
    {
    id: '1',
    displayName: 'admin',
    email: 'admin@agrarian.io',
    message: 'You need to procure a device, inorder to use the app',
    themeColor: 'tomatoe',
    notification: 'alert',
    alert: 'No sensor device found'
  }/*,
    {
      id: '1',
      displayName: 'tom',
      email: 'tomly@gmail.com',
      message: ' hi, there!',
      themeColor: 'lightgreen',
      notification: 'info',
      alert: 'AG11 connected to broker',
      report: 'Server report ready'
    },
    {
      id: '1',
      displayName: 'patrick',
      email: 'patrick@yahoo.com',
      message: ' Like the dashboard 😎',
      themeColor: 'skyblue',
      notification: 'action',
      alert: 'Humidity set to average',
      report: 'Sensor report'
    },
    {
      id: '1',
      displayName: 'bob',
      email: 'bob@hotmail.com',
      message: ' Amazing work bob 👍',
      themeColor: 'purple',
      notification: 'info',
      report: 'closed',
      alert: 'Soil moisture is above average'
    }
    */

  ];
  

  ngOnInit(): void {
    this._isMobileTablet = isMobileTablet();
  }



  openNotification(e): void {
    this.showNotification = !this.showNotification;  
    this.notificationType = e.target.parentNode.id;
  }


}
