import { Component, Input, OnInit } from '@angular/core';
import { Document, Packer } from 'docx';
import { saveAs } from "file-saver";
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';
import { ApaDocxPipe } from 'src/app/pipes/apa/apa-docx.pipe';

@Component({
  selector: 'app-download-docx',
  templateUrl: './download-docx.component.html',
  styleUrls: ['./download-docx.component.css']
})

// thanks to https://github.com/dolanmiu/docx/tree/master/demo

export class DownloadDocxComponent implements OnInit {
  @Input() docxCitationStyle: CitationStyle;
  @Input() articlesToCite: JournalArticle[];

  constructor() {
  }

  ngOnInit(): void {
  }

  downloadDocx(): void {
    switch(this.docxCitationStyle.abbreviation) {
      case "APA":
        this.saveDocx(new ApaDocxPipe().transform(this.articlesToCite));
        break;
      case "AMA":
        break;
      case "IEEE":
        break;
      case "NLM":
        break;
      default:
        break;
    }
  }

  saveDocx(docToSave: Document) {
    Packer.toBlob(docToSave).then(blob => {
      saveAs(blob, "my-refs.docx");
    });
  }
}
