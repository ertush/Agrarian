import { Injectable } from '@angular/core';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  lat = -1000; // -1.45;
  lon = -1000; // 36.97;

  uri = `${env.api.url}?lat=${this.lat}&lon=${this.lon}&APPID=${env.api.appId}`;
  constructor() { }

  getWeatherData(): Promise<any> {
    return fetch(this.uri);
  }

}
