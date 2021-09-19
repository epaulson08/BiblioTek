import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amaCitationsDocx'
})
export class AmaCitationsDocxPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
