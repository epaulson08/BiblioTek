import { Pipe, PipeTransform } from '@angular/core';
import { Paragraph, TextRun } from 'docx';
import { JournalArticle } from 'src/app/models/journal-article';
import { AmaAuthorsPipe } from '../author-builder/ama-authors.pipe';

@Pipe({
  name: 'amaCitationDocx'
})
export class AmaCitationDocxPipe implements PipeTransform {

  transform(ja: JournalArticle): Paragraph {
    // Part A: non-italic: [authors. title.]
    // Part B: italic: [journalname]
    // Part C: non-italic: [. yearpub; vol(issueNum): pp.]

    let authors: string = new AmaAuthorsPipe().transform(ja.authors);

    let partA: string = `${authors} ${ja.title}. `;
    let partB: string = `${ja.journal.name}. `;
    let partC: string = `${ja.yearPublished}; ${ja.volumeNum}`;
    if (ja.issueNum) partC += `(${ja.issueNum})`;
    if (ja.pages) partC += `: ${ja.pages}`;
    partC += ".";

    return new Paragraph({
      style: "default",
        children: [
          new TextRun({
            text: partA
          }),
          new TextRun({
            text: partB,
            italics: true,
          }),
          new TextRun({
            text: partC,
          })
        ]})
  }

}
