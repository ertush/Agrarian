import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart-donut',
    template: `
        <h2 class="k-card-header">Percentage (Temperature, Humidity, Soil Moisture, Light, Atmospheric Pressure)</h2>
        <div *ngIf="loading" style="height: 400px">
                    <app-loading-spinner>
                    </app-loading-spinner>
        </div>
        <div class="d-flex justify-content-center align-items-center"  style="height: 400px" *ngIf="!loading && timedOut">
            <h2>No Data</h2>
        </div>
        <div class="k-card-body height-1 mb-1" *ngIf="!loading && isDataSet() && !timedOut">
            <kendo-chart (seriesHover)="onHover($event)">
                <kendo-chart-series>
                    <kendo-chart-series-item
                        [holeSize]="80"
                        [data]="dataset"
                        type="donut"
                        field="payload"
                        categoryField="topic"
                        [overlay]="false"
                    ></kendo-chart-series-item>
                </kendo-chart-series>
                <kendo-chart-legend position="bottom">
                </kendo-chart-legend>
            </kendo-chart>
            <div class="comp-label chart-label" [style.color]="hoverColor">
                <div class="issues-count">
                  {{donutPercent}}
                </div>
                <span class="unit">{{ getDatasetUnits(donutLabel) }}</span>
                <div class="data-label">{{donutLabel}}</div>
            </div>
        </div>
    `
})
export class ChartDonutComponent implements OnInit{
   
    donutPercent: string;
    donutLabel: string;
    hoverColor = 'rgb(255, 99, 88)';
    dataset;
    timeOut;
    timedOut = false;
    wait = 5000;

    @Input() loading;
    @Input() set data(data) {
        if (data !== undefined) {
        
        this.timedOut = false;
        if (this.timeOut) clearTimeout(this.timeOut);

        this.dataset = data.filter(val => (val.topic !== 'lat' && val.topic !== 'lng'));
        data.forEach(series =>  {
            if (series.topic === 'soil') {
                this.setDonutLegend({
                    value: series.payload,
                    category: series.topic,
                    point: {
                        options: {
                            color: this.hoverColor
                        }
                    }
                });
            }
        });
    }
    }

    @HostBinding('class') get className() {
        return 'k-card issue-types';
    }

    isDataSet():boolean {
        if (this.dataset !== undefined) { 
            return this.dataset.length > 0
        } 
        return false;
    }

    onHover(event) {
        this.setDonutLegend(event);
    }

    getDatasetUnits(dtLabel: string): string {
        switch (dtLabel) {
            case 'temperature':
                return '°C';

            case 'humidity':
                return '%';

            case 'atpressure':
                return 'mmHg';

            case 'light':
                return 'lumens';

            case 'soil':
                return 'level';

            default:
                return '';
        }
    }

    private setDonutLegend(series) {
        this.hoverColor = series.point.options.color;
        this.donutPercent = Math.round(series.value) + '';
        this.donutLabel = series.category;
    }

    constructor() {}

    ngOnInit(): void {
        this.timeOut = setTimeout(() => {
            this.timedOut = true;
            this.loading = false;
        }, this.wait);
    }
}
