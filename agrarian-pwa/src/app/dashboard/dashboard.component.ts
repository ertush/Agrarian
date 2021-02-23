import { ChartsAreaService } from './../shared/charts-area.service';
import { Component, ViewEncapsulation, HostBinding, OnDestroy } from '@angular/core';
import 'hammerjs';
import { Subscription } from 'rxjs';

import { MqttService } from './../shared/mqtt.service';
import { ChartTempService } from '../shared/chart-temp.service';
import { ChartDonutService } from '../shared/chart-donut.service';


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
    public espData = [];
    public isLoading = true;
    public today: Date = new Date();
    public rangeStart: Date;

    public months = 3;

    private subscription: Subscription;

s;
    public _espData = [];
    public _tempHumidityData = [];
    public _tempData = [];
    public _customData: any;
    public pageTitle = 'Statistics';

    @HostBinding('attr.id') get get_id() { return 'dashboard'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }


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
            // Donut Chart

            this.isLoading = false;
            if (topic !== 'custom') {
              this.chartDonutService.loadData(payload, topic).subscribe(data => {
                this._espData.push(data);
                console.log({espData : this._espData});
                if (this._espData.length === 5) {
                  this.allData = this._espData; 
                  this._espData = [];
                }
              });
          }


          switch (topic) {

              case 'custom':
                const data_custom: any = JSON.parse(payload);
                this.isLoading = false;
                this._customData = data_custom;
                break;
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


    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

}
