import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'amaAuthorHtml'
})
export class AmaAuthorHtmlPipe implements PipeTransform {

  transform(author: Author): string {
    if (author != null) {
      let outputStr: string = "";

      if (author.lastName) outputStr += author.lastName;
      if (author.suffix) outputStr += " " + author.suffix;
      if (author.firstName) outputStr += " " + author.firstName[0];
      if (author.middleName) outputStr += author.middleName[0];
      return outputStr;
    }
    return null;
  }
}
