import { DeviceDetectorService } from 'ngx-device-detector';
import { environment as env } from './../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-weather',
  template: `
    <!-- <div class="k-card">
        <h2 class="k-card-header text-center m-0">Weather On Site</h2> -->
       
        <div class="row weather-container">
            <div *ngIf="isLoading" style="height: 400px">
                <app-loading-spinner></app-loading-spinner>
            </div>

          <div  *ngIf="!isLoading" class="weather-icon">
              <h1 class="mt-0 mb-4">
                <i [ngClass]="getClasses(icon)"></i>
              </h1>
              <h2>{{ description }}</h2>
              <h3>{{ location }}</h3>
              <h4 *ngFor="let key of ['temperature','humidity', 'seaLevel']">  {{ key }} : {{ weatherData[key] }}</h4>
          </div>
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

  @Input() lat: number;
  @Input() lon: number;
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

  constructor(private deviceDetectorService: DeviceDetectorService) {
   }

  ngOnInit() {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.uri = `${env.api.url}?lat=${this.lat}&lon=${this.lon}&APPID=${env.api.appId}`;

    fetch(this.uri)
    .then( res => {
      if (res.ok ) {
        this.isLoading = false;
        res.json()
        .then( value => {

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
  }

  getClasses(icon: string): string {
    return `fa-6x wi wi-owm-${icon}`;
  }

  onSelect(value: string) {
    this.dropDownSelect.emit(value);
}
}
