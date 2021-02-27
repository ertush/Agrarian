import { environment as env } from './../../environments/environment';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-charts-line',
  template: `
  <div class="k-card height-1">
            <h2 class="k-card-header">Temperature, Humidity, Soil Moisture, Light Intensity and Atmospheric Pressure</h2>
            <div class="k-card-body">
                <div class="row">
                  <div *ngFor="let button of seriesColors" (click)="addSeries(button, true)"
                      [style.color]="button.active ? button.value : initialGrey"
                      class="col-6 col-sm-4 col-xl-2 comp-label label-clickable">
                      <div class="issues-count">{{ data[button.label] | avglinechart }}</div>
                      <span class="issues-label">{{ getUnit(button.label) }}</span>
                      <div class="issues-label">{{ button.label }}</div>
                  </div>
                </div>

                <div class="row mt-1">
                  <div class="col-12 types-distribution">
                      <kendo-chart [pannable]="true" [zoomable]="true" style="height: 400px;" [transitions]="false">
                      <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                          <kendo-chart-series-defaults type="line" [overlay]="false"></kendo-chart-series-defaults>
                          <kendo-chart-category-axis>
                              <kendo-chart-category-axis-item
                                  [majorTicks]="{visible: false}"
                                  [labels]="{step: 4, skip: 2}"
                                  [majorGridLines]="{visible: false}"
                                  [line]="{visible: true}"
                                  [title]="{text: 'Parameters'}"
                              ></kendo-chart-category-axis-item>
                          </kendo-chart-category-axis>
                          <kendo-chart-series>
                              <kendo-chart-series-item *ngFor="let series of visibleSeries"
                                  [data]="series.data"
                                  [markers]="series.markers"
                                  [style]="style"
                                  [color]="series.color"
                              ></kendo-chart-series-item>
                          </kendo-chart-series>
                          <kendo-chart-value-axis>
                              <kendo-chart-value-axis-item
                                  [line]="{visible: false}" [labels]="{step: 2, skip: 2}"
                                  [title]="{text: 'Percentages %'}"
                                  [majorGridLines]="{step: 2, skip: 2, color: '#F0F2F2'}">
                              </kendo-chart-value-axis-item>
                          </kendo-chart-value-axis>
                      </kendo-chart>
                  </div>
                </div>
            </div>
        </div>
  `

})
export class ChartsLineComponent implements OnInit, OnChanges {
//   private baseUnit;
  @Input() public data;
//   @Input() public loading;
  public style = 'smooth';
  public initialGrey = '#A2ACAC';
  public series = [];
  public visibleSeries = [];

  public seriesColors = [
      { label: env.topic.temp, value: '#FF9966', active: true },
      { label: env.topic.humidity, value: '#BB6ACB', active: true },
      { label: env.topic.soil, value: '#122820', active: true },
      { label: env.topic.light, value: '#22C85D', active: true },
      { label: env.topic.atmp, value: '#e91e63', active: true }
    
  ];

  public addSeries(button, toggleLabels) {
      if (toggleLabels) {
          this.seriesColors.forEach(s => {
              if (s.value === button.value) {
                  s.active = !s.active;
              }
          });
      }

      const newSeries = {
          color: this.seriesColors.filter(color => color.label === button.label)[0].value,
          markers: { visible: false },
          data: this.data[button.label]
      };

      const present = this.visibleSeries.some(series => series.color === newSeries.color);

      if (present) {
          const removeIndex = this.visibleSeries.map(item => item.color).indexOf(newSeries.color);
          ~removeIndex && this.visibleSeries.splice(removeIndex, 1);
      } else {
          this.visibleSeries.push(newSeries);
      }
      this.series = this.visibleSeries;
  }

  public ngOnInit() {
    // this.seriesColors.forEach(e => {
    //     this.addSeries({ label: e.label, value: e.value, active: true }, false); 
    //   });

    this.seriesColors.filter(color => color.active === true).forEach(e => {
      this.addSeries({ label: e.label, value: e.value, active: true }, false);
  });
  }

  public ngOnChanges(changes) {

      if (
        changes.data.previousValue &&
        changes.data.previousValue.hasOwnProperty(env.topic.temp) &&
        changes.data.previousValue.hasOwnProperty(env.topic.humidity) &&
        changes.data.previousValue.hasOwnProperty(env.topic.atmp) &&
        changes.data.previousValue.hasOwnProperty(env.topic.soil) &&
        changes.data.previousValue.hasOwnProperty(env.topic.light)

        ) {
          this.visibleSeries = [];

        this.seriesColors.filter(color => color.active === true).forEach(e => {
            this.addSeries({ label: e.label, value: e.value, active: true }, false);
        });


      }
  }

  public getUnit(topic: string): string {
    switch(topic) {
      case env.topic.temp:
        return '°C';
      case env.topic.humidity:
        return '%';
      case env.topic.soil:
        return 'level';
      case env.topic.atmp:
        return 'mmHg';
      case env.topic.light:
        return 'lumens';
    }
  }

  public getType(val: any): string {
      return typeof(val);
  }

}
