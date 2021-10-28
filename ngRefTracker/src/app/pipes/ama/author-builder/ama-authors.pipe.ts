import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AmaAuthorPipe } from './ama-author.pipe';

@Pipe({
  name: 'amaAuthors'
})
export class AmaAuthorsPipe implements PipeTransform {

  transform(authors: Author[]): string {
    let outputStr = "";
    for (let i = 0; i < authors.length; i++) {
      outputStr += new AmaAuthorPipe().transform(authors[i]);
      if (i !== authors.length - 1) {
        outputStr += ", ";
      }
      else {
        outputStr += ".";
      }
    }
    return outputStr;
  }

}
