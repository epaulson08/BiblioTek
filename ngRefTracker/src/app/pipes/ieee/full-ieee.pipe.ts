import { Pipe, PipeTransform } from '@angular/core';
import { PageSize } from 'docx';
import { JournalArticle } from 'src/app/models/journal-article';
import { IeeeAuthorsPipe } from './ieee-authors.pipe';

@Pipe({
  name: 'fullIeee'
})
export class FullIeeePipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let authsPipe = new IeeeAuthorsPipe();
    let outputStr: string = "";

    outputStr += authsPipe.transform(ja.authors);
    outputStr += ", ";
    outputStr += "\"";
    outputStr += ja.title;
    outputStr += ",\" ";
    outputStr += "<em>";

    // TODO: actually IEEE includes "." after
    // abbreviated words in journal abbreviations
    // For now, will use full journal name

    // if (ja.journal.abbreviation) {
    //   outputStr += ja.journal.abbreviation;
    // }
    // else {
      outputStr += ja.journal.name;
    // }
    outputStr += "</em>,&nbsp;"

    if (ja.volumeNum) {
      outputStr += "vol.&nbsp;";
      outputStr += ja.volumeNum;
      outputStr += ",&nbsp";
    }

    if (ja.pages) {
      if (ja.pages.includes("-")) {
        outputStr += "pp.&nbsp;";
      }
      else {
        outputStr += "p.&nbsp;";
      }

      outputStr += ja.pages;
      outputStr += ",&nbsp";
    }

    // TODO: handle months

    outputStr += ja.yearPublished;
    outputStr += ".";

    return outputStr;
  }

}
