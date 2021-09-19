import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AmaAuthorHtmlPipe } from './ama-author-html.pipe';

@Pipe({
  name: 'amaAuthors'
})
export class AmaAuthorsHtmlPipe implements PipeTransform {

  transform(authors: Author[]): string {
    let outputStr = "";
    for (let i = 0; i < authors.length; i++) {
      outputStr += new AmaAuthorHtmlPipe().transform(authors[i]);
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
