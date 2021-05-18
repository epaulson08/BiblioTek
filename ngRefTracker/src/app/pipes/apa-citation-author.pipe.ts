import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apaCitationAuthor'
})
export class ApaCitationAuthorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
