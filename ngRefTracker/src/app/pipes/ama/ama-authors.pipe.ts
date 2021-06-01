import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amaAuthors'
})
export class AmaAuthorsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
