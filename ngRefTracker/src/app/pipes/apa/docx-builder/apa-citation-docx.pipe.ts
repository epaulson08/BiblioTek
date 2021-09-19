import { Pipe, PipeTransform } from '@angular/core';
import { Paragraph, TextRun } from 'docx';
import { JournalArticle } from 'src/app/models/journal-article';
import { ApaAuthorsHtmlPipe } from '../html-builder/apa-authors-html.pipe';

@Pipe({
  name: 'apaCitationDocx'
})
export class ApaCitationDocxPipe implements PipeTransform {

  transform(ja: JournalArticle): Paragraph {
      // Part A: non-italic: [authors (year). Title.]
      // Part B: italic: [journal, vol,]
      // Part C: non-italic: [pp.]

      // The format for authors will be the same in html and docx:
      let authors: string = new ApaAuthorsHtmlPipe().transform(ja.authors);

      let partA: string = `${authors} (${ja.yearPublished}). ${ja.title}. `;
      let partB: string = `${ja.journal.name}, ${ja.volumeNum}, `;
      let partC: string = `${ja.pages}.`;
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
