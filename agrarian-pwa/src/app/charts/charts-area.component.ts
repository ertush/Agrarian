import { Component, Input } from '@angular/core';
import { PlotAreaHoverEvent } from '@progress/kendo-angular-charts';

@Component({
    selector: 'app-charts-area',
    template: `
        <div class="k-card">
            <h2 class="k-card-header m-0">Temperature, Humidity and Atmospheric Pressure</h2>
            <div class="k-card-body">

                <div class="row">

                    <div class="col-sm-12 col-lg-6 col-xl active-issues">
                        <div class="comp-label">

                            <div *ngIf="dataarray">
                                <div class="issues-count">{{  dataarray.temp | avg }}</div><span class="issues-label">&deg;C</span>
                                <div class="issues-label">Average</div>
                                <div class="issues-label">Temperature</div>
                                <div class="row" style="margin-left: 0.1em">
                                    <p class="m-0 small text-uppercase text-muted">
                                        Highest Temperature:
                                        {{ dataarray.temp | minmax : 'max'}}

                                    </p>
                                </div>
                                    <div class="row" style="margin-left: 0.1em">
                                        <p class="m-0 small text-uppercase text-muted">
                                        Lowest Temperature:
                                        {{  dataarray.temp | minmax : 'min'}}

                                        </p>
                                </div>
                            </div>
                            <div *ngIf="!dataarray">
                                <div class="issues-count">-</div>
                                <div class="issues-label">1</div>
                            </div>


                        </div>
                        <kendo-chart (plotAreaHover)="onPlotAreaHover($event)" style="height: 100px;" [chartArea]="{margin: { left: 0 }}">
                        <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                                <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [categories]="setTimeSuffix(dataarray.time, true)"
                                        [labels]="{ rotation: 'auto', margin: { top: 1, left: 4 }}"
                                        >
                                    </kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>

                                <kendo-chart-series>
                                    <!-- color : #888 (gray) -->
                                  <kendo-chart-series-item
                                  type="area"
                                  [color]="'#888'"
                                  [data]="dataarray.temp"
                                  [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                </kendo-chart-series>

                            <kendo-chart-value-axis>
                                <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                </kendo-chart-value-axis-item>

                            </kendo-chart-value-axis>
                        </kendo-chart>
                    </div>

                     <div class="col-12 col-lg-6 col-xl pb-4 text-danger closed-issues">
                        <span class="comp-label">
                        <div *ngIf="dataarray">
                                <div class="issues-count">{{  dataarray.humid | avg }}</div><span class="issues-label">%</span>
                                <div class="issues-label">Average</div>
                                <div class="issues-label">Humidity</div>
                                <div class="row" style="margin-left: 0.1em">
                                    <p class="m-0 small text-uppercase text-muted">
                                        Highest Humidity:
                                        {{ dataarray.humid  | minmax : 'max' }}

                                    </p>
                                </div>
                                <div class="row" style="margin-left: 0.1em">
                                    <p class="m-0 small text-uppercase text-muted">
                                        Lowest Humidity:
                                        {{  dataarray.humid  | minmax : 'min' }}

                                    </p>
                                </div>
                            </div>
                            <div *ngIf="!dataarray">
                                <div class="issues-count">-</div>
                                <div class="issues-label">2</div>
                            </div>
                        </span>
                        <kendo-chart (plotAreaHover)="onPlotAreaHover($event)" style="height: 100px;" [chartArea]="{margin: { left: 0 }}">
                            <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                            <kendo-chart-series-defaults type="column"
                            [stack]="true"
                            [gap]="0.5"
                            [overlay]="false"></kendo-chart-series-defaults>
                            <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                    [categories]="setTimeSuffix(dataarray.time, true)"
                                    [labels]="{rotation: 'auto'}"
                                        >
                                    </kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>

                                <kendo-chart-series>
                                    <!--
                                  yField="humid"
                                  xField="time"
                                     -->
                                  <kendo-chart-series-item
                                  type="area"
                                  [color]="'#e91e63'"
                                  [data]="dataarray.humid"
                                  [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                </kendo-chart-series>

                            <kendo-chart-value-axis>
                                <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                </kendo-chart-value-axis-item>
                            </kendo-chart-value-axis>
                        </kendo-chart>
                    </div>

                    <div class="col-12 col-lg-6 col-xl pb-4 text-success open-issues">
                        <span class="comp-label">

                        <div *ngIf="dataarray">
                                <div class="issues-count">{{  dataarray.atmp | avg }}</div><span class="issues-label">mmHg</span>
                                <div class="issues-label">Average</div>
                                <div class="issues-label">Atmospheric Pressure</div>
                                <div class="row" style="margin-left: 0.1em">
                                    <p class="m-0 small text-uppercase text-muted">
                                        Highest Atpressure:
                                        {{ dataarray.atmp | minmax : 'max' }}

                                    </p>
                            </div>
                            <div class="row" style="margin-left: 0.1em">
                                    <p class="m-0 small text-uppercase text-muted">
                                        Lowest Atpressure:
                                        {{  dataarray.atmp  | minmax : 'min' }}

                                     </p>
                            </div>

                            </div>
                            <div *ngIf="!dataarray">
                                <div class="issues-count">-</div>
                                <div class="issues-label">3</div>
                        </div>

                        </span>
                        <kendo-chart (plotAreaHover)="onPlotAreaHover($event)" style="height: 100px;" [chartArea]="{margin: { left: 0 }}">
                              <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                              <kendo-chart-category-axis>

                                    <kendo-chart-category-axis-item
                                        [categories]="setTimeSuffix(dataarray.time, true)"
                                        [labels]="{ rotation : 'auto', margin: { left: 5 }}"
                                        >
                                    </kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>

                                <kendo-chart-series>
                                <!-- yField="atm"
                                  xField="time" -->
                                  <kendo-chart-series-item
                                  type="area"
                                  [color]="'#27c46d'"
                                  [data]="dataarray.atmp"
                                  [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                </kendo-chart-series>

                            <kendo-chart-value-axis>
                                <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                </kendo-chart-value-axis-item>
                            </kendo-chart-value-axis>
                        </kendo-chart>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 all-issues">
                        <kendo-chart>
                                <kendo-chart-tooltip format="{0}"></kendo-chart-tooltip>
                                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.5" [overlay]="false">
                                </kendo-chart-series-defaults>

                                <kendo-chart-category-axis>
                                    <!-- [categories]="['Jan', 'Feb']" -->
                                    <kendo-chart-category-axis-item
                                        [categories]="setTimeSuffix(dataarray.time)"
                                        [title]="{ text: 'Time' }"
                                        [majorTicks]="{visible: false}"
                                        [line]="{visible: false}"
                                        [majorGridLines]="{visible: false}"
                                        [labels]="{rotation: 'auto', margin: { top: 1 , left: 8 }}"
                                        >
                                    </kendo-chart-category-axis-item>

                                </kendo-chart-category-axis>
                                <kendo-chart-value-axis>
                                    <kendo-chart-value-axis-item
                                    [title]="{ text: 'Percentage %' }"
                                    ></kendo-chart-value-axis-item>
                                </kendo-chart-value-axis>


                                <kendo-chart-series>
                                    <!-- [data]="dataarray" -->
                                  <kendo-chart-series-item type="area"
                                        [opacity]="0.3"
                                        [border]="{color: '#888', opacity: 0.3}"
                                        [color]="'#888'"
                                        [data]="dataarray.temp"
                                        [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                  <!-- [data]="dataarray.datay.y2" -->
                                  <kendo-chart-series-item type="area"
                                      [opacity]="0.3"
                                      [border]="{color: '#e91e63', opacity: 0.3}"
                                      [color]="'#e91e63'"
                                      [data]="dataarray.humid"
                                      [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                  <kendo-chart-series-item type="area"
                                      [opacity]="0.3"
                                      [border]="{color: '#27c46d', opacity: 0.3}"
                                      [color]="'#27c46d'"
                                      [data]="dataarray.atmp"
                                      [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                </kendo-chart-series>
                                <kendo-chart-y-axis>
                                <kendo-chart-y-axis-item
                                 [title]="{ text: 'Vals' }"
                                >
                                </kendo-chart-y-axis-item>
                            </kendo-chart-y-axis>

                        </kendo-chart>
                    </div>
                </div>

            </div>
        </div>
    `
})

