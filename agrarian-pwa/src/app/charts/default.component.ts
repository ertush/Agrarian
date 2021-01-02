import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-default',
    template: `
        <div class="row">
            <div class="col-12">
                <div *ngIf="loading" class="k-card" style="height: 400px">
                    <app-loading-spinner>
                    </app-loading-spinner>
                </div>
                <app-active-issues-clone
                [dataarray]="dataarr"
                [monthslabel]="monthslbl"
                [duration]="duration"
                [closeRate]="rate">
                </app-active-issues-clone>
            </div>
<!-- 
            <div *ngIf="!loading" class="col-xl-4">
                <app-issue-types-clone [data]="esdata" [loading]="loading"></app-issue-types-clone>
            </div>

             <div *ngIf="!loading" class="col-xl-8">
                 <app-charts-line [data]="cdata" ></app-charts-line>
            </div> -->
        </div>

    `
})
export class DefaultComponent implements OnInit {

    // public cdata;
    // public edata;
    @Input() public duration;
    // @Input() public  set esdata(data) {
    //     this.edata = data;
    // }
    // @Input() public  set csdata(data) {
    //     this.cdata = data;
    // }
    @Input() public rate;
    @Input() public data;
    @Input() public loading;
    @Input() public dataarr;
    @Input() public monthslbl;

    ngOnInit() {
        // console.log({esdata: this.cdata}, this.loading);

    }
}
