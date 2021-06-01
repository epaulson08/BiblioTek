import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amaAuthor'
})
export class AmaAuthorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
