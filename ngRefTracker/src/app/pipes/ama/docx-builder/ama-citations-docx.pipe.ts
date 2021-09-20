import { Pipe, PipeTransform } from '@angular/core';
import { Paragraph, TextRun } from 'docx';
import { JournalArticle } from 'src/app/models/journal-article';
import { ApaCitationDocxPipe } from '../../apa/docx-builder/apa-citation-docx.pipe';
import { AmaCitationDocxPipe } from './ama-citation-docx.pipe';

@Pipe({
  name: 'amaCitationsDocx'
})
export class AmaCitationsDocxPipe implements PipeTransform {

  transform(articlesToCite: JournalArticle[]): Paragraph[] {
    let toReturn: Paragraph[] = [];
    for (let i=0; i < articlesToCite.length; i++) {
      toReturn.push(new AmaCitationDocxPipe().transform(articlesToCite[i]));
      if (i !== articlesToCite.length - 1) {
        // add newline character:
        toReturn.push(new Paragraph({style: "default", children: [new TextRun({text: ""})]}));
      }
    }
    return toReturn;
  }

}
