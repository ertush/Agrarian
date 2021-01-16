import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface Tempdata {
  value: string;
  time: Date;
}

@Injectable({
  providedIn: 'root'
})

export class ChartTempService {

constructor() { }

private _data_temp: Tempdata[] = [{value: '', time: null}];

loadData(payload: string, topic: string): Observable<Tempdata[]> {

if ( topic === 'temperature') {

  const item: Tempdata = { value: '', time: null};
  item.value = JSON.parse(payload);
  item.time = new Date();

  return new Observable(subscriber => {
    try {
      subscriber.next(this._data_temp);

   } catch (e) {
      subscriber.error(e);
   }
  });
}

return new Observable(subscriber => {
  try {
    subscriber.next(this._data_temp);

 } catch (e) {
    subscriber.error(e);
 }
});

}

}
