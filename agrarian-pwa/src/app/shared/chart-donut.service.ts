import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface DonutData {
  topic: string;
  payload: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChartDonutService {

  constructor() { }
  
loadData(payload: string, topic: string): Observable<DonutData> {

// this._dataDonut = [...this._dataDonut, [{payload: JSON.parse(payload), topic}]];


// if( this._dataDonut.length === 5){
//     console.log(this._dataDonut);
//   return new Observable(subscriber => {
//     try {
//       subscriber.next(this._dataDonut);
//       this._dataDonut = [];

//    } catch (e) {
//       subscriber.error(e);
//    }
//   });
// }

return new Observable(subscriber => {
  try {
   const _dataDonut: DonutData = {payload: JSON.parse(payload), topic};
    subscriber.next(_dataDonut);

 } catch (e) {
    subscriber.error(e);
 }
});

}

}
