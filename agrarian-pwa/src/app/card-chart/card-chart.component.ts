import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html'
})
export class CardChartComponent implements OnInit {

  defaultTab = 'Chart';
  tabItems = ['Graph', 'Map', 'Weather'];
  tempArray = '50, 100';
  humidityArray = '0, 100';
  soilArray = '0, 100';
  atmpArray = '0, 100';
  lumensArray = '0, 100';
  windArray = '0, 100';



  @Output() dropDownSelect = new EventEmitter<string>();
  isMobile: boolean;

  onSelect(value: string) {
    this.dropDownSelect.emit(value);
  }

  constructor(private deviceService: DeviceDetectorService) { }


  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  getTempIcon(icon: string): string{
    const pcnt = parseInt(icon);
   if (pcnt < 50) return 'fa-5x fas card-icon fa-temperature-low';
   if (pcnt === 50) return 'fa-5x fas card-icon fa-thermometer-half';
   if (pcnt > 50) return 'fa-5x fas card-icon fa-temperature-high';
  }

}
