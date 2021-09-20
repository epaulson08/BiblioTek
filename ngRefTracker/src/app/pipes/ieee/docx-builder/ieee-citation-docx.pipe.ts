import { Pipe, PipeTransform } from '@angular/core';
import { Paragraph, TextRun } from 'docx';
import { Author } from 'src/app/models/author';
import { JournalArticle } from 'src/app/models/journal-article';
import { IeeeAuthorHtmlPipe } from '../html-builder/ieee-author-html.pipe';
import { IeeeAuthorsHtmlPipe } from '../html-builder/ieee-authors-html.pipe';

@Pipe({
  name: 'ieeeCitationDocx'
})
export class IeeeCitationDocxPipe implements PipeTransform {

    // articles with > 6 authors need italicized 'et al.' so cannot use IeeeAuthorsIeeePipe
    transform(ja: JournalArticle): Paragraph {
      // Part A: non-italic: [authors]
      // Part B: if > 6 authors, add italic: [et al.]
          // else nothing added
      // Part C: non-italic: [ "title," ]
      // Part D: italic: [vol. volNum, pp. pages, year.]

      let partA: string = ``;
      let partB: string = ``;

      if (ja.authors.length <= 6) {
        partA += this.formatLessThanOrEqualToSixAuthors(ja.authors);
      }
      else {
        partA += this.formatMoreThanSixAuthors(ja.authors);
        partB += " et al."
      }

      let partC: string = `, "${ja.title}," `;
      let partD: string = ``
      if (ja.volumeNum) partD += `vol. ${ja.volumeNum}, `;
      if (ja.pages) partD += `pp. ${ja.pages}, `;
      partD += `${ja.yearPublished}.`;

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
            }),
            new TextRun({
              text: partD,
            })
          ]})
    }

    private formatLessThanOrEqualToSixAuthors(authors: Author[]): string {
      return new IeeeAuthorsHtmlPipe().transform(authors);
    }

    private formatMoreThanSixAuthors(authors: Author[]): string {
      return new IeeeAuthorHtmlPipe().transform(authors[0]);
    }
}
