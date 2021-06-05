import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-weather',
  template: `
    <!-- <div class="k-card">
        <h2 class="k-card-header text-center m-0">Weather On Site</h2> -->

        <div class="row weather-container">
            <div *ngIf="isLoading" style="height: 400px">
                <app-loading-spinner></app-loading-spinner>
            </div>

          <div  *ngIf="!isLoading; else noData" class="weather-icon">
              <h1 class="mt-0 mb-4">
                <i *ngIf="icon;else noDataIcon" [ngClass]="getClasses(icon)"></i>
                <ng-template #noDataIcon>
                <i class="fa-3x fas fa-exclamation"></i>
                </ng-template>
              </h1>
              <h2>{{ description ? description : '' }}</h2>
              <h3>{{ location ? location : ''}}</h3>
              <h4 *ngFor="let key of ['temperature','humidity', 'seaLevel']">  {{ key }} : {{ weatherData[key] }}</h4>
          </div>
          <ng-template #noData>
            <div class="d-flex flex-d-row align-items-center justify-content-center w-100 "><h3>No Data</h3></div>
            <div  class="tabStripMenu text-center">
                <kendo-dropdownlist class="dropDownlist" [data]="tabItems" [defaultItem]="defaultTab" (valueChange)="onSelect($event)">
                </kendo-dropdownlist>
          </div>
          </ng-template>
          <!-- tabStrip menu -->
          <div  *ngIf="isMobile && !isLoading" class="tabStripMenu text-center">
                <kendo-dropdownlist class="dropDownlist" [data]="tabItems" [defaultItem]="defaultTab" (valueChange)="onSelect($event)">
                </kendo-dropdownlist>
          </div>
            <!-- End of tabStrip menu -->
       </div>
  <!-- </div> -->
        `,
  styles: [`

    .weather-container{
    margin-top: 7.5%;

    }

    .weather-icon{
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 400px;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    }

    .weather-icon i {
    flex: 1;
    }

  `]
})


export class WeatherComponent implements OnInit {


  @Output() dropDownSelect = new EventEmitter<string>();

  isLoading = true;
  icon: string;
  location: string;
  weatherData = {};
  description: string;
  uri: string;
  error: any;
  errorCode: any;
  isMobile: boolean;
  tabItems = ['Graph', 'Map', 'Chart'];
  defaultTab = 'Weather';

  timeOut;
  timedOut = false;
  wait = 5000;

  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private weatherService: WeatherService
    ) {
   }

  ngOnInit() {
    this.isMobile = this.deviceDetectorService.isMobile();


    this.weatherService.getWeatherData()
    .then(res => {
      if (res.ok ) {
      
        res.json()
        .then( value => {
          if(value){
            if (this.timeOut) clearTimeout(this.timeOut);
            this.isLoading = false;
          }

          this.icon = value.weather[0].icon;
          this.location = value.name;
          this.description = value.weather[0].description;
          this.weatherData = {
            humidity: value.main.humidity,
            temperature: Math.round(value.main.temp / 10),
            seaLevel: value.main.pressure
          };

        })
        .catch(err => {

          this.error = err;
          this.errorCode = err.code;
        });
      }
    })
    .catch( error => {
      console.log(error);
    });

    this.timeOut = setTimeout(() => {
      this.timedOut = true;
      this.isLoading = false;
  }, this.wait);
  }

  getClasses(icon: string): string {
    return `fa-6x wi wi-owm-${icon}`;
  }

  onSelect(value: string) {
    this.dropDownSelect.emit(value);
}
}
