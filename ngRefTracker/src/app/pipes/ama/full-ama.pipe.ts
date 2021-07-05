import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';
import { AmaAuthorsPipe } from './ama-authors.pipe';

@Pipe({
  name: 'fullAma'
})
export class FullAmaPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr =
      `${new AmaAuthorsPipe().transform(ja.authors)}
    ${ja.title}. <em>${ja.journal.name}</em
    >. ${ja.yearPublished}; ${ja.volumeNum
      }`;

    if (ja.issueNum) { outputStr += `(${ja.issueNum})` };
    if (ja.pages) { outputStr += `:&nbsp;${ja.pages}` };

    outputStr += `.`;

    return outputStr;
  }

}
