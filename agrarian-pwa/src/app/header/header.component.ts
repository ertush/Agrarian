import isMobileTablet from '../../../src/app/shared/deviceUtil';
import { Component, Input, OnInit } from '@angular/core';

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
              <span class="ml-0  mt-1 mb-1" title="Notifications"><i class="k-icon k-i-notification"></i><span class="dot counter counter-lg">29</span></span>
              <span class="ml-5  mt-1 mb-1" title="Reports"><i class="k-icon k-i-file-txt"></i><span class="dot counter counter-lg">3</span></span>
              <span class="ml-5  mt-1 mb-1" title="Emails"><i class="k-icon k-i-email"></i><span class="dot counter counter-lg">11</span></span>
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
  @Input() public isLoading;
  @Input() public range1;
  @Input() public range2;
  @Input() public title;

  public _isMobileTablet;

  ngOnInit(): void {
    this._isMobileTablet = isMobileTablet();
  }

}
