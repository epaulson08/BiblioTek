import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';
import { JournalArticle } from '../models/journal-article';
import { ApaCitationAuthorsPipe } from './apa-citation-authors.pipe';
import { AuthorFormatPipe } from './author-format.pipe';

@Pipe({
  name: 'apaCitation'
})
export class ApaCitationPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";
    let authorsStr = new ApaCitationAuthorsPipe().transform(ja.authors);



    return outputStr;
  }

}
