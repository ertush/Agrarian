
import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SoilmqttService {
private endpoint: string;

constructor(private _mqttService: MqttService) {
  this.endpoint = 'events';
}

topic(deviceId: string): Observable<IMqttMessage> {
  const topicName = `/${this.endpoint}/${deviceId}`;
  return this._mqttService.observe(topicName);
}


}



