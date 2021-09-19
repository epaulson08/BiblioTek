import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';
import { ApaAuthorsHtmlPipe } from './html-builder/apa-authors-html.pipe';

@Pipe({
  name: 'fullApa'
})
export class ApaHtmlPipe implements PipeTransform {

  transform(ja: JournalArticle): string {

    let outputStr =
      `${new ApaAuthorsHtmlPipe().transform(ja.authors)}
    (${ja.yearPublished}).
    ${ja.title}.
    <em>${ja.journal.name}, ${ja.volumeNum}</em
    >`;

    if (ja.issueNum) {
      outputStr += `(${ja.issueNum})`;
    }

    outputStr += `,&nbsp;`;

    if (ja.pages) {
      outputStr += `${ja.pages}`;
    }

    outputStr += `.`;

    return outputStr;
  }

}
