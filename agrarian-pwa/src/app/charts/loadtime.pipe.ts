import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loadtime'
})
export class LoadtimePipe implements PipeTransform {

  transform(value: string, time: string[], prop: string[], args?: any): string {

    if (value !== '0') return time[prop.indexOf(value)];
    return '-';

  }

}
