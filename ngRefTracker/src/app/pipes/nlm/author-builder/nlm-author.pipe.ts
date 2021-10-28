import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';

@Pipe({
  name: 'nlmAuthor'
})
export class NlmAuthorPipe implements PipeTransform {
  // https://www.nlm.nih.gov/bsd/uniform_requirements.html

  transform(author: Author): string {
    let outputStr: string = "";

    outputStr += author.lastName;
    outputStr += " ";

    outputStr += author.firstName[0];

    if (author.middleName) {
      outputStr += author.middleName[0];
    }

    return outputStr;
  }

}
