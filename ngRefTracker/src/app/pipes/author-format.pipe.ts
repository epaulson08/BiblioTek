import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';
import { AuthorEtAlHandlerPipe } from './author-et-al-handler.pipe';

@Pipe({
  name: 'authorFormat'
})
export class AuthorFormatPipe implements PipeTransform {

  transform(authors: Author[]): string {
    // console.warn("**debug: pokemons="+pokemons + "\npokeCategory=" + pokeCategory)
    let outputStr: string = "";

    if (authors.length === 0) return "None";

    authors = new AuthorEtAlHandlerPipe().transform(authors);

    for (let i: number = 0; i < authors.length; i++) {
      let author: Author = authors[i];
      if (author.firstName) outputStr += author.firstName[0];
      if (author.middleName) outputStr += author.middleName[0];
      if (author.lastName) outputStr += " " + author.lastName;
      if (author.suffix) outputStr += " " + author.suffix;
      if (i === authors.length - 1) {
        outputStr += ".";
      }
      if (i !== authors.length - 1) outputStr += ", ";
    }

    return outputStr;
  }

}
