import { environment as env} from './../../environments/environment';
import { ChartsAreaService } from './../shared/charts-area.service';
import { Component, ViewEncapsulation, HostBinding, OnDestroy, ViewChild, OnInit } from '@angular/core';
import 'hammerjs';
import { Subscription } from 'rxjs';
import { TabStripComponent } from '@progress/kendo-angular-layout/dist/es2015/tabstrip/tabstrip.component';

import { MqttService } from './../shared/mqtt.service';
import { ChartTempService } from '../shared/chart-temp.service';
import { ChartDonutService } from '../shared/chart-donut.service';
import { AngularFireAuth } from '@angular/fire/auth';




@Component({
    selector: 'app-dashboard',
    /*providers: [IssuesProcessor],*/
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dashboard.template.html'
})

export class DashboardComponent implements OnDestroy, OnInit {

    min: Date = new Date();
    max: Date = new Date(this.min.getTime() + 60000);
    style = 'smooth';
    unit = 'fit';
    user: any;

    allData: any[];

    isLoading = true;
    today: Date = new Date();
    rangeStart: Date;

    months = 3;

    private subscription: Subscription;

    _espData = [];
    _tempHumidityData = [];
    _tempData = [];
    _humidityData = [];

    _csData = {temperature: [], humidity: [], soil: [], light: [], atpressure: []};
    temp = [];
    humid = [];
    soil = [];
    light = [];
    atm = [];
    isMobile: boolean;

    lat = 0.0; // -1.45;
    lng = 0.0; // 36.97;

    pageTitle = 'Dashboard';

    @HostBinding('attr.id') get get_id() { return 'dashboard'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }

    @ViewChild('tabStrip') tabStrip: TabStripComponent;

    constructor(
              private afAuth: AngularFireAuth,
              private MqttClientService: MqttService,
              private chartAreaService: ChartsAreaService,
              private chartTempService: ChartTempService,
              private chartDonutService: ChartDonutService
        ) {

        // Auth Guard

        this.afAuth.authState.subscribe(user => {
          
            if (user) {
                this.user = user;
            } else {
              return;
            }
        });

        /* Line Real time chart */
        this.MqttClientService.fetchData()
        .subscribe(m => {
          const payload = m.split('::')[0];
          const topic = m.split('::')[1].split('/')[1];

            // All Data Section
            // Donut Chart and Line Chart

            this.isLoading = false;
           
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

          
          switch (topic) {
              case env.topic.temp.split('/')[1]:
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

                case env.topic.humidity.split('/')[1]:

                // Temperature, Humidity, AtPressure Area Chart
                this.chartAreaService.loadData(payload, topic).subscribe(data => {
                  this._tempHumidityData = data;
                  if (data.humid.length === 5) this._humidityData = [{value: data.humid, time: new Date(0)}];
                 });
                break;

                case env.topic.atmp.split('/')[1]:
                    // Temperature, Humidity, AtPressure Area Chart
                this.chartAreaService.loadData(payload, topic).subscribe(data => {
                  this._tempHumidityData = data;
                 });
                break;

                case env.topic.lat.split('/')[1]:
                  this.lat = parseFloat(payload);
                  
                  break;

                case env.topic.lng.split('/')[1]:
                    this.lng = parseFloat(payload);
                    
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

  ngOnInit(): void {
    if(this.allData !== undefined){
    this.allData = this.allData.filter(val => (val.topic !== 'esp8266/lat' && val.topic !== 'esp8266/lng'));
    }
    console.log({allData: this.allData}); //debug
  }

    onDropDownSelect(val: string) {
      const tabs = {Graph: 0, Map: 1, Weather: 2, Chart: 3};
      this.tabStrip.selectTab(tabs[val]);
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

}
