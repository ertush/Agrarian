import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-temp',
  template: `
   <div class="k-card graph-container">
   <!-- <h2 class="k-card-header text-center m-0">Temperature</h2> -->
          <div class="col-12">
                <div *ngIf="isLoading" style="height: 400px">
                    <app-loading-spinner>
                    </app-loading-spinner>
                </div>
               <div class="d-flex justify-content-center align-items-center"  style="height: 400px" *ngIf="!isLoading && timedOut">
                 <h2>No Data</h2>
               </div>
          <div class="col-12 all-issues">
          <kendo-chart [transitions]="false" [pannable]="{ lock: 'y' }"
          [zoomable]="{ mousewheel: { lock: 'y' } }"  *ngIf="!isLoading && !timedOut" style="margin-top: 20px">
          <kendo-chart-tooltip format="{1} &deg;C"></kendo-chart-tooltip>

             <kendo-chart-series-defaults [type]="'scatterLine'" [stack]="true" [gap]="0.03" [overlay]="false">
             </kendo-chart-series-defaults>
            <kendo-chart-series>
              <kendo-chart-title text="Temperature"></kendo-chart-title>
              <kendo-chart-series-item
              [border]="{color: '#27c46d', opacity: 0.8}"
              type="scatterLine"
              [data]="tempData"
              yField="value"
              xField="time"
              [style]="style"
              [color]="'#27c46d'">
              </kendo-chart-series-item>

              <kendo-chart-series-item
              [border]="{color: '#35C473', opacity: 0.8}"
              type="scatterLine"
              [data]="humidityData"
              yField="value"
              xField="time"
              [style]="style"
              [color]="'#e91e63'">
              </kendo-chart-series-item>
            </kendo-chart-series>

            <kendo-chart-x-axis>
                <kendo-chart-x-axis-item
                 [title]="{ text: 'Time' }"
                  baseUnit="minutes"
                  baseUnitSteps="minutes"
                  [labels]="{ rotation: 'auto', margin:{ top: 8, left: 8}}"
                  [min]="min"
                  [max]="max">
                </kendo-chart-x-axis-item>
            </kendo-chart-x-axis>
            <kendo-chart-y-axis>
                <kendo-chart-y-axis-item
                 [title]="{ text: 'Temp °C' }"
                >
                </kendo-chart-y-axis-item>
            </kendo-chart-y-axis>
          <kendo-chart-axis-defaults-labels></kendo-chart-axis-defaults-labels>
          </kendo-chart>
          <!-- tabStrip menu -->
          <div  *ngIf="!isLoading && isMobile" class="tabStripMenu text-center">
                <kendo-dropdownlist class="dropDownlist" [data]="tabItems" [defaultItem]="defaultTab" (valueChange)="onSelect($event)">
                </kendo-dropdownlist>
            </div>
            <!-- End of tabStrip menu -->
          </div>
        </div>
    </div>
  `,
  styles: [
    `kendo-chart{
        padding: 5px;
      }

      .graph-container{
        margin-top: 11%;
      }
      `
  ]
})



export class TempComponent implements OnInit {
  // dataset;
  @Input() min;
  @Input() max;
  @Input() style;

  isLoading;
  tempData;
  timeOut;
  timedOut = false;
  wait = 5000;
  tabItems: Array<string> = ['Map', 'Weather', 'Chart'];
  defaultTab = 'Graph';
  isMobile: boolean;

  @Input() set loading(_isloading) {
    this.isLoading = _isloading;
  }

  @Input() set data(_data) {
    this.tempData = _data;
    this.timedOut = false;
    if (this.timeOut) clearTimeout(this.timeOut);
  }

  // @Input() humidityData;

  @Output() dropDownSelect = new EventEmitter<string>();


  onSelect(value: string) {
    this.dropDownSelect.emit(value);
  }

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();

    this.timeOut = setTimeout(() => {
      this.timedOut = true;
      this.isLoading = false;
  }, this.wait);
  }

}
