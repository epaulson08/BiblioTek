import { Output, Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';
import { ApaAuthorsPipe } from './apa-authors.pipe';

@Pipe({
  name: 'fullApa'
})
export class FullApaPipe implements PipeTransform {

  transform(ja: JournalArticle): string {

    let outputStr =
      `${new ApaAuthorsPipe().transform(ja.authors)}.
    (${ja.yearPublished}).
    ${ja.title}.
    <em>${ja.journal.name}, ${ja.volumeNum}</em
    ><span *ngIf="${ja.issueNum}"
      >(${ ja.issueNum })</span
    ><span *ngIf="${ja.pages}"
      >,&nbsp;${ ja.pages }</span
    >.`;

    return outputStr;
  }

}
