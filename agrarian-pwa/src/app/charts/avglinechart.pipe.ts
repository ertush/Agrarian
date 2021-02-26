import { environment as env} from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'avglinechart'
})
export class AvgLineChartPipe implements PipeTransform {

  transform(value: any[]): string {
    if (value.length > 1) {
      let sum = 0;
      value.map(val =>  sum += val.value);
      return `${(Math.round(sum / value.length)).toString()}`;
    }
    return `0`;
  }

  

}
