import { ChartsAreaService } from './../shared/charts-area.service';
import { Component, ViewEncapsulation, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import 'hammerjs';
import { Subscription } from 'rxjs';
import { TabStripComponent } from '@progress/kendo-angular-layout/dist/es2015/tabstrip/tabstrip.component';

import { MqttService } from './../shared/mqtt.service';
import { ChartTempService } from '../shared/chart-temp.service';
import { ChartDonutService } from '../shared/chart-donut.service';
import { environment as env  } from 'src/environments/environment';



@Component({
    selector: 'app-dashboard',
    /*providers: [IssuesProcessor],*/
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dashboard.template.html'
})

export class DashboardComponent implements OnDestroy {

    public min: Date = new Date();
    public max: Date = new Date(this.min.getTime() + 60000);
    public style = 'smooth';
    public unit = 'fit';

    public allData: any[];

    public isLoading = true;
    public today: Date = new Date();
    public rangeStart: Date;

    public months = 3;

    private subscription: Subscription;

    public _espData = [];
    public _tempHumidityData = [];
    public _tempData = [];

    public _csData = {temperature: [], humidity: [], soil: [], light: [], atpressure: []};
    public temp = [];
    public humid = [];
    public soil = [];
    public light = [];
    public atm = [];
    public isMobile: boolean;

    public lat = 36.9785;
    public lng = 1.4577;

    public pageTitle = 'Statistics';

    @HostBinding('attr.id') get get_id() { return 'dashboard'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }

    @ViewChild('tabStrip') public tabStrip: TabStripComponent;

    constructor(
              private MqttClientService: MqttService,
              private chartAreaService: ChartsAreaService,
              private chartTempService: ChartTempService,
              private chartDonutService: ChartDonutService
        ) {


        /* Line Real time chart */
        this.MqttClientService.fetchData()
        .subscribe(m => {
          const payload = m.split('/')[0];
          const topic = m.split('/')[1];

            // All Data Section
            // Donut Chart and Line Chart

            this.isLoading = false;
            if (topic !== 'custom') {
              this.chartDonutService.loadData(payload, topic).subscribe(data => {

                this._espData.push(data);

                // Line Data processing

                if (this.temp.length < 5 && data.topic === env.topic.temp) this.temp.push({date: new Date(), value: data.payload});
                if (this.humid.length < 5  && data.topic === env.topic.humidity) this.humid.push({date: new Date(), value: data.payload});
                if (this.soil.length < 5 && data.topic === env.topic.soil) this.soil.push({date: new Date(), value: data.payload});
                if (this.light.length < 5 && data.topic === env.topic.light) this.light.push({date: new Date(), value: data.payload});
                if (this.atm.length < 5 && data.topic === env.topic.atmp) this.atm.push({date: new Date(), value: data.payload});

                if (this.temp.length === 5) {
                  this._csData.temperature =  this.temp;
                  this.temp = [];
                }

                if (this.humid.length === 5) {
                  this._csData.humidity = this.humid;
                  this.humid = [];
                }

                if (this.soil.length === 5) {
                  this._csData.soil = this.soil;
                  this.soil = [];
                }

                if (this.light.length === 5) {
                  this._csData.light = this.light;
                  this.light = [];
                }

                if (this.atm.length === 5) {
                  this._csData.atpressure = this.atm;
                  this.atm = [];
                }


                if (this._espData.length === 5) {
                  this.allData = this._espData;
                  this._espData = [];
                }


              });

          }


          switch (topic) {
              case 'temperature':
                this.isLoading = false;

                // Temperature, Humidity, AtPressure Area Chart
                this.chartAreaService.loadData(payload, topic).subscribe(data => {
                this._tempHumidityData = data;

                // Temperature Line Chart
                this.chartTempService.loadData(payload, topic).subscribe(_data => {

                      if (_data) {
                        _data.forEach( item => {
                        if (item.value) {
                          this._tempData = [...this._tempData, item];
                          if (this._tempData.length > 20) {
                            this.min = this._tempData[this._tempData.length - 20].time;
                            this.max = item.time;
                          }
                          // prevent running out-of-memory when client is connected for too long
                          if (this._tempData.length > 500) {
                            this._tempData = this._tempData.slice(480);
                            }
                          }
                        });

                      }
                      this._tempData = _data;
                   });

          });

            break;

                case 'humidity':

                // Temperature, Humidity, AtPressure Area Chart
                this.chartAreaService.loadData(payload, topic).subscribe(data => {
                  this._tempHumidityData = data;
                 });
                break;

                case 'atpressure':
                    // Temperature, Humidity, AtPressure Area Chart
                this.chartAreaService.loadData(payload, topic).subscribe(data => {
                  this._tempHumidityData = data;
                 });
                break;

              default:

              break;
          }



        },
        error => {
            console.log({error});
        }
        );
    }

    public onDropDownSelect(val: string) {
      const tabs = {Graph: 0, Map: 1};
      this.tabStrip.selectTab(tabs[val]);
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

}
