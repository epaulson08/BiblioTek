import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';
import { AmaAuthorsPipe } from './ama-authors.pipe';

@Pipe({
  name: 'fullAma'
})
export class FullAmaPipe implements PipeTransform {

  transform(ja: JournalArticle): unknown {
    let outputStr =
      `${new AmaAuthorsPipe().transform(ja.authors)}
    ${ja.title}. <em>${ja.journal.name}</em
    >. ${ja.yearPublished}; ${ja.volumeNum
      }<span *ngIf="${ja.issueNum}"
      >(${ja.issueNum})</span
    ><span *ngIf="${ja.pages}">:${ja.pages}</span
    >.`;

    return outputStr;
  }

}
