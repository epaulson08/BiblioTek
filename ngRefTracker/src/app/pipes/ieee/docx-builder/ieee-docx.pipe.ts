import { Pipe, PipeTransform } from '@angular/core';
import { Document, Paragraph } from 'docx';
import { JournalArticle } from 'src/app/models/journal-article';
import { IeeeCitationsDocxPipe } from './ieee-citations-docx.pipe';

@Pipe({
  name: 'ieeeDocx'
})
export class IeeeDocxPipe implements PipeTransform {

  transform(articlesToCite : JournalArticle[]): Document {
    let citations: Paragraph[] = new IeeeCitationsDocxPipe().transform(articlesToCite);
    return new Document({
      styles: {
        paragraphStyles: [
            {
              id: "default",
              name: "default",
              basedOn: "Normal",
              quickFormat: true,
              run: {
                font: "Calibri",
                size: 22  // halves font on save for unknown reasons
                // https://github.com/dolanmiu/docx/blob/master/demo/11-declaritive-styles-2.ts
              }
            }
        ]
      },
      sections: [
        {
          children: citations
        },
      ],
    });
  }



}
