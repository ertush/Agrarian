import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-default',
    template: `
        <div class="row">
          
            <div class="col-xl-4">
                <app-chart-donut [data]="edata" [loading]="loading"></app-chart-donut>
            </div>

             <div *ngIf="!loading; else chartsLineLoading" class="col-xl-8">
                 <app-charts-line [data]="cdata"></app-charts-line>
            </div>

            <div class="col-12" *ngIf="!loading; else activeIssuesLoading">
                <app-charts-area
                [dataarray]="dataarr"
                [duration]="duration"
                [closeRate]="rate">
                </app-charts-area>
            </div>

            <ng-template #chartsLineLoading>
                <div class="col-xl-8">
                    <div class="k-card k-card-body">
                    <h2 class="k-card-header">Temperature, Humidity, Soil Moisture, Light Intensity and Atmospheric Pressure</h2>
                            <div  style="height: 400px">
                                    <app-loading-spinner>
                                    </app-loading-spinner>
                            </div>
                    </div>
                </div>
            </ng-template>

            <ng-template #activeIssuesLoading>
                <div class="col-12">
                    <div class="k-card k-card-body">
                    <h2 class="k-card-header m-0">Temperature, Humidity and Atmospheric Pressure</h2>
                            <div  style="height: 400px">
                                    <app-loading-spinner>
                                    </app-loading-spinner>
                            </div>
                    </div>
                </div>
            </ng-template>
        </div>

    `
})
export class DefaultComponent implements OnInit {

    public cdata;
    public edata;
    @Input() public duration;
    @Input() public  set esdata(data) {
        this.edata = data;
    }
    @Input() public  set csdata(data) {
        this.cdata = data;
    }
    @Input() public rate;
    @Input() public data;
    @Input() public loading;
    @Input() public dataarr;
   
    ngOnInit() {
        

    }
}
