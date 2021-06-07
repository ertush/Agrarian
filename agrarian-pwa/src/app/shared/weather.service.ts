import { MqttService } from './mqtt.service';
import { Injectable } from '@angular/core';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  lat: number; // -1.45;
  lon: number; // 36.97;

  uri: string; 

  constructor(private mqttService: MqttService) {
    mqttService.fetchData().subscribe(m => {
      const payload = m.split('::')[0];
      const topic = m.split('::')[1].split('/')[1];
      switch (topic){
        case env.topic.lat.split('/')[1]:
          this.lat = parseFloat(payload);
        break;
        case env.topic.lng.split('/')[1]:
          this.lon = parseFloat(payload);
        break;
      }
    });
    this.uri = `${env.api.url}?lat=${this.lat}&lon=${this.lon}&APPID=${env.api.appId}`;
    }

  getWeatherData(): Promise<any> {
    console.log({lat: this.lat, lon: this.lon})
    return fetch(this.uri);
  }

}
