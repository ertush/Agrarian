import { WeatherService } from './../shared/weather.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {environment as env} from '../../environments/environment';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html'
})

export class CardChartComponent implements OnInit {

 
  defaultTab = 'Chart';
  tabItems = ['Graph', 'Map', 'Weather'];
  
  tempArray = '0, 0';
  humidityArray = '0, 0';
  soilArray = '0, 0';
  atmpArray = '0, 0';
  lumensArray = '0, 0';
  windArray = '0, 0';


  @Output() dropDownSelect = new EventEmitter<string>();  
  isMobile: boolean;

  @Input() set cardData(cardData){
    
    cardData.map(item => {
      switch(item.topic){
        case env.topic.temp:
          const ceilTemp = 30;
          const pcntTemp = Math.round((item.payload * 100) / ceilTemp);
          this.tempArray = `${item.payload}, ${pcntTemp}`;
        break;
        case env.topic.humidity:
          const ceilHumidity = 70;
          const pcntHumidity = Math.round((item.payload * 100) / ceilHumidity);
          this.humidityArray = `${item.payload}, ${pcntHumidity}`;
        break;
        case env.topic.soil:
          const ceilSoil = 15;
          const pcntSoil = Math.round((item.payload * 100) / ceilSoil);
          this.soilArray = `${item.payload}, ${pcntSoil}`;
        break;
        case env.topic.light:
          const ceilLight = 10;
          const pcntLight = Math.round((item.payload * 100) / ceilLight);
          this.lumensArray = `${item.payload}, ${pcntLight}`;
        break;
      }
      
    });

  };

  onSelect(value: string) {
    this.dropDownSelect.emit(value);
  }

  constructor(
    private deviceService: DeviceDetectorService,
    private weatherService: WeatherService
    ) {   }


  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.weatherService.getWeatherData()
    .then(res => {
      if (res.ok ) {
        res.json()
        .then(value => {
            
            const ceilWind = 3;
            const ceilAtmp = 2000;
            this.windArray = `${value.wind.speed}, ${Math.round((value.wind.speed * 100) / ceilWind)}`;
            this.atmpArray = `${value.main.pressure}, ${Math.round((value.main.pressure * 100) / ceilAtmp)}`;
        });
      }
    });
}

  getTempIcon(icon: string): string{
    const pcnt = parseInt(icon);
   if (pcnt < 50) return 'fa-5x fas card-icon fa-temperature-low';
   if (pcnt === 50) return 'fa-5x fas card-icon fa-thermometer-half';
   if (pcnt > 50) return 'fa-5x fas card-icon fa-temperature-high';
  }

}
