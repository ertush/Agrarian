import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMqttData } from './mqtt-data';


@Injectable({
  providedIn: 'root'
})

export class ChartDonutService {

  constructor() { }
  
loadData(payload: string, topic: string): Observable<IMqttData> {

return new Observable(subscriber => {
  try {
   const _dataDonut: IMqttData = {payload: JSON.parse(payload), topic};
    subscriber.next(_dataDonut);

 } catch (e) {
    subscriber.error(e);
 }
});

}

}
