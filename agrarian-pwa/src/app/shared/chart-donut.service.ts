import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface DonutData {

}

@Injectable({
  providedIn: 'root'
})
export class ChartDonutService {

  constructor() { }
  private _dataDonut = [];

loadData(payload: string, topic: string): Observable<DonutData[]> {
if ( topic === 'temperature') {

 
  return new Observable(subscriber => {
    try {
      console.log(this._dataDonut);
      subscriber.next(this._dataDonut);

   } catch (e) {
      subscriber.error(e);
   }
  });
}

return new Observable(subscriber => {
  try {
    subscriber.next(this._dataDonut);

 } catch (e) {
    subscriber.error(e);
 }
});

}
}
