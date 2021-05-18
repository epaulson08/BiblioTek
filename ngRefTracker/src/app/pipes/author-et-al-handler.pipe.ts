import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';

@Pipe({
  name: 'authorEtAlHandler'
})
export class AuthorEtAlHandlerPipe implements PipeTransform {

  // Check for literal "et al" and remove if present
  transform(authors: Author[]): Author[] {

    for (let i: number = 0; i < authors.length; i++) {
      let author: Author = authors[i];
      if (author.firstName === "et al" || author.firstName === "et al."
        || author.middleName === "et al" || author.middleName === "et al."
        || author.lastName === "et al" || author.lastName === "et al."
        || author.suffix === "et al" || author.suffix === "et al.") {
        authors.splice(i, 1);
      }
    }
    return authors;
  }
}
