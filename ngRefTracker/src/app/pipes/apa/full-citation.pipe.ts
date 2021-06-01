import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from '../../models/journal-article';
import { AuthorsPipe } from './authors.pipe';

@Pipe({
  name: 'apaCitation'
})
export class FullCitationPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    // https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_articles_in_periodicals.html

    let outputStr: string = "";
    let authorsStr = new AuthorsPipe().transform(ja.authors);
    outputStr += authorsStr;

    // TODO

    // return outputStr;
    return "DEBUG: APA CITATION PIPE: " + authorsStr;
  }

}
