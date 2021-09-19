import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../../../models/author';

@Pipe({
  name: 'apaAuthor'
})
export class ApaAuthorHtmlPipe implements PipeTransform {

  transform(author: Author): string {
    let outputStr: string = "";

    // SINGLE AUTHOR
    // Ahmed, S. (2012). On being included: Racism and diversity in institutional life. Duke University Press.

    outputStr += author.lastName;
    outputStr += ", ";

    if (author.firstName) {
      outputStr += author.firstName.substr(0, 1);
      outputStr += "."
    }

    if (author.middleName) {
      outputStr += " ";
      outputStr += author.middleName.substr(0, 1);
      outputStr += "."
    }

    // Treatment of suffixes: https://libguides.scu.edu.au/apa/author
    // Jones, H. W., Jr., & Jones, H. W., Sr. (1941) ...
    if (author.suffix) {
      outputStr += ", "
      outputStr += author.suffix;
      if (author.suffix.substr[author.suffix.length - 1] !== ".")
        outputStr += ".";
    }

    return outputStr;
  }

}
