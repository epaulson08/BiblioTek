import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'chicagoAuthor'
})
export class ChicagoAuthorPipe implements PipeTransform {

  transform(author: Author): string {
    let outputStr: string = "";




    return outputStr;
  }

}
