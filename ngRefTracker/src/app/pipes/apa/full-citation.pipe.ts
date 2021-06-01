import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from '../../models/journal-article';
import { AuthorsPipe } from './authors.pipe';

@Pipe({
  name: 'apaCitation'
})
export class FullCitationPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";
    let authorsStr = new AuthorsPipe().transform(ja.authors);
    outputStr += authorsStr;
    // TODO

    // return outputStr;
    return "DEBUG: APA CITATION PIPE: " + authorsStr;
  }

}
