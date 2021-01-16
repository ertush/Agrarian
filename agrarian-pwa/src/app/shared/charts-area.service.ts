import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class ChartsAreaService {

  public _chartsAreaDataTemp = [];
  public _chartsAreaDataHumid = [];
  public _chartsAreaDataAtm = [];
  public _data = {temp: [], humid: [], atmp: [], time: null};

constructor() {

}


loadData(payload: string, topic: string): Observable<any> {

  if (topic === 'temperature') this._chartsAreaDataTemp.push(JSON.parse(payload));
  if (topic === 'humidity') this._chartsAreaDataHumid.push(JSON.parse(payload));
  if (topic ===  'atpressure') this._chartsAreaDataAtm.push(JSON.parse(payload));

   this._data.time = this.getTimeIntervals(new Date());

   if (this._chartsAreaDataTemp.length === 5 ) {
      this._data.temp = this._chartsAreaDataTemp;
      this._chartsAreaDataTemp = [];
   }

   if (this._chartsAreaDataHumid.length === 5 ) {
    this._data.humid = this._chartsAreaDataHumid;
    this._chartsAreaDataHumid = [];
  }

  if (this._chartsAreaDataAtm.length === 5 ) {
    this._data.atmp = this._chartsAreaDataAtm;
    this._chartsAreaDataAtm = [];
  }

  return new Observable(subscriber => {
    try {
      subscriber.next(this._data);
   } catch (e) {
      subscriber.error(e);
   }
  });

 }

 getTimeIntervals(date: Date): string[] {
   const _time = [];

   for (let i = 0; i < 5 ; i++) _time.push(moment(date).add(i, 'minute').toString().split(' ')[4]);

   return _time;
 }
}
