import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'ieeeAuthorHtml'
})
export class IeeeAuthorHtmlPipe implements PipeTransform {
  // http://journals.ieeeauthorcenter.ieee.org/wp-content/uploads/sites/7/IEEE-Reference-Guide-Online-v.04-20-2021.pdf

  transform(author: Author): string {
    let outputStr: string = "";

    if (author.firstName) {
      outputStr += author.firstName[0];
      outputStr += ". ";
    }

    if (author.middleName) {
      outputStr += author.middleName[0];
      outputStr += ". ";
    }

    outputStr += author.lastName;

    // TODO: handle suffixes

    return outputStr;
  }


}
