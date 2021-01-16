import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minmax'
})

export class MinmaxPipe implements PipeTransform {

  transform(value: string[], prop: string, args?: any): string {
    const val = [];
    if (value.length > 1) {
      value.forEach(e => val.push(Number(e)));
      return (prop === 'min' ? Math.min(...val).toString() : Math.max(...val).toString());
    }

    return '0';

  }

}
