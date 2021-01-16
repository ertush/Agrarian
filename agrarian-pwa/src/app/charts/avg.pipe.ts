import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avg'
})
export class AvgPipe implements PipeTransform {

  transform(value: string[], args?: any): string {
    if (value.length > 1) {
      let sum = 0;
      value.map(val =>  sum += Number(val));
      return (Math.round(sum / value.length)).toString();
    }
    return '0';
  }

}
