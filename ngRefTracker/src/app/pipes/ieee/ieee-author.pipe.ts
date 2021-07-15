import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'ieeeAuthor'
})
export class IeeeAuthorPipe implements PipeTransform {

  transform(author: Author): string {
    let outputStr: string = "";



    return outputStr;
  }

}
