import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';
import { NlmAuthorsPipe } from './nlm-authors.pipe';

@Pipe({
  name: 'fullNlm'
})
export class FullNlmPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";
    let authorsFormatted: string = new NlmAuthorsPipe().transform(ja.authors);

    outputStr += authorsFormatted;
    outputStr += " ";
    outputStr += ja.title;
    outputStr += ". ";

    if (ja.journal.abbreviation) {
      outputStr += ja.journal.abbreviation;
    }
    else outputStr += ja.journal.name;

    outputStr += ". "

    outputStr += ja.yearPublished;
    // TODO: NLM style includes month and day,
    // e.g. 2002 Jul 25;
    outputStr += ";";
    outputStr += ja.volumeNum;
    if (ja.issueNum) {
      outputStr += "(" + ja.issueNum + ")";
    }
    outputStr += ":";
    outputStr += ja.pages + ".";

    return outputStr;
  }

}
