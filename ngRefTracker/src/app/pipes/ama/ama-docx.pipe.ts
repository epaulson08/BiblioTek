import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amaDocx'
})
export class AmaDocxPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
