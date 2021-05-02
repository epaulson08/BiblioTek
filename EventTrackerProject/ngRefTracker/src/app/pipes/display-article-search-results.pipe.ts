import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from '../models/journal-article';
import { AuthorFormatPipe } from './author-format.pipe';

@Pipe({
  name: 'displayArticleSearchResults'
})
export class DisplayArticleSearchResultsPipe implements PipeTransform {

  transform(articleResults: JournalArticle[]): string {
    let strOutput = "";
    if (articleResults.length === 0) {
      strOutput = "No articles found."
    }
    else {
      articleResults.forEach(article => {
        strOutput += "Title: " + article.title
          + " Authors: ";
        strOutput += new AuthorFormatPipe().transform(article.authors);
        strOutput += " / Journal: " + article.journal.name;
        strOutput += " / Year: " + article.yearPublished;
        strOutput += " / Vol: " + article.volumeNum;
        strOutput += " / DOI: ";
        if (article.doi) { strOutput+= article.doi }
        else { strOutput += "None available"; }
      });
    }
    return strOutput;
  }

}
