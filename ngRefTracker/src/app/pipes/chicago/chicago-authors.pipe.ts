import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'chicagoAuthors'
})
export class ChicagoAuthorsPipe implements PipeTransform {

  transform(authors: Author[]): string {
    let outputStr: string = "";




    return outputStr;
  }


}