import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  template: `
   <div class="k-card">
   <h2 class="k-card-header m-0">Temp</h2>
          <div class="col-12">
                <div *ngIf="isLoading" class="k-card" style="height: 400px">
                    <app-loading-spinner>
                    </app-loading-spinner>
                </div>
          <div class="col-12 all-issues">
          <kendo-chart [transitions]="false" [pannable]="{ lock: 'y' }"
          [zoomable]="{ mousewheel: { lock: 'y' } }" *ngIf="!isLoading" style="margin-top: 20px">
          <kendo-chart-tooltip format="{1} &deg;C"></kendo-chart-tooltip>

             <kendo-chart-series-defaults [type]="'scatterLine'" [stack]="true" [gap]="0.06" [overlay]="false">
             </kendo-chart-series-defaults>
            <kendo-chart-series>              <kendo-chart-title text="         "></kendo-chart-title>
              <kendo-chart-series-item
              [border]="{color: '#27c46d', opacity: 0.8}"
              type="scatterLine"
              [data]="dataset"
              yField="value"
              xField="time"
              [style]="style"
              [color]="'#27c46d'">
              </kendo-chart-series-item>

              <kendo-chart-series-item
              [border]="{color: '#35C473', opacity: 0.8}"
              type="scatterLine"
              [data]="dataset"
              yField="value2"
              xField="time"
              [style]="style"
              [color]="'#e91e63'">
              </kendo-chart-series-item>
            </kendo-chart-series>

            <kendo-chart-x-axis>
                <kendo-chart-x-axis-item
                 [title]="{ text: 'Time' }"
                  baseUnit="seconds"
                  baseUnitSteps="seconds"
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
          </div>
        </div>
    </div>
  `,
    styles: [
      `kendo-chart{
        padding: 5px;
      }
      `
    ]
})



export class TempComponent implements OnInit {
    public dataset;
    @Input() public min;
    @Input() public max;
    public isLoading;
    @Input() public style;
    @Input() public set loading(_isloading){
      this.isLoading = _isloading;
    }

    @Input() public set data(data_r) {
    this.dataset = data_r;
    }

  constructor() { }

  ngOnInit() {
  }

}
