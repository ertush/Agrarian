import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-active-issues-clone',
    template: `
        <div class="k-card">
            <h2 class="k-card-header m-0">Active Issues</h2>
            <div class="k-card-body">

                <div class="row">

                    <div class="col-sm-12 col-lg-6 col-xl active-issues">
                        <div class="comp-label">


                            <div *ngIf="dataset">
                                <div class="issues-count">23</div>
                                <div class="issues-label">Title 1</div>
                            </div>
                            <div *ngIf="!dataset">
                                <div class="issues-count">dp 33</div>
                                <div class="issues-label">1</div>
                            </div>


                        </div>
                        <kendo-chart style="height: 80px;">
                        <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                                <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [categories]="monthslabel"
                                        >
                                    </kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>

                                <kendo-chart-series>
                                  <kendo-chart-series-item type="area" [color]="'#888'" [data]="dataarray" [line]="{ style: style }">
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
                        <div *ngIf="dataset">
                                <div class="issues-count">45</div>
                                <div class="issues-label">Title 2</div>
                            </div>
                            <div *ngIf="!dataset">
                                <div class="issues-count">dp 33</div>
                                <div class="issues-label">2</div>
                            </div>
                        </span>
                        <kendo-chart style="height: 80px;">
                            <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                            <kendo-chart-series-defaults type="column"
                            [stack]="true"
                            [gap]="0.5"
                            [overlay]="false"></kendo-chart-series-defaults>
                            <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                    [categories]="monthslabel"
                                        >
                                    </kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>

                                <kendo-chart-series>
                                  <kendo-chart-series-item type="area" [color]="'#e91e63'" [data]="dataarray" [line]="{ style: style }">
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

                        <div *ngIf="dataset">
                                <div class="issues-count">67</div>
                                <div class="issues-label">Title 3</div>
                            </div>
                            <div *ngIf="!dataset">
                                <div class="issues-count">dp 33</div>
                                <div class="issues-label">3</div>
                        </div>

                        </span>
                        <kendo-chart style="height: 80px;">
                              <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
                              <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [categories]="monthslabel"
                                        >
                                    </kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>


                                <kendo-chart-series>
                                  <kendo-chart-series-item type="area" [color]="'#27c46d'" [data]="dataarray" [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                </kendo-chart-series>

                            <kendo-chart-value-axis>
                                <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                </kendo-chart-value-axis-item>
                            </kendo-chart-value-axis>
                        </kendo-chart>
                    </div>

                    <div class="col-12 col-lg-6 col-xl pb-4 close-rate">
                        <span class="comp-label">
                            <div class="issues-count">{{ dataset.length | percent:'2.0-0' }}</div>
                            <div class="issues-label">Data 4</div>
                        </span>
                        <p class="m-0 small text-uppercase text-muted">
                            Highest:
                            {{ dataset.length | percent: '2.0-0' }}
                            on date
                        </p>
                        <p class="m-0 small text-uppercase text-muted">
                            Lowest:
                            {{ dataset.length | percent: '2.0-0' }}
                            on date
                        </p>
                        <kendo-chart style="height: 20px;" [chartArea]="{margin: -20}">
                        <kendo-chart-tooltip format="{0}"></kendo-chart-tooltip>
                        <kendo-chart-series>
                                <kendo-chart-series-item type="bullet"
                                    [data]="bulletData"
                                    [target]="{color: '#FFF'}"
                                    currentField="current"
                                    targetField="target"
                                    color="#e91e63"
                                ></kendo-chart-series-item>
                                </kendo-chart-series>

                                <kendo-chart-value-axis>
                                <kendo-chart-value-axis-item
                                    [plotBands]="[{from:0, to:100, color: '#35C473'}]"
                                    [visible]="false"
                                    [majorGridLines]="{visible: false}">
                                </kendo-chart-value-axis-item>
                            </kendo-chart-value-axis>
                        </kendo-chart>
                    </div>

                </div>

                <div class="row">
                    <div class="col-12 all-issues">
                        <kendo-chart>
                            <!-- <kendo-chart-tooltip format="{0}"></kendo-chart-tooltip>
                            <kendo-chart-series-defaults [type]="'area'" [stack]="true" [gap]="0.06" [overlay]="false">
                            </kendo-chart-series-defaults>
                            <kendo-chart-series>
                                <kendo-chart-series-item
                                [line]="{style:'smooth'}"
                                    [opacity]="0.8"
                                    [border]="{color: '#35C473', opacity: 0.8}"
                                    [color]="'#35C473'"
                                    [data]="dataset" field="value" categoryField="date" aggregate="count"></kendo-chart-series-item>
                                <kendo-chart-series-item
                                    [line]="{style:'smooth'}"
                                    [opacity]="0.8"
                                    [border]="{color: '#e91e63', opacity: 0.8}"
                                    [color]="'#e91e63'" [data]="dataset"
                                    field="value" categoryField="date"
                                    aggregate="count"></kendo-chart-series-item>
                            </kendo-chart-series>
                            <kendo-chart-category-axis>
                                <kendo-chart-category-axis-item
                                    [baseUnit]="baseUnit"
                                    [majorTicks]="{visible: false}"
                                    [line]="{visible: false}"
                                    [majorGridLines]="{visible: false}"
                                    [labels]="{rotation: 'auto', margin: { top: 8 }}"
                                ></kendo-chart-category-axis-item>
                            </kendo-chart-category-axis>
                            <kendo-chart-value-axis>
                                <kendo-chart-value-axis-item
                                    [line]="{visible: false}"
                                    [labels]="{step: 2, skip: 2, margin: { right: 4 }}"
                                    [majorGridLines]="{step: 2, skip: 2, color: '#F0F2F2'}">
                                </kendo-chart-value-axis-item>
                            </kendo-chart-value-axis> -->
                                <kendo-chart-tooltip format="{0}"></kendo-chart-tooltip>

                                <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [categories]="monthslabel"
                                        [title]="{ text: 'Months' }"
                                        [majorTicks]="{visible: false}"
                                        [line]="{visible: false}"
                                        [majorGridLines]="{visible: false}"
                                        [labels]="{rotation: 'auto', margin: { top: 8 }}"
                                        >
                                    </kendo-chart-category-axis-item>

                                </kendo-chart-category-axis>
                                <kendo-chart-value-axis>
                                    <kendo-chart-value-axis-item
                                    [title]="{ text: 'Percentage %' }"
                                    ></kendo-chart-value-axis-item>
                                </kendo-chart-value-axis>


                                <kendo-chart-series>
                                  <kendo-chart-series-item type="area"
                                        [opacity]="0.8"
                                        [border]="{color: '#888', opacity: 0.8}"
                                        [color]="'#888'"
                                        [data]="dataarray"
                                        [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                  <kendo-chart-series-item type="area"
                                      [opacity]="0.8"
                                      [border]="{color: '#e91e63', opacity: 0.8}"
                                      [color]="'#e91e63'"
                                      [data]="dataarray"
                                      [line]="{ style: style }">
                                  </kendo-chart-series-item>
                                  <kendo-chart-series-item type="area"
                                      [opacity]="0.8"
                                      [border]="{color: '#27c46d', opacity: 0.8}"
                                      [color]="'#27c46d'"
                                      [data]="dataarray"
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

export class ActiveIssuesCloneComponent {
    public baseUnit;
    public bulletData;
    public dataset;
    @Input() public monthslabel;
    @Input() public dataarray;

    public style = 'smooth';

    @Input() public set data(data_r) {
        this.dataset = data_r;
    }

    @Input() public set duration(base_unit) {
        // date > 3 ? this.baseUnit = 'months' : this.baseUnit = 'weeks';
        this.baseUnit = base_unit;
    }

    @Input() public set closeRate(rate) {
        this.bulletData = [{target: 70, current: Math.round(rate * 100)}];
    }
}