export class ChartsAreaComponent {
    public baseUnit;
    public bulletData;



    @Input() public dataarray;


    public style = 'smooth';


    @Input() public set duration(base_unit) {

        this.baseUnit = base_unit;
    }

    @Input() public set closeRate(rate) {
        this.bulletData = [{target: 70, current: Math.round(rate * 100)}];
    }

    trim(timeArr: string[]): string[] {
        const _timeArr = [];
        timeArr.forEach(element => {
            _timeArr.push(element.substr(0, 5));
        });

        return _timeArr;
    }

    setTimeSuffix(times: string[], isSmallGraph: boolean = false): string[] {
        if (!isSmallGraph) {
            times = times.map(time => `${time} ${Number(time.split(':')[0]) >= 12 ? 'PM' : 'AM'}`);
        } else {
            times = times.map(time => `${time.substr(0, 5)} ${Number(time.split(':')[0]) >= 12 ? 'PM' : 'AM'}`);
        }

        times = times.map(time => `${
        parseInt(time.split(':')[0]) >= 13 ?
        (parseInt(time.split(':')[0]) -  12).toString() :
        time.split(':')[0]}${time.substr(2, time.length)}`);

        return times;
    }

    onPlotAreaHover(e: PlotAreaHoverEvent): void {
     console.log({e});
}

}
