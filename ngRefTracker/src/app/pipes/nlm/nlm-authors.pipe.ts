import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'nlmAuthors'
})
export class NlmAuthorsPipe implements PipeTransform {

  transform(authors: Author[]): string {
    let outputStr: string = "";



    return outputStr;
  }

}
