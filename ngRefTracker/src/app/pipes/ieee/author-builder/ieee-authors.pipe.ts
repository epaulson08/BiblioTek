import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';
import { IeeeAuthorPipe } from './ieee-author.pipe';

@Pipe({
  name: 'ieeeAuthors',
})
export class IeeeAuthorsPipe implements PipeTransform {
  transform(authors: Author[]): string {
    // http://journals.ieeeauthorcenter.ieee.org/wp-content/uploads/sites/7/IEEE-Reference-Guide-Online-v.04-20-2021.pdf
    // https://libraryguides.vu.edu.au/ieeereferencing/journals
    let outputStr: string = '';
    let authPipe = new IeeeAuthorPipe();

    if (authors.length === 1) {
      return authPipe.transform(authors[0]);
    } else if (authors.length === 2) {
      outputStr += authPipe.transform(authors[0]);
      outputStr += ' and ';
      outputStr += authPipe.transform(authors[1]);
    } else if (authors.length >= 3 && authors.length <= 6) {
      for (let i: number = 0; i < authors.length; i++) {
        if (i !== authors.length - 1) {
          outputStr += authPipe.transform(authors[i]);
          outputStr += ', ';
        } else {
          outputStr += 'and ';
          outputStr += authPipe.transform(authors[i]);
        }
      }
    } else {
      outputStr += authPipe.transform(authors[0]);
      outputStr += '&nbsp;<em>et al.</em>';
    }

    return outputStr;
  }
}
