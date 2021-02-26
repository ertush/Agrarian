import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'app-chart-donut',
    template: `
        <h2 class="k-card-header">Percentage (Temperature, Humidity, Soil Moisture, Light, Atmospheric Pressure)</h2>
        <div *ngIf="loading" style="height: 400px">
                    <app-loading-spinner>
                    </app-loading-spinner>
        </div>
        <div class="k-card-body height-1" *ngIf="!loading && dataset.length">
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
                  <span class="unit">{{ getDatasetUnits(donutLabel) }}</span>
                </div>
                <div class="data-label">{{donutLabel}}</div>
            </div>
        </div>
    `
})
export class ChartDonutComponent {
    public donutPercent: string;
    public donutLabel: string;
    public hoverColor = 'rgb(255, 99, 88)';
    public dataset;

    @Input() public loading;
    @Input() public set data(data) {
        if (data !== undefined) {
        this.dataset = data;
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

    public onHover(event) {
        this.setDonutLegend(event);
    }

    public getDatasetUnits(dtLabel: string): string {
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
}
