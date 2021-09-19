import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amaCitationDocx'
})
export class AmaCitationDocxPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
