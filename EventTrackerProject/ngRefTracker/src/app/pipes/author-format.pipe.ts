import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';

@Pipe({
  name: 'authorFormat'
})
export class AuthorFormatPipe implements PipeTransform {

  transform(authors: Author[]): string {
    // console.warn("**debug: pokemons="+pokemons + "\npokeCategory=" + pokeCategory)
    let outputStr: string = "";
    let etAl: boolean = false;

    if (authors.length === 0) return "None";

    for (let i: number = 0; i < authors.length; i++) {
      let author: Author = authors[i];
      let conceal: boolean = false;

      // check for an "et al." or "et al" literal and if present,
      // hide it
      if (author.firstName === "et al" || author.firstName === "et al."
        || author.middleName === "et al" || author.middleName === "et al."
        || author.lastName === "et al" || author.lastName === "et al."
        || author.suffix === "et al" || author.suffix === "et al.") {
        conceal = true;
        etAl = true;
      }

      if (!conceal) {

        if (author.firstName) outputStr += author.firstName[0];
        if (author.middleName) outputStr += author.middleName[0];
        if (author.lastName) outputStr += " " + author.lastName;
        if (author.suffix) outputStr += " " + author.suffix;

        // append "," "." or "et al.":
        if (i === authors.length - 1) {
          if (etAl) outputStr += ", et al.";
          else outputStr += ".";
        }
        if (i !== authors.length - 1) outputStr += ", ";
      }
    }
    return outputStr;
  }
}

